"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class QuickReply {
    constructor(title, payload, image) {
        this.content_type = "text";
        this.title = title;
        this.payload = payload;
        this.image_url = image;
    }
}
exports.QuickReply = QuickReply;
//# sourceMappingURL=quick-reply.js.map