"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = require("../app");
class OrderImpl {
    constructor(user, item) {
        this._confirmed = false;
        this._user = user;
        this._item = item;
    }
    get oid() {
        return this._oid;
    }
    get user() {
        return this._user;
    }
    set user(user) {
        this._user = user;
    }
    get item() {
        return this._item;
    }
    get delivery() {
        return this._delivery;
    }
    set delivery(delivery) {
        this._delivery = delivery;
    }
    get payment() {
        return this._payment;
    }
    set payment(payment) {
        this._payment = payment;
    }
    get address() {
        return this._address;
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
        // FIXME this is VERY BAD - side effects.
        // adding order should be moved elsewhere
        // no repository in DTO!
        app_1.ordersRepository.addOrder(this);
        console.log(`Order ${this._oid} confirmed`);
    }
}
exports.OrderImpl = OrderImpl;
//# sourceMappingURL=order.js.map