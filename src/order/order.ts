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

    set delivery(delivery: Delivery) {
        this._delivery = delivery;
    }

    set payment(payment: Payment) {
        this._payment = payment;
    }

    set address(address: string) {
        this._address = address;
    }
}