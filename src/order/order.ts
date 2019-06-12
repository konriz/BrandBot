import { User } from "../user/user";
import { Item } from "../item/item";
import { Delivery } from "./delivery";
import { Payment } from "./payment";

export class Order {
    id: string;
    user: User;
    item: Item;
    private _delivery: Delivery;
    private _payment: Payment;
    private _address: string;

    constructor(user: User, item: Item) {
        this.user = user;
        this.item = item;
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

    sum(): number {
        let price = +this.item.price;
        let delivery = +this.delivery.price;
        let payment = +this.payment.price;
        return (price + delivery + payment);
    }

    getMessage() : string {

        let item = `Przedmiot : ${this.item.name}`;
        let price = `Cena : ${this.item.price}`;
        let delivery = `Przesyłka : ${this.delivery.string}`;
        let payment = `Sposób zapłaty : ${this.payment.string}`;
        let sum = `Do zapłaty : ${this.sum()}`
        return [item, price, delivery, payment, sum].join("\n");
    }
}