import { SimpleNode } from "./simple-node";
import * as res from "../../locales/resources.json";

export class DefinedNodes {
    static ERROR = new SimpleNode(
        {
            name: "ERROR",
            buttonText : "Error",
            message: res.nodes.error
        });
}