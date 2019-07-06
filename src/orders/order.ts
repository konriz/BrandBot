import { User } from "../user/user";
import { Item } from "../item/item";
import { Delivery } from "./delivery";
import { Payment } from "./payment";
import { orders } from "../app";

export interface Order {
    oid: string;
    user: User;
    item: Item;
    delivery: Delivery;
    payment: Payment;
    address: string;
    confirmed: boolean;
    sum(): number;
    getMessage(): string;
    confirm(): void;
}

export class OrderImpl implements Order {
    private _oid: string;
    private _user: User;
    private _item: Item;
    private _delivery: Delivery;
    private _payment: Payment;
    private _address: string;
    private _confirmed: boolean = false;

    constructor(user: User, item: Item) {
        this._user = user;
        this._item = item;
    }

    get oid() {
        return this._oid;
    }

    get user(): User {
        return this._user;
    }

    set user(user: User) {
        this._user = user;
    }

    get item(): Item {
        return this._item;
    }

    get delivery(): Delivery {
        return this._delivery;
    }

    set delivery(delivery: Delivery) {
        this._delivery = delivery;
    }

    get payment(): Payment {
        return this._payment;
    }

    set payment(payment: Payment) {
        this._payment = payment;
    }

    get address(): string {
        return this._address;
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

    confirm(): void {
        this._confirmed = true;
        this._oid = Date.now().toString();
        // FIXME this is VERY BAD - side effects.
        // adding order should be moved elsewhere
        // no repository in DTO!
        orders.addOrder(this);
        console.log(`Order ${this._oid} confirmed`);
    }
}