"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const res = __importStar(require("../resources/locales/resources.json"));
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
    static getPayments() {
        let payments = [];
        let options = res.deliveries.pay;
        for (let option in options) {
            let payment = new Payment(option, options[option]);
            payments.push(payment);
        }
        return payments;
    }
}
exports.Payment = Payment;
//# sourceMappingURL=payment.js.map