"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = require("../app");
class ResponseBuilder {
    constructor(user) {
        this._user = user;
    }
    getNodeView(name) {
        return app_1.nodesTable.getView(name);
    }
    getResponse(name) {
        let message = this.getNodeView(name);
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