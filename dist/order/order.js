"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Order {
    constructor(user, item) {
        this.user = user;
        this.item = item;
    }
    set delivery(delivery) {
        this._delivery = delivery;
    }
    set payment(payment) {
        this._payment = payment;
    }
    set address(address) {
        this._address = address;
    }
}
exports.Order = Order;
//# sourceMappingURL=order.js.map