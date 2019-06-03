import express from "express";
import { urlencoded, json } from "body-parser";
import { config } from "./services/config";
import { GraphAPi } from "./services/graph-api";
import { User } from "./services/user";
import { Receive } from "./services/receive";
import { Profile } from "./services/profile";
import { AddressInfo } from "net";

const app = express();
var users: any = {};

app.use(
    urlencoded({
        extended: true
    })
);

app.use(json());

app.set("view engine", "ejs");

app.get("/", function(_req, res) {
    res.render("index");
});

// Adds support for GET requests to our webhook
app.get("/webhook", (req, res) => {
    // Parse the query params
    let mode = req.query["hub.mode"];
    let token = req.query["hub.verify_token"];
    let challenge = req.query["hub.challenge"];
  
    // Checks if a token and mode is in the query string of the request
    if (mode && token) {
      // Checks the mode and token sent is correct
      if (mode === "subscribe" && token === config.verifyToken) {
        // Responds with the challenge token from the request
        console.log("WEBHOOK_VERIFIED");
        res.status(200).send(challenge);
      } else {
        // Responds with '403 Forbidden' if verify tokens do not match
        res.sendStatus(403);
      }
    }
  });

  // Creates the endpoint for your webhook
app.post("/webhook", (req, res) => {
    let body = req.body;
  
    // Checks if this is an event from a page subscription
    if (body.object === "page") {
      // Returns a '200 OK' response to all requests
      res.status(200).send("EVENT_RECEIVED");
  
      // Iterates over each entry - there may be multiple if batched
      body.entry.forEach(function(entry: any) {
        // Gets the body of the webhook event
        let webhookEvent = entry.messaging[0];
        // console.log(webhookEvent);
  
        // Discard uninteresting events
        if ("read" in webhookEvent) {
          // console.log("Got a read event");
          return;
        }
  
        if ("delivery" in webhookEvent) {
          // console.log("Got a delivery event");
          return;
        }
  
        // Get the sender PSID
        let senderPsid = webhookEvent.sender.id;
  
        if (!(senderPsid in users)) {
          let user = new User(senderPsid);
  
          GraphAPi.getUserProfile(senderPsid)
            .then(userProfile => {
              user.setProfile(userProfile);
            })
            .catch(error => {
              // The profile is unavailable
              console.log("Profile is unavailable:", error);
            })
            .finally(() => {
              users[senderPsid] = user;
              console.log(
                "New Profile PSID:",
                senderPsid
              );
              let receiveMessage = new Receive(users[senderPsid], webhookEvent);
              return receiveMessage.handleMessage();
            });
        } else {
          console.log(
            "Profile already exists PSID:",
            senderPsid
          );
          let receiveMessage = new Receive(users[senderPsid], webhookEvent);
          return receiveMessage.handleMessage();
        }
      });
    } else {
      // Returns a '404 Not Found' if event is not from a page subscription
      res.sendStatus(404);
    }
  });

  // Set up your App's Messenger Profile
app.get("/profile", (req, res) => {
  let token = req.query["verify_token"];
  let mode = req.query["mode"];

  if (!config.webhookUrl.startsWith("https://")) {
    res.status(200).send("ERROR - Need a proper API_URL in the .env file");
  }
  let profile = new Profile();

  // Checks if a token and mode is in the query string of the request
  if (mode && token) {
    if (token === config.verifyToken) {
      if (mode == "webhook" || mode == "all") {
        profile.setWebhook();
        res.write(
          `<p>Set app ${config.appId} call to ${config.webhookUrl}</p>`
        );
      }
      if (mode == "profile" || mode == "all") {
        profile.setThread();
        res.write(`<p>Set Messenger Profile of Page ${config.pageId}</p>`);
      }
      res.status(200).end();
    } else {
      // Responds with '403 Forbidden' if verify tokens do not match
      res.sendStatus(403);
    }
  } else {
    // Returns a '404 Not Found' if mode or token are missing
    res.sendStatus(404);
  }
});
  
var listener = app.listen(config.port, function() {
  let address = <AddressInfo>listener.address();
  console.log(`Your app is listening on port: ${address.port}`)
});


