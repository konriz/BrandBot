import { GraphAPi } from "./graph-api";
import { config } from "./config";

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

    GraphAPi.callMessengerProfileAPI(profilePayload);
  }

  setGetStarted() {
    let getStartedPayload = this.getGetStarted();
    GraphAPi.callMessengerProfileAPI(getStartedPayload);
  }

  setGreeting() {
    let greetingPayload = this.getGreeting();
    GraphAPi.callMessengerProfileAPI(greetingPayload);
  }

  setPersistentMenu() {
    let menuPayload = this.getPersistentMenu();
    GraphAPi.callMessengerProfileAPI(menuPayload);
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
          url: config.shopUrl,
          webview_height_ratio: "full"
        }
      ]
    };

    console.log(menu);
    return menu;
  }
};
