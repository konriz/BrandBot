"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const payment_1 = require("./payment");
const res = __importStar(require("../resources/payments.json"));
class FilePaymentsRepository {
    getPayments() {
        let payments = [];
        let options = res.payment;
        for (let option in options) {
            let payment = new payment_1.Payment(option, options[option]);
            payments.push(payment);
        }
        return payments;
    }
}
exports.FilePaymentsRepository = FilePaymentsRepository;
//# sourceMappingURL=payments-repository.js.map