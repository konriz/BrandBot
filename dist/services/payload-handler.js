"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class PayloadHandler {
    static handle(payload) {
        let response = {
            text: `Payload: ${payload}`
        };
        return response;
    }
}
exports.PayloadHandler = PayloadHandler;
//# sourceMappingURL=payload-handler.js.map