/**
 * Copyright 2019-present, Facebook, Inc. All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * Messenger For Original Coast Clothing
 * https://developers.facebook.com/docs/messenger-platform/getting-started/sample-apps/original-coast-clothing
 */

"use strict";

// Imports dependencies
const GraphAPi = require("./graph-api"),
  i18n = require("../i18n.config"),
  config = require("./config");

module.exports = class Profile {
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
      text: i18n.__("profile.greeting", {
        user_first_name: "{{user_first_name}}"
      })
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
          title: i18n.__("menu.shop"),
          url: config.shopUrl,
          webview_height_ratio: "full"
        }
      ]
    };

    console.log(menu);
    return menu;
  }
};
