import { ResponseBuilder } from "./response-builder";
import { QuickReply } from "./quick-reply";

export interface BotNode {
    getMessage(): any;
}

export class SimpleNode implements BotNode {
    name: string;
    buttonText: string;
    message: string;
    parent: BotNode;
    children: BotNode[];

    constructor(name: string, buttonText: string, message: string, parent?: BotNode, children?: BotNode[]){
        this.name = name;
        this.buttonText = buttonText;
        this.message = message;
        this.parent = parent;
        this.children = children;
    }

    getMessage() {
        let message = ResponseBuilder.getQuickReplyMessage(
            this.message, 
            [new QuickReply(this.buttonText, this.name)]);

        return message;
    }
}

export class UrlNode extends SimpleNode {
    url: String;

    constructor(name: string, buttonText: string, message: string, url:string, parent?: BotNode, children?: BotNode[]) {
        super(name, buttonText, message, parent, children);
        this.url = url;
    }

    getMessage() {
        let message = ResponseBuilder.getQuickReplyMessage(
            this.message, 
            [new QuickReply(this.buttonText, this.name)]);

        return message;
    }

}

export class WelcomeNode extends SimpleNode {
    constructor(name = "WELCOME", buttonText = "Start", message= "Welcome", children?: BotNode[]) {
        super(name, buttonText, message, null, children);
    }
}