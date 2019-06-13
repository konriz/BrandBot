import { Order } from "./order";
import { User } from "../user/user";
import { Item } from "../item/item";
import { Delivery } from "./delivery";
import { Payment } from "./payment";

export interface OrdersRepository {
    getOrder(oid: string): Order;
    getAllOrders(): Order[];
    addOrder(order: Order): string;
    updateOrder(order: Order): string;
}

export class OrdersMemoryRepository implements OrdersRepository {
    
    private _orders: Map<string, Order>;

    constructor() {
        this._orders = new Map();

        let user = new User("2");
        user.firstName = "Test";
        user.lastName = "User";
        let item = new Item("test item", "1", "www");
        let order = new Order(user, item);
        order.oid = "1";
        order.delivery = new Delivery("test delivery", "1");
        order.payment = new Payment("test payment", "1");

        this._orders.set(order.oid, order);
    }

    getOrder(oid: string): Order {
        return this._orders.get(oid);
    }

    getAllOrders(): Order[] {
        let orders: Order[] = [];
        this._orders.forEach((order) => orders.push(order));
        return orders;
    }

    addOrder(order: Order): string {
        this._orders.set(order.oid, order);
        return order.oid;
    }

    updateOrder(order: Order): string {
        this._orders.set(order.oid, order);
        return order.oid;
    }
}