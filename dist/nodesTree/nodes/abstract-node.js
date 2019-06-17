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
const images_1 = require("../../resources/images");
const res = __importStar(require("../../resources/locales/resources.json"));
const message_builder_1 = require("../../services/message-builder");
const node_factory_1 = require("../node-factory");
class AbstractNode {
    constructor(data, parent) {
        this._name = data["name"];
        this._buttonText = data["buttonText"];
        this._message = data["message"];
        this._parent = parent;
        this._children = this.getChildren(data);
    }
    get name() {
        return this._name;
    }
    get buttonText() {
        return this._buttonText;
    }
    get message() {
        return this._message;
    }
    set message(message) {
        this._message = message;
    }
    get parent() {
        return this._parent;
    }
    set parent(parent) {
        this._parent = parent;
    }
    get children() {
        return this._children;
    }
    set children(children) {
        this._children = children;
    }
    set type(type) {
        this._type = type;
    }
    get type() {
        return this._type;
    }
    getChildren(nodeData) {
        let children = [];
        if (nodeData["children"]) {
            nodeData["children"].forEach((child) => {
                children.push(node_factory_1.NodesFactory.createNode(child, this));
            });
        }
        return children;
    }
    setUser(user) {
        this._user = user;
    }
    getUser() {
        return this._user;
    }
    getQuickReplies() {
        let quickReplies = [];
        // Add children buttons
        if (this.children) {
            this.children.forEach((child) => quickReplies.push(new quick_reply_1.QuickReply(child.buttonText, child.name)));
        }
        // Add "back" button leading to parent node
        if (this.parent) {
            quickReplies.push(new quick_reply_1.QuickReply(res.nodes.back, this.parent.name, images_1.images.back));
        }
        // Add "home" button leading to home node if this is not home node.
        if (this.name != "HOME") {
            let homeReply = new quick_reply_1.QuickReply(res.nodes.home, "HOME", images_1.images.home);
            quickReplies.push(homeReply);
        }
        return quickReplies;
    }
    getMap() {
        let maps = [];
        // insert current node into map
        let map = new Map();
        map.set(this.name, this);
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
    getView() {
        return message_builder_1.MessageBuilder.getQuickReplyMessage(this.message, this.getQuickReplies());
    }
}
exports.AbstractNode = AbstractNode;
//# sourceMappingURL=abstract-node.js.map