import { QuickReply } from "../services/quick-reply";
import { ResponseApi } from "../services/response-api";

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

    static errorNode = new SimpleNode("ERROR", "Error", "There was an unknown error. Please go back.");

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

        let homeReply = new QuickReply("Go home", "HOME");
        quickReplies.push(homeReply);

        if(this.children) {
            this.children.forEach(
                (child) => quickReplies.push(new QuickReply(child.getButtonText(), child.getName()))
            )
        }
        
        if(this.parent) {
            quickReplies.push(new QuickReply("Back", this.parent.getName()));
        }
        return quickReplies;
    }
}