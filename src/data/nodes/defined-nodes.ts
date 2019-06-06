import { SimpleNode } from "./simple-node";
import * as res from "../../locales/resources.json";

export class DefinedNodes {
    static ERROR = new SimpleNode("ERROR", "Error", res.nodes.error);
}