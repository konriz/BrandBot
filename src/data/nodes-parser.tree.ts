import data from "./nodes.tree.json";
import * as Nodes from "./node.js";

export class NodesTreeParser {

    private static nodes: Map<string,  Nodes.BotNode>;

    static getNodes() : Map<string, Nodes.BotNode> {
        if(!this.nodes) {
            this.populateNodes();
        }
        return this.nodes;
    }

    private static populateNodes() {
        let tree: Nodes.BotNode[] = [];

        for(let nodeData of data["nodes"]) {
            let node = this.createNode(nodeData);
            tree.push(node);
            console.log(`Root node ${nodeData["name"]} created.`)
        }

        this.nodes = new Map();
        tree.forEach( (node) => 
            node.getMap().forEach( (value, key) => {
                this.nodes.set(key, value);
            })
        )

    }

    private static createNode(nodeData: any, parent?: Nodes.BotNode): Nodes.BotNode {
        let node = new Nodes.SimpleNode(
            nodeData["name"],
            nodeData["buttonText"],
            nodeData["message"]
        );

        console.log(`Node ${node.getName()} initialised.`)

        if(parent) {
            console.log(`Node ${node.getName()} - setting parent ${parent.getName()}.`);
            node.setParent(parent);
        }
        
        if(nodeData["children"]) {
            console.log(`Node ${node.getName()} - setting children.`)
            let childrenNodes: Nodes.BotNode[] = [];
            let data = nodeData["children"];
            data.forEach( (childData: any) => {
                childrenNodes.push(this.createNode(childData, node));
            } );
            node.setChildren(childrenNodes);
        }

        return node;
    }

}