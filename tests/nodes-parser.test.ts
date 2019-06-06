import { NodesTreeParser } from "../src/data/nodes-parser.tree"

describe('Parser', function() {
    it('parse nodes', function() {
        NodesTreeParser.getNodes();
        let nodes = NodesTreeParser.getNodes();
        console.log("Nodes parsed");
    })
})