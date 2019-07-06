import { Order } from "./order";

export interface OrdersRepository {
    getOrder(oid: string): Order;
    getAllOrders(): Order[];
    addOrder(order: Order): string;
    updateOrder(order: Order): string;
}

export class MemoryOrdersRepository implements OrdersRepository {
    
    private _orders: Map<string, Order>;

    constructor() {
        this._orders = new Map();
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