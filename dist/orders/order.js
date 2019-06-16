"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = require("../app");
class Order {
    constructor(user, item) {
        this._confirmed = false;
        this.user = user;
        this.item = item;
    }
    get oid() {
        return this._oid;
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
    get confirmed() {
        return this._confirmed;
    }
    sum() {
        let price = +((this.item.price).replace(",", "."));
        let delivery = +((this.delivery.price).replace(",", "."));
        let payment = +((this.payment.price).replace(",", "."));
        return (price + delivery + payment);
    }
    getMessage() {
        let user = "";
        if (this.user) {
            user = `Zamawiający - ${this.user.firstName} ${this.user.lastName}`;
        }
        let item = `Przedmiot - ${this.item.name}`;
        let price = `Cena - ${this.item.price}`;
        let delivery = `Przesyłka - ${this.delivery.string}`;
        let payment = `Sposób zapłaty - ${this.payment.string}`;
        let sum = `Do zapłaty - ${this.sum().toFixed(2).replace(".", ",")}`;
        return [user, item, price, delivery, payment, sum].join("\n");
    }
    confirm() {
        this._confirmed = true;
        this._oid = Date.now().toString();
        app_1.orders.addOrder(this);
        console.log(`Order ${this._oid} confirmed`);
    }
}
exports.Order = Order;
//# sourceMappingURL=order.js.map