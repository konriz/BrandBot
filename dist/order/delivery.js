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
class Send {
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
    static getDeliveries() {
        let deliveries = [];
        let options = res.deliveries.send;
        for (let option in options) {
            let delivery = new Send(option, options[option]);
            deliveries.push(delivery);
        }
        return deliveries;
    }
}
exports.Send = Send;
//# sourceMappingURL=delivery.js.map