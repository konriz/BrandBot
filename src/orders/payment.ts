
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

    get string(): string {
        return `${this._name} : ${this._price}`
    }

}
