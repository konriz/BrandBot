"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const delivery_1 = require("./delivery");
const res = __importStar(require("../resources/deliveries.json"));
class FileDeliveriesRepository {
    getDeliveries() {
        let deliveries = [];
        let options = res.delivery;
        for (let option in options) {
            let delivery = new delivery_1.Delivery(option, options[option]);
            deliveries.push(delivery);
        }
        return deliveries;
    }
}
exports.FileDeliveriesRepository = FileDeliveriesRepository;
//# sourceMappingURL=deliveries-repository.js.map