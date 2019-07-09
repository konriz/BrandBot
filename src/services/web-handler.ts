import { config } from "./config";
import { Profile } from "./profile";
import express = require("express");
import { usersRepository, nodesRepository, ordersRepository } from "../app";

export class WebHandler {

    static getProfile(req: express.Request, res: express.Response) {
        let token = req.query["verify_token"];
      
        if (!config.webhookUrl.startsWith("https://")) {
          res.status(200).send("ERROR - Need a proper API_URL in the .env file");
          return;
        }
        let profile = new Profile();
      
        // Checks if a token and mode is in the query string of the request
        if (token) {
          if (token === config.verifyToken) {
            
            profile.setWebhook();
            profile.setThread();
            
            res.render("profile", {
              pageId: config.pageId,
              getStarted: JSON.stringify(profile.getGetStarted()),
              greeting: JSON.stringify(profile.getGreeting()),
              menu: JSON.stringify(profile.getPersistentMenu())
            });
          } else {
            // Responds with '403 Forbidden' if verify tokens do not match
            res.sendStatus(403);
          }
        } else {
          // Returns a '404 Not Found' if token are missing
          res.sendStatus(404);
        }
    };

    

  static getNodes(req: express.Request, res: express.Response) {
    let nodesList = nodesRepository.nodes;
    if(nodesList.length > 0){
      res.render("nodes/nodes", {nodes: nodesList})
    } else {
      res.render("nodes/nonodes");
    }
  };

  static getUsers(req: express.Request, res: express.Response) {
    let usersList = usersRepository.users;
    if(usersList.length > 0){
      res.render("users/users", {users: usersList});
    } else {
      res.render("users/nousers");
    }
  };

  static getOrders(req: express.Request, res: express.Response) {
    let ordersList = ordersRepository.orders;
    if(ordersList.length > 0){
      res.render("orders/orders", {orders: ordersList});
    } else {
      res.render("orders/noorders");
    }
  }

  static getSettings(req: express.Request, res: express.Response) {
    res.render("settings/settings");
  }
}