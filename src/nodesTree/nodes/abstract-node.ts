import { QuickReply } from "../quick-reply";
import { images } from "../../resources/images";
import * as res from "../../resources/locales/resources.json"
import { MessageBuilder } from "../../services/message-builder";
import { NodesFactory } from "../node-factory";
import { User } from "../../user/user";

export interface BotNode {
    name: string;
    user: User;
    type: string;
    buttonText: string;
    getMap(): Map<string, BotNode>;
    getView(): any;
    getQuickReplies(): QuickReply[];
}

export abstract class AbstractNode implements BotNode {
    private _name: string;
    private _buttonText: string;
    private _message: string;
    private _parent: BotNode;
    private _children: BotNode[];
    private _type: string;
    private _user: User;

    constructor(data: any, parent?: BotNode){
        this._name = data["name"];
        this._buttonText = data["buttonText"];
        this._message = data["message"];
        this._parent = parent;
        this._children = this.populateChildren(data);
    }

    private populateChildren(nodeData: any): BotNode[] {
        let children: BotNode[] = [];
        if(nodeData["children"]) {
            nodeData["children"].forEach( (child: any) => {
                children.push(NodesFactory.createNode(child, this));
            });
        }
        return children;
    }

    get name(): string {
        return this._name;
    }

    get buttonText(): string {
        return this._buttonText;
    }

    get message() {
        return this._message;
    }

    set message(message: string) {
        this._message = message;
    }

    get parent(): BotNode {
        return this._parent;
    }

    set parent(parent: BotNode) {
        this._parent = parent;
    }

    get children(): BotNode[] {
        return this._children;
    }

    set children(children: BotNode[]) {
        this._children = children;
    }

    set type(type: string) {
        this._type = type;
    }

    get type(): string {
        return this._type;
    }

    get user(): User {
        return this._user;
    }

    set user(user: User) {
        this._user = user;
    }


    getQuickReplies() {

        let quickReplies : QuickReply[] = [];

        // Add children buttons
        if(this.children) {
            this.children.forEach(
                (child) => quickReplies.push(new QuickReply(child.buttonText, child.name))
            )
        }
            
        // Add "back" button leading to parent node
        if(this.parent) {
            quickReplies.push(new QuickReply(res.nodes.back, this.parent.name, images.back));
        }

        // Add "home" button leading to home node if this is not home node.
        if(this.name != "HOME"){
            let homeReply = new QuickReply(res.nodes.home, "HOME", images.home);
            quickReplies.push(homeReply);
        }
        
        return quickReplies;
    }

    getMap(): Map<string, BotNode> {

        let maps: Map<string, BotNode>[] = [];

        // insert current node into map
        let map: Map<string, BotNode> = new Map();
        map.set(this.name, this);
        maps.push(map);

        // insert children nodes into map
        if(this.children){
            this.children.forEach( (child) => {
                maps.push(child.getMap());
            })
        }

        let result: Map<string, BotNode> = new Map();
        maps.forEach( (map) => {
            map.forEach( (value, key) => {
                result.set(key, value);
            })
        })
        return result;
    }

    getView() {
        return MessageBuilder.getQuickReplyMessage(this.message, this.getQuickReplies());
    }
}