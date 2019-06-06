import { QuickReply } from "../services/quick-reply";
import { ResponseApi } from "../services/response-api";
import * as res from "../locales/resources.json";

export interface BotNode {
    getName(): string;
    getButtonText(): string;
    setParent(parent: BotNode): void;
    setChildren(children: BotNode[]): void;
    getView(): any;
    getMap(): Map<string, BotNode>;
}

export class SimpleNode implements BotNode {
    private name: string;
    private buttonText: string;
    private message: string;
    private parent: BotNode;
    private children: BotNode[];

    static errorNode = new SimpleNode("ERROR", "Error", res.nodes.error);

    constructor(name: string, buttonText: string, message: string, parent?: BotNode, children?: BotNode[]){
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

    setParent(parent: BotNode) {
        this.parent = parent;
    }

    setChildren(children: BotNode[]) {
        this.children = children;
    }

    getView() {
        let message = ResponseApi.getQuickReplyMessage(
            this.message, 
            this.getQuickReplies()
        );
        return message;
    }

    getMap(): Map<string, BotNode> {

        let maps: Map<string, BotNode>[] = [];

        // insert current node into map
        let map: Map<string, BotNode> = new Map();
        map.set(this.getName(), this);
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

    private getQuickReplies() {

        let quickReplies : QuickReply[] = [];

        // Add children buttons
        if(this.children) {
            this.children.forEach(
                (child) => quickReplies.push(new QuickReply(child.getButtonText(), child.getName()))
            )
        }
            
        // Add "back" button leading to parent node
        if(this.parent) {
            quickReplies.push(new QuickReply(res.nodes.back, this.parent.getName()));
        }

        // Add "home" button leading to home node if this is not home node.
        if(this.getName() != "HOME"){
            let homeReply = new QuickReply(res.nodes.home, "HOME");
            quickReplies.push(homeReply);
        }
        
        return quickReplies;
    }
}