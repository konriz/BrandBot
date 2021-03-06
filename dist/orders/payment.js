"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Payment {
    constructor(name, price) {
        this._name = name;
        this._price = price;
    }
    get name() {
        return this._name;
    }
    get price() {
        return this._price;
    }
    get string() {
        return `${this._name} : ${this._price}`;
    }
}
exports.Payment = Payment;
//# sourceMappingURL=payment.js.map