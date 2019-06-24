"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = require("../app");
class ResponseBuilder {
    constructor(user) {
        this._user = user;
    }
    getResponse(name) {
        let responseNode = app_1.nodes.getNode(name);
        responseNode.setUser(this._user);
        this._user.lastSeenNodeName = responseNode.getName();
        this._user.lastSeen = new Date();
        app_1.users.updateUser(this._user);
        return {
            recipient: {
                id: this._user.psid
            },
            message: responseNode.getView()
        };
    }
}
exports.ResponseBuilder = ResponseBuilder;
//# sourceMappingURL=response-builder.js.map