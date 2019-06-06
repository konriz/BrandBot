"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = require("../app");
class ResponseBuilder {
    constructor() {
    }
    getErrorMessage() {
        return this.getNodeView("ERROR");
    }
    getHomeNode() {
        return this.getNodeView("HOME");
    }
    getNodeView(name) {
        return app_1.nodesTable.getView(name);
    }
}
exports.ResponseBuilder = ResponseBuilder;
//# sourceMappingURL=response-builder.js.map