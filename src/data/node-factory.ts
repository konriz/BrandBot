import { BotNode } from "./nodes/abstract-node";
import { SimpleNode } from "./nodes/simple-node";
import { ItemNode } from "./nodes/item-node";
import { CategoryNode as LinkNode } from "./nodes/category-node";

export class NodesFactory {

    public static createNode(data: any): BotNode {

        let node: BotNode;

        if(data["url"] && data["price"]){
            node = new ItemNode(data);
        } else if (data["url"]){
            node = new LinkNode(data);
        }
        else {
            node = new SimpleNode(data);
        }
        console.log(`Node '${node.getName()}' created as '${node.getType()}'.`);
        return node;
    }
}