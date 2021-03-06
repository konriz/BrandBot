"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = require("../app");
class ResponseBuilder {
    constructor(user) {
        this._user = user;
    }
    getResponse(name) {
        let responseNode = app_1.nodesRepository.findNode(name);
        responseNode.user = this._user;
        this._user.lastSeenNodeName = responseNode.name;
        this._user.lastSeen = new Date();
        app_1.usersRepository.updateUser(this._user);
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