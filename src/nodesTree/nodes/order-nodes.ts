import { AbstractNode } from "./abstract-node";
import { ItemNode } from "./item-node";
import { Order } from "../../orders/order";
import * as res from "../../resources/locales/resources.json";
import * as images from "../../resources/images";
import { Delivery } from "../../orders/delivery";
import { Payment } from "../../orders/payment";
import { User } from "../../user/user";
import { orders } from "../../app";
import { QuickReply } from "../quick-reply";

abstract class OrderNode extends AbstractNode {

    constructor(parent: ItemNode, resources: any) {
        super({
            name: `${resources.prefix}_${parent.name}`,
            buttonText: resources.btn,
            message: resources.message
        });
        this.parent = parent;
    }

}

export class SendNode extends OrderNode {

    constructor(parent: ItemNode) {
        super(parent, {
            prefix: res.nodes.send.prefix,
            btn: `${res.nodes.buy.btn} : ${parent.item.price}`,
            message: `${res.nodes.send.message}`
        });
        this.parent = parent;
        this.type = "Send";

        this.children = [];
        Delivery.getDeliveries().forEach( (delivery) => {
            this.children.push(new PayNode(this, parent, delivery));
        } );
    }
}

class PayNode extends OrderNode {

    constructor(parent: SendNode, itemNode: ItemNode, delivery: Delivery) {
        super(itemNode, {
            prefix: `${res.nodes.pay.prefix}_${delivery.name}`,
            btn: `${delivery.string}`,
            message: `${res.nodes.pay.message}`
        });
        this.parent = parent;
        this.type = "Pay";

        this.children = [];
        Payment.getPayments().forEach( (payment) => {
            this.children.push(new ConfirmNode(this, itemNode, delivery, payment));
        } );
    }
}

class ConfirmNode extends OrderNode {

    private _order: Order;
    private _itemNode: ItemNode;

    constructor(parent: PayNode, itemNode: ItemNode, delivery: Delivery, payment: Payment) {
        let order = new Order(null, itemNode.item);
        order.delivery = delivery;
        order.payment = payment;
        super(itemNode, {
            prefix: `${payment.name}_${delivery.name}`,
            btn: `${payment.string}`,
            message: `Zamówienie`
        });
        this._itemNode = itemNode;
        this._order = order;
        this.parent = parent;
        this.type = "Confirm";
        this.children.push(new ConfirmedNode(this));
    }

    get order(): Order {
        return this._order;
    }

    get itemNode(): ItemNode {
        return this._itemNode;
    }

    setUser(user: User) {
        super.setUser(user);
        this._order.user = user;
        this.message = this._order.getMessage();

        console.log(`Order node DEBUG: ${JSON.stringify(this._order)}`);
    }

    getView() {
        this.message = `Czy zatwierdzić zamówienie : \n${this._order.getMessage()}`;
        console.log(`Order node DEBUG: ${JSON.stringify(this._order)}`);
        return super.getView();
    }
}

class ConfirmedNode extends OrderNode {

    private _order: Order;

    constructor(parent: ConfirmNode) {
        super(parent.itemNode, {
            prefix: `CONFIRMED_${parent.order.payment.name}_${parent.order.delivery.name}`,
            btn: `ZATWIERDZAM`,
            message: `Zatwierdzenie zamówienia`
        });
        this._order = parent.order;
        this.type = "Confirmed";
    }

    getView() {
        this._order.confirm();
        this.message = `Zatwierdzono zamówienie : \n${this._order.getMessage()}`;
        console.log(`Order node DEBUG: ${JSON.stringify(this._order)}`);
        return super.getView();
    }

    getQuickReplies() {
        return [new QuickReply(res.nodes.home, "HOME", images.home)];
    }
}
