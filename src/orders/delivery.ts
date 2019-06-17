import * as res from "../resources/deliveries.json"

export class Delivery {
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

    get string(): string {
        return `${this._name} : ${this._price}`
    }

    static getDeliveries(): Delivery[] {
        let deliveries: Delivery[] = [];
        let options: any = res.delivery;
        for(let option in options) {
            let delivery = new Delivery(option, options[option]);
            deliveries.push(delivery);
        }
        return deliveries;
    }
    
}
