"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const abstract_node_1 = require("./abstract-node");
const order_1 = require("../../orders/order");
const res = __importStar(require("../../resources/locales/resources.json"));
const images_1 = require("../../resources/images");
const quick_reply_1 = require("../quick-reply");
const app_1 = require("../../app");
const app_2 = require("../../app");
class OrderNode extends abstract_node_1.AbstractNode {
    constructor(parent, resources) {
        super({
            name: `${resources.prefix}_${parent.name}`,
            buttonText: resources.btn,
            message: resources.message
        });
        this.parent = parent;
    }
}
class SendNode extends OrderNode {
    constructor(parent) {
        super(parent, {
            prefix: res.nodes.send.prefix,
            btn: `${res.nodes.buy.btn} : ${parent.item.price}`,
            message: `${res.nodes.send.message}`
        });
        this.parent = parent;
        this.type = res.nodes.send.prefix;
        this.children = [];
        app_1.deliveriesRepository.deliveries.forEach((delivery) => {
            this.children.push(new PayNode(this, parent, delivery));
        });
    }
}
exports.SendNode = SendNode;
class PayNode extends OrderNode {
    constructor(parent, itemNode, delivery) {
        super(itemNode, {
            prefix: `${res.nodes.pay.prefix}_${delivery.name}`,
            btn: `${delivery.string}`,
            message: `${res.nodes.pay.message}`
        });
        this.parent = parent;
        this.type = res.nodes.pay.prefix;
        this.children = [];
        app_2.paymentsRepository.payments.forEach((payment) => {
            this.children.push(new ConfirmNode(this, itemNode, delivery, payment));
        });
    }
}
class ConfirmNode extends OrderNode {
    constructor(parent, itemNode, delivery, payment) {
        let order = new order_1.OrderImpl(null, itemNode.item);
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
        this.type = res.nodes.confirm.prefix;
        this.children.push(new ConfirmedNode(this));
    }
    get order() {
        return this._order;
    }
    get itemNode() {
        return this._itemNode;
    }
    set user(user) {
        super.user = user;
        this._order.user = user;
        this.message = this._order.getMessage();
        console.log(`Order node DEBUG: ${JSON.stringify(this._order)}`);
    }
    getView() {
        this.message = `${res.nodes.confirm.message} \n${this._order.getMessage()}`;
        console.log(`Order node DEBUG: ${JSON.stringify(this._order)}`);
        return super.getView();
    }
}
class ConfirmedNode extends OrderNode {
    constructor(parent) {
        super(parent.itemNode, {
            prefix: `${res.nodes.confirmed.prefix}_${parent.order.payment.name}_${parent.order.delivery.name}`,
            btn: `${res.nodes.confirm.btn}`,
            message: `Zatwierdzenie zamówienia`
        });
        this._order = parent.order;
        this.type = res.nodes.confirmed.prefix;
    }
    getView() {
        this._order.confirm();
        this.message = `${res.nodes.confirmed.message} \n${this._order.getMessage()}`;
        console.log(`Order node DEBUG: ${JSON.stringify(this._order)}`);
        return super.getView();
    }
    getQuickReplies() {
        return [new quick_reply_1.QuickReply(res.nodes.home, "HOME", images_1.images.home)];
    }
}
//# sourceMappingURL=order-nodes.js.map