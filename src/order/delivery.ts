import * as res from "../resources/locales/resources.json"

export class Send {
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

    static getDeliveries(): Send[] {
        let deliveries: Send[] = [];
        let options: any = res.deliveries.send;
        for(let option in options) {
            let delivery = new Send(option, options[option]);
            deliveries.push(delivery);
        }
        return deliveries;
    }
    
}
