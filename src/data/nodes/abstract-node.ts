import { QuickReply } from "../../services/quick-reply";
import * as res from "../../locales/resources.json";

export interface BotNode {
    getName(): string;
    getButtonText(): string;
    getMessage(): string;
    getParent(): BotNode;
    setParent(parent: BotNode): void;
    getChildren(): BotNode[];
    setChildren(children: BotNode[]): void;
    getMap(): Map<string, BotNode>;
    setType(type: string): any;
    getType(): string;
    getView(): any;
}


export abstract class AbstractNode implements BotNode {
    private name: string;
    private buttonText: string;
    private message: string;
    private parent: BotNode;
    private children: BotNode[];
    private type: string;

    constructor(name: string, buttonText: string, message: string){
        this.name = name;
        this.buttonText = buttonText;
        this.message = message;
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

    getParent(): BotNode {
        return this.parent;
    }

    setParent(parent: BotNode) {
        this.parent = parent;
    }

    getChildren(): BotNode[] {
        return this.children;
    }

    setChildren(children: BotNode[]) {
        this.children = children;
    }

    getQuickReplies() {

        let quickReplies : QuickReply[] = [];

        // Add children buttons
        if(this.getChildren()) {
            this.getChildren().forEach(
                (child) => quickReplies.push(new QuickReply(child.getButtonText(), child.getName()))
            )
        }
            
        // Add "back" button leading to parent node
        if(this.getParent()) {
            quickReplies.push(new QuickReply(res.nodes.back, this.getParent().getName()));
        }

        // Add "home" button leading to home node if this is not home node.
        if(this.getName() != "HOME"){
            let homeReply = new QuickReply(res.nodes.home, "HOME");
            quickReplies.push(homeReply);
        }
        
        return quickReplies;
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

    setType(type: string) {
        this.type = type;
    }

    getType() {
        return this.type;
    }

    getView(): any {
        throw new Error("Not implemented!");
    }
}