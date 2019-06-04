import { QuickReply } from "../services/quick-reply";
import { ResponseApi } from "../services/response-api";
import * as res from "../locales/resources.json";

export interface BotNode {
    getName(): string;
    getButtonText(): string;
    setParent(parent: BotNode): void;
    setChildren(children: BotNode[]): void;
    getView(): any;
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

        // Add "home" button leading to home node
        let homeReply = new QuickReply(res.nodes.home, "HOME");
        quickReplies.push(homeReply);
        
        return quickReplies;
    }
}