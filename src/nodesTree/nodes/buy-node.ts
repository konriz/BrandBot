import { AbstractNode } from "./abstract-node";
import { ItemNode } from "./item-node";
import * as res from "../../resources/locales/resources.json";
import { Order } from "../../order/order";
import { Delivery } from "../../order/delivery";
import { Payment } from "../../order/payment";

abstract class OrderNode extends AbstractNode {

    private _order: Order;
    private _itemNode: ItemNode;

    constructor(parent: ItemNode, resources: any) {
        super({
            name: `${resources.prefix}_${parent.name}`,
            buttonText: resources.btn,
            message: resources.message
        });
        this._itemNode = parent;
        this.parent = parent;
    }

    get order(): Order {
        return this._order;
    }

    set order(order: Order) {
        this._order = order;
    }

    get itemNode() {
        return this._itemNode;
    }
}

export class BuyNode extends OrderNode {

    constructor(parent: ItemNode) {
        super(parent, res.nodes.buy);
        this.parent = parent;
        this.type = "Buy";
        this.order = new Order(null, parent.item);
        this.children = [new SendNode(parent, this.order)];
    }
}

class SendNode extends OrderNode {

    constructor(parent: ItemNode, order: Order) {
        super(parent, res.nodes.send);
        this.parent = parent;
        this.type = "Send";
        this.order = order;
        this.order.delivery = new Delivery("Kurier");
        this.children = [new PayNode(parent, this.order)];
    }

}

class PayNode extends OrderNode {

    constructor(parent: ItemNode, order: Order) {
        super(parent, res.nodes.pay);
        this.parent = parent;
        this.type = "Pay";
        this.order = order;
        this.order.payment = new Payment("Przelew");
        this.children = [new AddressNode(parent, this.order)];
    }

}

class AddressNode extends OrderNode {

    constructor(parent: ItemNode, order: Order) {
        super(parent, res.nodes.pay);
        this.parent = parent;
        this.type = "Address";
        this.order = order;
        this.order.address = "New address";
        this.children = [new ConfirmNode(parent, this.order)];
    }
}

class ConfirmNode extends OrderNode {

    constructor(parent: ItemNode, order: Order) {
        super(parent, res.nodes.pay);
        this.type = "Confirm";
        this.parent = parent;
        this.order = order;
        console.log(JSON.stringify(this.order));
    }

}