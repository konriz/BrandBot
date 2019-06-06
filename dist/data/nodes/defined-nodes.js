"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const simple_node_1 = require("./simple-node");
const res = __importStar(require("../../locales/resources.json"));
class DefinedNodes {
}
DefinedNodes.ERROR = new simple_node_1.SimpleNode({
    name: "ERROR",
    buttonText: "Error",
    message: res.nodes.error
});
exports.DefinedNodes = DefinedNodes;
//# sourceMappingURL=defined-nodes.js.map