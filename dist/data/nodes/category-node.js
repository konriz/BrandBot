"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const abstract_node_1 = require("./abstract-node");
const res = __importStar(require("../../locales/resources.json"));
class CategoryNode extends abstract_node_1.AbstractNode {
    constructor(data) {
        super(data);
        this.setType("Link");
        this.url = data["url"];
    }
    getView() {
        let message = {
            quick_replies: this.getQuickReplies(),
            attachment: this.getAttachment()
        };
        return message;
    }
    getAttachment() {
        return {
            type: "template",
            payload: {
                template_type: "button",
                text: this.getMessage(),
                buttons: [
                    {
                        type: "web_url",
                        title: res.nodes.site,
                        url: this.url
                    }
                ]
            }
        };
    }
}
exports.CategoryNode = CategoryNode;
//# sourceMappingURL=category-node.js.map