import data from "../resources/nodes.json";
import { NodesFactory } from "./node-factory";
import { BotNode } from "./nodes/abstract-node";

export interface NodesParser {
    nodes: Map<string, BotNode>;
}

export class NodesTreeParser implements NodesParser{

    private _nodes: Map<string,  BotNode>;

    get nodes() : Map<string, BotNode> {
        if(!this._nodes) this.populateNodes();
        return this._nodes;
    }

    private populateNodes() {
        let tree: BotNode[] = [];
        data["nodes"].forEach( nodeData => {
            let node = this.createNode(nodeData);
            tree.push(node);
            console.log(`Root node '${nodeData["name"]}' created.`)
        })
            
        this._nodes = new Map();
        tree.forEach( (node) => 
            node.getMap().forEach( (value, key) => {
                this._nodes.set(key, value);
            })
        )
    }

    private createNode(nodeData: any, parent?: BotNode): BotNode {

        let node: BotNode;
        if(parent) {
            console.log(`Node '${node.name}' - setting parent '${parent.name}'.`);
            node = NodesFactory.createNode(nodeData, parent);
        } else {
            node = NodesFactory.createNode(nodeData);
        }
        return node;
    }
}