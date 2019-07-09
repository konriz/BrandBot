import express = require("express");
import { config } from "./config";
import { usersRepository } from "../app";
import { User } from "../user/user";
import { GraphAPI } from "./graph-api";
import { Receive } from "./receive";


export class WebhookHandler {

    static getWebhook(req: express.Request, res: express.Response) {
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
        } else {
            res.sendStatus(404);
        }
    };
    
    static postWebhook(req: express.Request, res: express.Response) {
        let body = req.body;
        
        // Checks if this is an event from a page subscription
        if (body.object === "page") {
          // Returns a '200 OK' response to all requests
          res.status(200).send("EVENT_RECEIVED");
      
          // Iterates over each entry - there may be multiple if batched
          body.entry.forEach( (entry: any) => {
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
      
            if (!(usersRepository.isUser(senderPsid))) {
              let user = new User(senderPsid);
      
              GraphAPI.getUserProfile(senderPsid)
                .then(userProfile => {
                  user.setProfile(userProfile);
                })
                .catch(error => {console.log(`Profile is unavailable: ${error}`);
                })
                .finally(() => {
                  usersRepository.addUser(user);
                  console.log(`New Profile PSID: ${senderPsid}`);
                  let receiveMessage = new Receive(webhookEvent);
                  return receiveMessage.handleMessage();
                });
            } else {
              console.log(`Profile already exists PSID: ${senderPsid}`);
              let receiveMessage = new Receive(webhookEvent);
              return receiveMessage.handleMessage();
            }
          });
        } else {
          // Returns a '404 Not Found' if event is not from a page subscription
          res.sendStatus(404);
        }
    }

}

