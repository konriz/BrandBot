import { QuickReply } from "../quick-reply";
import { images } from "../../resources/images";
import * as res from "../../resources/locales/resources.json"
import { MessageBuilder } from "../../services/message-builder";
import { NodesFactory } from "../node-factory";
import { User } from "../../user/user";

export interface BotNode {
    getMap(): Map<string, BotNode>;
    getView(): any;
    getQuickReplies(): QuickReply[];
    setUser(user: User): void;
    getUser(): User;
    getName(): string;
}

export abstract class AbstractNode implements BotNode {
    private _name: string;
    private _buttonText: string;
    private _message: string;
    private _parent: AbstractNode;
    private _children: AbstractNode[];
    private _type: string;
    private _user: User;

    constructor(data: any, parent?: AbstractNode){
        this._name = data["name"];
        this._buttonText = data["buttonText"];
        this._message = data["message"];
        this._parent = parent;
        this._children = this.getChildren(data);
    }

    get name(): string {
        return this._name;
    }

    getName(): string {
        return this.name;
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

    get parent(): AbstractNode {
        return this._parent;
    }

    set parent(parent: AbstractNode) {
        this._parent = parent;
    }

    get children(): AbstractNode[] {
        return this._children;
    }

    set children(children: AbstractNode[]) {
        this._children = children;
    }

    set type(type: string) {
        this._type = type;
    }

    get type(): string {
        return this._type;
    }

    private getChildren(nodeData: any): AbstractNode[] {
        let children: AbstractNode[] = [];
        if(nodeData["children"]) {
            nodeData["children"].forEach( (child: any) => {
                children.push(NodesFactory.createNode(child, this));
            });
        }
        return children;
    }

    setUser(user: User) {
        this._user = user;
    }

    getUser(): User {
        return this._user;
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