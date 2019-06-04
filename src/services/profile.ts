import { GraphAPi } from "./graph-api";
import { config } from "./config";
import * as res from "../locales/resources.json"

export class Profile {

  constructor() {
    
  }

  setWebhook() {
    GraphAPi.callSubscriptionsAPI();
    GraphAPi.callSubscribedApps();
  }

  setThread() {
    let profilePayload = {
      ...this.getGetStarted(),
      ...this.getGreeting(),
      ...this.getPersistentMenu()
    };

    console.log(JSON.stringify(profilePayload))
    GraphAPi.callMessengerProfileAPI(profilePayload);
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
      text: res.profile.greeting
    };
    return greeting;
  }

  getMenuItems() {
    let menu = {
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
          url: config.shopUrl,
          webview_height_ratio: "full"
        }
      ]
    };
    return menu;
  }
};
