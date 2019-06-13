"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = require("../app");
class ResponseBuilder {
    constructor(user) {
        this._user = user;
    }
    getResponse(name) {
        let message = app_1.nodes.getNode(name).getView();
        return {
            recipient: {
                id: this._user.psid
            },
            message: message
        };
    }
}
exports.ResponseBuilder = ResponseBuilder;
//# sourceMappingURL=response-builder.js.map