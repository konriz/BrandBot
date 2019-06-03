"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const graph_api_1 = require("./graph-api");
const config_1 = require("./config");
class Profile {
    constructor() {
    }
    setWebhook() {
        graph_api_1.GraphAPi.callSubscriptionsAPI();
        graph_api_1.GraphAPi.callSubscribedApps();
    }
    setThread() {
        let profilePayload = Object.assign({}, this.getGetStarted(), this.getGreeting(), this.getPersistentMenu());
        graph_api_1.GraphAPi.callMessengerProfileAPI(profilePayload);
    }
    setGetStarted() {
        let getStartedPayload = this.getGetStarted();
        graph_api_1.GraphAPi.callMessengerProfileAPI(getStartedPayload);
    }
    setGreeting() {
        let greetingPayload = this.getGreeting();
        graph_api_1.GraphAPi.callMessengerProfileAPI(greetingPayload);
    }
    setPersistentMenu() {
        let menuPayload = this.getPersistentMenu();
        graph_api_1.GraphAPi.callMessengerProfileAPI(menuPayload);
    }
    getGetStarted() {
        return {
            get_started: {
                payload: "START"
            }
        };
    }
    getGreeting() {
        return {
            greeting: [this.getGreetingText()]
        };
    }
    getPersistentMenu() {
        return {
            persistent_menu: [this.getMenuItems()]
        };
    }
    getGreetingText() {
        let greeting = {
            locale: "default",
            text: "Hello!"
        };
        console.log(greeting);
        return greeting;
    }
    getMenuItems() {
        let menu = {
            locale: "default",
            composer_input_disabled: false,
            call_to_actions: [
                {
                    type: "web_url",
                    title: "Main",
                    url: config_1.config.shopUrl,
                    webview_height_ratio: "full"
                }
            ]
        };
        console.log(menu);
        return menu;
    }
}
exports.Profile = Profile;
;
//# sourceMappingURL=profile.js.map