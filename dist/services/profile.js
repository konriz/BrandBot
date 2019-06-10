"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const graph_api_1 = require("./graph-api");
const config_1 = require("./config");
const res = __importStar(require("../resources/locales/resources.json"));
class Profile {
    setWebhook() {
        graph_api_1.GraphAPI.callSubscriptionsAPI();
        graph_api_1.GraphAPI.callSubscribedApps();
    }
    setThread() {
        let profilePayload = Object.assign({}, this.getGetStarted(), this.getGreeting(), this.getPersistentMenu());
        console.log(JSON.stringify(profilePayload));
        graph_api_1.GraphAPI.callMessengerProfileAPI(profilePayload);
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
            greeting: [{
                    locale: "default",
                    text: res.profile.greeting
                }]
        };
    }
    getPersistentMenu() {
        return {
            persistent_menu: [{
                    locale: "default",
                    composer_input_disabled: false,
                    call_to_actions: [
                        {
                            type: "postback",
                            title: res.menu.home,
                            payload: "HOME"
                        },
                        {
                            type: "web_url",
                            title: res.menu.shop,
                            url: config_1.config.shopUrl,
                            webview_height_ratio: "full"
                        }
                    ]
                }]
        };
    }
}
exports.Profile = Profile;
//# sourceMappingURL=profile.js.map