"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("./config");
const profile_1 = require("./profile");
const app_1 = require("../app");
class WebHandler {
    static getProfile(req, res) {
        let token = req.query["verify_token"];
        if (!config_1.config.webhookUrl.startsWith("https://")) {
            res.status(200).send("ERROR - Need a proper API_URL in the .env file");
            return;
        }
        let profile = new profile_1.Profile();
        // Checks if a token and mode is in the query string of the request
        if (token) {
            if (token === config_1.config.verifyToken) {
                profile.setWebhook();
                profile.setThread();
                res.render("profile", {
                    pageId: config_1.config.pageId,
                    getStarted: JSON.stringify(profile.getGetStarted()),
                    greeting: JSON.stringify(profile.getGreeting()),
                    menu: JSON.stringify(profile.getPersistentMenu())
                });
            }
            else {
                // Responds with '403 Forbidden' if verify tokens do not match
                res.sendStatus(403);
            }
        }
        else {
            // Returns a '404 Not Found' if token are missing
            res.sendStatus(404);
        }
    }
    ;
    static getNodes(req, res) {
        let nodesList = app_1.nodesRepository.nodes;
        if (nodesList.length > 0) {
            res.render("nodes/nodes", { nodes: nodesList });
        }
        else {
            res.render("nodes/nonodes");
        }
    }
    ;
    static getUsers(req, res) {
        let usersList = app_1.usersRepository.users;
        if (usersList.length > 0) {
            res.render("users/users", { users: usersList });
        }
        else {
            res.render("users/nousers");
        }
    }
    ;
    static getOrders(req, res) {
        let ordersList = app_1.ordersRepository.orders;
        if (ordersList.length > 0) {
            res.render("orders/orders", { orders: ordersList });
        }
        else {
            res.render("orders/noorders");
        }
    }
    static getSettings(req, res) {
        res.render("settings/settings");
    }
}
exports.WebHandler = WebHandler;
//# sourceMappingURL=web-handler.js.map