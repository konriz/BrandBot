"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class MemoryOrdersRepository {
    constructor() {
        this._orders = new Map();
    }
    findOrder(oid) {
        return this._orders.get(oid);
    }
    get orders() {
        let orders = [];
        this._orders.forEach((order) => orders.push(order));
        return orders;
    }
    addOrder(order) {
        this._orders.set(order.oid, order);
        return order.oid;
    }
    updateOrder(order) {
        this._orders.set(order.oid, order);
        return order.oid;
    }
}
exports.MemoryOrdersRepository = MemoryOrdersRepository;
//# sourceMappingURL=orders-repository.js.map