"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const order_1 = require("./order");
const user_1 = require("../user/user");
const item_1 = require("../item/item");
const delivery_1 = require("./delivery");
const payment_1 = require("./payment");
class OrdersMemoryRepository {
    constructor() {
        this._orders = new Map();
        this._orders.set("-1", this.testOrder());
    }
    testOrder() {
        let user = new user_1.User("2");
        user.firstName = "Test";
        user.lastName = "User";
        let item = new item_1.Item("test item", "1", "www");
        let order = new order_1.Order(user, item);
        order.delivery = new delivery_1.Delivery("test delivery", "1");
        order.payment = new payment_1.Payment("test payment", "1");
        return order;
    }
    getOrder(oid) {
        return this._orders.get(oid);
    }
    getAllOrders() {
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
exports.OrdersMemoryRepository = OrdersMemoryRepository;
//# sourceMappingURL=orders-repository.js.map