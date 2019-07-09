import { Order } from "./order";

export interface OrdersRepository {
    findOrder(oid: string): Order;
    orders: Order[];
    addOrder(order: Order): string;
    updateOrder(order: Order): string;
}

export class MemoryOrdersRepository implements OrdersRepository {
    
    private _orders: Map<string, Order>;

    constructor() {
        this._orders = new Map();
    }
 
    findOrder(oid: string): Order {
        return this._orders.get(oid);
    }

    get orders(): Order[] {
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