import { User } from "../user/user";
import { Item } from "../item/item";
import { Send } from "./delivery";
import { Payment } from "./payment";

export class Order {
    id: string;
    user: User;
    item: Item;
    private _delivery: Send;
    private _payment: Payment;
    private _address: string;

    constructor(user: User, item: Item) {
        this.user = user;
        this.item = item;
    }

    get delivery(): Send {
        return this._delivery;
    }

    set delivery(delivery: Send) {
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
}