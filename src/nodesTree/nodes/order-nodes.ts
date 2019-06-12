import { AbstractNode } from "./abstract-node";
import { ItemNode } from "./item-node";
import { Order } from "../../order/order";
import * as res from "../../resources/locales/resources.json";
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

export class SendNode extends OrderNode {

    private _deliveries: Delivery[];

    constructor(parent: ItemNode) {
        super(parent, {
            prefix: res.nodes.send.prefix,
            btn: `${res.nodes.buy.btn} (${parent.item.price})`,
            message: `${res.nodes.send.message}`
        });
        this.parent = parent;
        this.type = "Send";
        this.order = new Order(null, parent.item);

        this._deliveries = Delivery.getDeliveries();
        this.children = [];
        this._deliveries.forEach( (delivery) => {
            let order = this.order;
            order.delivery = delivery;
            this.children.push(new PayNode(parent, this, order));
        } );
    }
}

class PayNode extends OrderNode {

    private _payments: Payment[];

    constructor(item: ItemNode, parent: SendNode, order: Order) {
        super(item, {
            prefix: res.nodes.pay.prefix,
            btn: `${order.delivery.string})`,
            message: `${res.nodes.pay.message}`
        });
        this.parent = parent;
        this.type = "Pay";
        this.order = parent.order;

        this._payments = Payment.getPayments();
        this.children = [];
        this._payments.forEach( (payment) => {
            let order = this.order;
            order.payment = payment;
            this.children.push(new ConfirmNode(item, this, order));
        } );
    }
}

class ConfirmNode extends OrderNode {

    constructor(item: ItemNode, parent: PayNode, order: Order) {
        super(item, {
            prefix: res.nodes.confirm.prefix,
            btn: `${order.payment.string}`,
            message: order.getMessage()
        });
        this.parent = parent;
        this.type = "Pay";
        this.order = parent.order;

    }
}
