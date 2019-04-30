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

// Use dotenv to read .env vars into Node
require("dotenv").config();

module.exports = {
  // Messenger Platform API
  mPlatformDomain: "https://graph.facebook.com",
  mPlatformVersion: "v3.2",

  // Page and Application information
  pageId: process.env.PAGE_ID,
  appId: process.env.APP_ID,
  pageAccesToken: process.env.PAGE_ACCESS_TOKEN,
  appSecret: process.env.APP_SECRET,
  verifyToken: process.env.VERIFY_TOKEN,

  // URL of your app domain
  appUrl: process.env.APP_URL,

  // URL of your website
  shopUrl: process.env.SHOP_URL,

  // Preferred port (default to 3000)
  port: process.env.PORT || 3000,

  get mPlatfom() {
    return this.mPlatformDomain + "/" + this.mPlatformVersion;
  },

  // URL of your webhook endpoint
  get webhookUrl() {
    return this.appUrl + "/webhook";
  }
};
