import { AbstractNode } from "./abstract-node";
import { ItemNode } from "./item-node";
import * as res from "../../resources/locales/resources.json";

export class BuyNode extends AbstractNode {

    constructor(data: any) {
        super({
            name: `BUY_${data["name"]}`,
            buttonText: `Kup za ${data["price"]}`,
            message: res.nodes.send
        });
        this.setType("Buy");
        this.setParent(new ItemNode(data));
        this.setChildren([new SendNode(this, data)]);
    }
}

class SendNode extends AbstractNode {
    constructor(parent: BuyNode, data: any) {
        super({
            name: `SEND_${data["name"]}`,
            buttonText: `Kurier (+15,00)`,
            message: res.nodes.pay
        });
        this.setType("Buy");
        this.setParent(parent);
        this.setChildren([new PayNode(this, data)]);
    }
}

class PayNode extends AbstractNode {
    constructor(parent: BuyNode, data: any) {
        super({
            name: `PAY_${data["name"]}`,
            buttonText: `Przelew (+0,00)`,
            message: res.nodes.address
        });
        this.setType("Buy");
        this.setParent(parent);
        this.setChildren([new AddressNode(this, data)]);
    }
}

class AddressNode extends AbstractNode {
    constructor(parent: PayNode, data: any) {
        super({
            name: `ADDRESS_${data["name"]}`,
            buttonText: `Podano adres`,
            message: res.nodes.confirm
        });
        this.setType("Buy");
        this.setParent(parent);
        this.setChildren([new ConfirmNode(this, data)]);
    }
}

class ConfirmNode extends AbstractNode {
    constructor(parent: AddressNode, data: any) {
        super({
            name: `CONFIRM_${data["name"]}`,
            buttonText: `Zatwierdź`,
            message: res.nodes.confirm
        });
        this.setType("Buy");
        this.setParent(parent);
    }
}