import { AbstractNode } from "./nodes/abstract-node";
import { SimpleNode } from "./nodes/simple-node";
import { ItemNode } from "./nodes/item-node";
import { LinkNode } from "./nodes/category-node";

export class NodesFactory {

    public static createNode(nodeData: any, parent?: AbstractNode): AbstractNode {

        let node: AbstractNode;

        if(nodeData["url"] && nodeData["price"]){
            node = new ItemNode(nodeData, parent);
        } else if (nodeData["url"]){
            node = new LinkNode(nodeData, parent);
        }
        else {
            node = new SimpleNode(nodeData, parent);
        }

        console.log(`Node '${node.name}' created as '${node.type}'.`);
        return node;
    }
}