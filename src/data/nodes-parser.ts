import data from "./nodes.json";
import * as Nodes from "./node";

export class NodesParser{

    private static nodes: Map<string, Nodes.BotNode>;

    static getNodes() : Map<string, Nodes.BotNode> {
        if(!this.nodes) {
            this.populateNodes();
        }
        return this.nodes;
    }

    private static populateNodes() {
        let nodes: Map<string, Nodes.BotNode> = new Map();
        for(let nodeData of data["nodes"]) {

            let node = new Nodes.SimpleNode(
                nodeData["name"],
                nodeData["buttonText"],
                nodeData["message"]
            )
            nodes.set(node.getName(), node);
            console.log(`Node named : '${node.getName()}' saved.`);
        }
        this.nodes = nodes;

        this.nodes.forEach( (node) => {
            this.assignParents(node);
            this.assignChildren(node);
        })
    }

    private static assignParents(node: Nodes.BotNode) {
        let parentName = this.getParentName(node);
        if(parentName) {
            let parent = this.findNode(parentName);
            node.setParent(parent);
            console.log(`Node named : '${node.getName()}' parent assigned.`);
        } else {
            console.log(`Node named : '${node.getName()}' has no parrent.`);
        }
    }

    private static getParentName(node: Nodes.BotNode): string {
        for(let nodeData of data["nodes"]) {
            if(nodeData["name"] == node.getName()){
                return nodeData["parent"];
            }
        }
    }

    private static assignChildren(node: Nodes.BotNode) {
        let childrenNames = this.getChildrenNames(node);
        if(childrenNames) {
            let children: Nodes.BotNode[] = [];
            childrenNames.forEach( (name) => {
                let child = this.findNode(name);
                children.push(child);
            })
            
            node.setChildren(children);
            console.log(`Node named : '${node.getName()}' children assigned.`);
        } else {
            console.log(`Node named : '${node.getName()}' has no children.`);
        }
    }

    private static getChildrenNames(node: Nodes.BotNode): string[] {
        for(let nodeData of data["nodes"]) {
            if(nodeData["name"] == node.getName()){
                return nodeData["children"];
            }
        }
    }

    private static findNode(name: string): Nodes.BotNode {
        let node = this.nodes.get(name);
        return node;
    }
}