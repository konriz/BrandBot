"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.config = {
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
    },
    messageDebug: process.env.MESSAGE_DEBUG
};
//# sourceMappingURL=config.js.map