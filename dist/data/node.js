"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const quick_reply_1 = require("../services/quick-reply");
const response_api_1 = require("../services/response-api");
const res = __importStar(require("../locales/resources.json"));
class SimpleNode {
    constructor(name, buttonText, message, parent, children) {
        this.type = "Simple";
        this.name = name;
        this.buttonText = buttonText;
        this.message = message;
        this.parent = parent;
        this.children = children;
    }
    getName() {
        return this.name;
    }
    getButtonText() {
        return this.buttonText;
    }
    setParent(parent) {
        this.parent = parent;
    }
    setChildren(children) {
        this.children = children;
    }
    getView() {
        let message = response_api_1.ResponseApi.getQuickReplyMessage(this.message, this.getQuickReplies());
        return message;
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
    getType() {
        return this.type;
    }
    getQuickReplies() {
        let quickReplies = [];
        // Add children buttons
        if (this.children) {
            this.children.forEach((child) => quickReplies.push(new quick_reply_1.QuickReply(child.getButtonText(), child.getName())));
        }
        // Add "back" button leading to parent node
        if (this.parent) {
            quickReplies.push(new quick_reply_1.QuickReply(res.nodes.back, this.parent.getName()));
        }
        // Add "home" button leading to home node if this is not home node.
        if (this.getName() != "HOME") {
            let homeReply = new quick_reply_1.QuickReply(res.nodes.home, "HOME");
            quickReplies.push(homeReply);
        }
        return quickReplies;
    }
}
SimpleNode.errorNode = new SimpleNode("ERROR", "Error", res.nodes.error);
exports.SimpleNode = SimpleNode;
//# sourceMappingURL=node.js.map