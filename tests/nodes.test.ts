import { NodesTable } from "../src/data/nodes";

var nodesTable: NodesTable;

describe('nodes', function() {
    it('print nodes', function() {
        new NodesTable();
        console.log(nodesTable.printNodes());
    });
});