import data from "./nodes.json";
import { NodesFactory } from "./node-factory.js";
import { BotNode } from "./nodes/abstract-node.js";

export interface NodesParser {
    getNodes(): Map<string, BotNode>;
}

export class NodesTreeParser implements NodesParser{

    private nodes: Map<string,  BotNode>;

    getNodes() : Map<string, BotNode> {
        if(!this.nodes) {
            this.populateNodes();
        }
        return this.nodes;
    }

    private populateNodes() {
        let tree: BotNode[] = [];

        for(let nodeData of data["nodes"]) {
            let node = this.createNode(nodeData);
            tree.push(node);
            console.log(`Root node '${nodeData["name"]}' created.`)
        }

        this.nodes = new Map();
        tree.forEach( (node) => 
            node.getMap().forEach( (value, key) => {
                this.nodes.set(key, value);
            })
        )
    }

    private createNode(nodeData: any, parent?: BotNode): BotNode {

        let node = NodesFactory.createNode(nodeData);

        if(parent) {
            console.log(`Node '${node.getName()}' - setting parent '${parent.getName()}'.`);
            node.setParent(parent);
        }
        
        if(nodeData["children"]) {
            console.log(`Node '${node.getName()}' - setting children.`)
            let childrenNodes: BotNode[] = [];
            let data = nodeData["children"];
            data.forEach( (childData: any) => {
                childrenNodes.push(this.createNode(childData, node));
            } );
            node.setChildren(childrenNodes);
        }
        return node;
    }

}