import { ResponseApi } from "../../services/response-api";
import { AbstractNode } from "./abstract-node";

export class SimpleNode extends AbstractNode {

    constructor(name: string, buttonText: string, message: string){
        super(name, buttonText, message)
    }

    getView() {
        return ResponseApi.getQuickReplyMessage(
            this.getMessage(), 
            this.getQuickReplies()
        );
    }
    
}

