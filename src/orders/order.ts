import { User } from "../user/user";
import { Item } from "../item/item";
import { Delivery } from "./delivery";
import { Payment } from "./payment";
import { orders } from "../app";

export class Order {
    private _oid: string;
    user: User;
    item: Item;
    private _delivery: Delivery;
    private _payment: Payment;
    private _address: string;
    private _confirmed: boolean = false;

    constructor(user: User, item: Item) {
        this.user = user;
        this.item = item;
    }

    get oid() {
        return this._oid;
    }

    get delivery(): Delivery {
        return this._delivery;
    }

    set delivery(delivery: Delivery) {
        this._delivery = delivery;
    }

    set payment(payment: Payment) {
        this._payment = payment;
    }

    get payment(): Payment {
        return this._payment;
    }

    set address(address: string) {
        this._address = address;
    }

    get confirmed() {
        return this._confirmed;
    }

    sum(): number {
        let price = +((this.item.price).replace(",","."));
        let delivery = +((this.delivery.price).replace(",","."));
        let payment = +((this.payment.price).replace(",","."));
        return (price + delivery + payment);
    }

    getMessage() : string {

        let user ="";
        if(this.user) {
            user = `Zamawiający - ${this.user.firstName} ${this.user.lastName}`
        }
        let item = `Przedmiot - ${this.item.name}`;
        let price = `Cena - ${this.item.price}`;
        let delivery = `Przesyłka - ${this.delivery.string}`;
        let payment = `Sposób zapłaty - ${this.payment.string}`;
        let sum = `Do zapłaty - ${this.sum().toFixed(2).replace(".",",")}`
        return [user, item, price, delivery, payment, sum].join("\n");
    }

    confirm() {
        this._confirmed = true;
        this._oid = Date.now().toString();
        orders.addOrder(this);
        console.log(`Order ${this._oid} confirmed`);
    }
}