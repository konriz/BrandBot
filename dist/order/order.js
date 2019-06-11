"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Order {
    constructor(user, item) {
        this.user = user;
        this.item = item;
    }
    get delivery() {
        return this._delivery;
    }
    set delivery(delivery) {
        this._delivery = delivery;
    }
    set payment(payment) {
        this._payment = payment;
    }
    get payment() {
        return this._payment;
    }
    set address(address) {
        this._address = address;
    }
}
exports.Order = Order;
//# sourceMappingURL=order.js.map