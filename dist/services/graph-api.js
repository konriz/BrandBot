"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("./config");
const request = require("request");
class GraphAPI {
    static callSendAPI(requestBody) {
        // Send the HTTP request to the Messenger Platform
        request({
            uri: `${config_1.config.mPlatfom}/me/messages`,
            qs: {
                access_token: config_1.config.pageAccesToken
            },
            method: "POST",
            json: requestBody
        }, (error, _res, body) => {
            if (error) {
                console.error("Unable to send message:", error);
            }
        });
    }
    static callMessengerProfileAPI(requestBody) {
        // Send the HTTP request to the Messenger Profile API
        console.log(`Setting Messenger Profile for app ${config_1.config.appId}`);
        request({
            uri: `${config_1.config.mPlatfom}/me/messenger_profile`,
            qs: {
                access_token: config_1.config.pageAccesToken
            },
            method: "POST",
            json: requestBody
        }, (error, _res, body) => {
            if (!error) {
                console.log(`Request sent: ${body}`);
            }
            else {
                console.error(`Unable to send message: ${error}`);
            }
        });
    }
    static callSubscriptionsAPI() {
        // Send the HTTP request to the Subscriptions Edge to configure your webhook
        // You can use the Graph API's /{app-id}/subscriptions edge to configure and
        // manage your app's Webhooks product
        // https://developers.facebook.com/docs/graph-api/webhooks/subscriptions-edge
        console.log(`Setting app ${config_1.config.appId} callback url to ${config_1.config.webhookUrl}`);
        request({
            uri: `${config_1.config.mPlatfom}/${config_1.config.appId}/subscriptions`,
            qs: {
                access_token: config_1.config.appId + "|" + config_1.config.appSecret,
                object: "page",
                callback_url: config_1.config.webhookUrl,
                verify_token: config_1.config.verifyToken,
                fields: "messages, messaging_postbacks, messaging_optins, message_deliveries, messaging_referrals ",
                include_values: "true"
            },
            method: "POST"
        }, (error, _res, body) => {
            if (!error) {
                console.log(`Request sent: ${body}`);
            }
            else {
                console.error(`Unable to send message: ${error}`);
            }
        });
    }
    static callSubscribedApps() {
        // Send the HTTP request to subscribe an app for Webhooks for Pages
        // You can use the Graph API's /{page-id}/subscribed_apps edge to configure
        // and manage your pages subscriptions
        // https://developers.facebook.com/docs/graph-api/reference/page/subscribed_apps
        console.log(`Subscribing app ${config_1.config.appId} to page ${config_1.config.pageId}`);
        request({
            uri: `${config_1.config.mPlatfom}/${config_1.config.pageId}/subscribed_apps`,
            qs: {
                access_token: config_1.config.pageAccesToken,
                subscribed_fields: "messages, messaging_postbacks, messaging_optins, message_deliveries, messaging_referrals "
            },
            method: "POST"
        }, (error, _res, body) => {
            if (error) {
                console.error(`Unable to send message: ${error}`);
            }
        });
    }
    static getUserProfile(senderPsid) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const userProfile = yield this.callUserProfileAPI(senderPsid);
                console.log(`User profile: ${JSON.stringify(userProfile)}`);
                return userProfile;
            }
            catch (err) {
                console.log(`Fetch failed: ${err}`);
            }
        });
    }
    static callUserProfileAPI(senderPsid) {
        return new Promise(function (resolve, reject) {
            let body = [];
            // Send the HTTP request to the Graph API
            request({
                uri: `${config_1.config.mPlatfom}/${senderPsid}`,
                qs: {
                    access_token: config_1.config.pageAccesToken,
                    fields: "first_name, last_name, gender, locale, timezone"
                },
                method: "GET"
            })
                .on("response", (response) => {
                if (response.statusCode !== 200) {
                    reject(Error(response.statusCode.toString()));
                }
            })
                .on("data", function (chunk) {
                body.push(chunk);
            })
                .on("error", function (error) {
                console.error(`Unable to fetch profile: ${error}`);
                reject(Error("Network Error"));
            })
                .on("end", () => {
                let result = Buffer.concat(body).toString();
                resolve(JSON.parse(result));
            });
        });
    }
    static callFBAEventsAPI(senderPsid, eventName) {
        // Construct the message body
        let requestBody = {
            event: "CUSTOM_APP_EVENTS",
            custom_events: JSON.stringify([
                {
                    _eventName: "postback_payload",
                    _value: eventName,
                    _origin: "original_coast_clothing"
                }
            ]),
            advertiser_tracking_enabled: 1,
            application_tracking_enabled: 1,
            extinfo: JSON.stringify(["mb1"]),
            page_id: config_1.config.pageId,
            page_scoped_user_id: senderPsid
        };
        // Send the HTTP request to the Activities API
        request({
            uri: `${config_1.config.mPlatfom}/${config_1.config.appId}/activities`,
            method: "POST",
            form: requestBody
        }, (error, res, _body) => {
            if (!error) {
                console.log(`FBA event '${eventName}'`);
            }
            else {
                console.error(`Unable to send FBA event '${eventName}' ${error}`);
            }
        });
    }
}
exports.GraphAPI = GraphAPI;
;
//# sourceMappingURL=graph-api.js.map