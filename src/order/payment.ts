import * as res from "../resources/locales/resources.json";

export class Payment {
    private _name: string;
    private _price: string;

    constructor(name: string, price: string) {
        this._name = name;
        this._price = price;
    }

    get name(): string {
        return this._name;
    }

    get price(): string {
        return this._price;
    }

    static getPayments(): Payment[] {
        let payments: Payment[] = [];
        let options: any = res.deliveries.pay;
        for(let option in options) {
            let payment = new Payment(option, options[option]);
            payments.push(payment);
        }
        return payments;
    }
}
