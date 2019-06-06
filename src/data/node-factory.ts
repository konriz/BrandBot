import { BotNode } from "./nodes/abstract-node";
import { SimpleNode } from "./nodes/simple-node";

export class NodesFactory {

    public static createNode(data: any): BotNode {

        let node: BotNode;

        if(true) {
            node = this.createSimpleNode(data);
        }
        return node;
    }

    private static createSimpleNode(data: any): SimpleNode {
        let node = new SimpleNode(
            data["name"],
            data["buttonText"],
            data["message"]
        );
        console.log(`Node '${node.getName()}' created as '${node.getType()}'.`);
        return node;
    }

}