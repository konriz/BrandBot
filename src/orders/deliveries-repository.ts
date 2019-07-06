import { Delivery } from "./delivery";
import * as res from "../resources/deliveries.json"

export interface DeliveriesRepository {
    getDeliveries(): Delivery[];
}

export class FileDeliveriesRepository implements DeliveriesRepository{

    getDeliveries(): Delivery[] {
        let deliveries: Delivery[] = [];
        let options: any = res.delivery;
        for(let option in options) {
            let delivery = new Delivery(option, options[option]);
            deliveries.push(delivery);
        }
        return deliveries;
    }
}