import data from "./nodes.json";
import { NodesFactory } from "./node-factory.js";
import { BotNode } from "./nodes/abstract-node.js";

export interface NodesParser {
    getNodes(): Map<string, BotNode>;
}

export class NodesTreeParser implements NodesParser{

    private nodes: Map<string,  BotNode>;

    getNodes() : Map<string, BotNode> {
        if(!this.nodes) this.populateNodes();
        return this.nodes;
    }

    private populateNodes() {
        let tree: BotNode[] = [];

        data["nodes"].forEach( nodeData => {
            let node = this.createNode(nodeData);
            tree.push(node);
            console.log(`Root node '${nodeData["name"]}' created.`)
        })
            
        this.nodes = new Map();
        tree.forEach( (node) => 
            node.getMap().forEach( (value, key) => {
                this.nodes.set(key, value);
            })
        )
    }

    private createNode(nodeData: any, parent?: BotNode): BotNode {

        let node: BotNode;
        if(parent) {
            console.log(`Node '${node.getName()}' - setting parent '${parent.getName()}'.`);
            node = NodesFactory.createNode(nodeData, parent);
        } else {
            node = NodesFactory.createNode(nodeData);
        }
        return node;
    }

    

    

}