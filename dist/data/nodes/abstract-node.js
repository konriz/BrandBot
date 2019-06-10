"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const quick_reply_1 = require("../quick-reply");
const images = __importStar(require("../../resources/images"));
const res = __importStar(require("../../resources/locales/resources.json"));
const message_builder_1 = require("../../services/message-builder");
class AbstractNode {
    constructor(data) {
        this.name = data["name"];
        this.buttonText = data["buttonText"];
        this.message = data["message"];
    }
    getName() {
        return this.name;
    }
    getButtonText() {
        return this.buttonText;
    }
    getMessage() {
        return this.message;
    }
    getParent() {
        return this.parent;
    }
    setParent(parent) {
        this.parent = parent;
    }
    getChildren() {
        return this.children;
    }
    setChildren(children) {
        this.children = children;
    }
    getQuickReplies() {
        let quickReplies = [];
        // Add children buttons
        if (this.getChildren()) {
            this.getChildren().forEach((child) => quickReplies.push(new quick_reply_1.QuickReply(child.getButtonText(), child.getName())));
        }
        // Add "back" button leading to parent node
        if (this.getParent()) {
            quickReplies.push(new quick_reply_1.QuickReply(res.nodes.back, this.getParent().getName(), images.back));
        }
        // Add "home" button leading to home node if this is not home node.
        if (this.getName() != "HOME") {
            let homeReply = new quick_reply_1.QuickReply(res.nodes.home, "HOME", images.home);
            quickReplies.push(homeReply);
        }
        return quickReplies;
    }
    getMap() {
        let maps = [];
        // insert current node into map
        let map = new Map();
        map.set(this.getName(), this);
        maps.push(map);
        // insert children nodes into map
        if (this.children) {
            this.children.forEach((child) => {
                maps.push(child.getMap());
            });
        }
        let result = new Map();
        maps.forEach((map) => {
            map.forEach((value, key) => {
                result.set(key, value);
            });
        });
        return result;
    }
    setType(type) {
        this.type = type;
    }
    getType() {
        return this.type;
    }
    getView() {
        return message_builder_1.MessageBuilder.getQuickReplyMessage(this.getMessage(), this.getQuickReplies());
    }
}
exports.AbstractNode = AbstractNode;
//# sourceMappingURL=abstract-node.js.map