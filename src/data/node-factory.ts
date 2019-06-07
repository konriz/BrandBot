import { BotNode } from "./nodes/abstract-node";
import { SimpleNode } from "./nodes/simple-node";
import { ItemNode } from "./nodes/item-node";
import { LinkNode } from "./nodes/category-node";
import { BuyNode } from "./nodes/buy-node";

export class NodesFactory {

    public static createNode(nodeData: any, parent?: BotNode): BotNode {

        let node: BotNode;
        let childrenNodes: BotNode[] = [];

        if(nodeData["url"] && nodeData["price"]){
            node = new ItemNode(nodeData);
            childrenNodes.push(this.getBuyNode(nodeData));
        } else if (nodeData["url"]){
            node = new LinkNode(nodeData);
        }
        else {
            node = new SimpleNode(nodeData);
        }

        if(nodeData["children"]) childrenNodes.push(...this.getChildrenNodes(nodeData, node));

        node.setChildren(childrenNodes);
        if(parent) node.setParent(parent);

        console.log(`Node '${node.getName()}' created as '${node.getType()}'.`);
        return node;
    }

    private static getBuyNode(nodeData: any) {
        console.log(`Node '${nodeData["name"]}' - setting buy node.`)
        return new BuyNode(nodeData);
    }

    private static getChildrenNodes(data: any, node: BotNode) {

        console.log(`Node '${node.getName()}' - setting children.`)
        let childrenNodes: BotNode[] = [];
        data["children"].forEach( (childData: any) => {
            childrenNodes.push(this.createNode(childData, node));
        } );
        return childrenNodes;
    }
}