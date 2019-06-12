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
    sum() {
        let price = +((this.item.price).replace(",", "."));
        let delivery = +((this.delivery.price).replace(",", "."));
        let payment = +((this.payment.price).replace(",", "."));
        return (price + delivery + payment);
    }
    getMessage() {
        let item = `Przedmiot : ${this.item.name}`;
        let price = `Cena : ${this.item.price}`;
        let delivery = `Przesyłka : ${this.delivery.string}`;
        let payment = `Sposób zapłaty : ${this.payment.string}`;
        let sum = `Do zapłaty : ${this.sum()}`;
        return [item, price, delivery, payment, sum].join("\n");
    }
}
exports.Order = Order;
//# sourceMappingURL=order.js.map