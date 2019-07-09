import { Payment } from "./payment";
import * as res from "../resources/payments.json";

export interface PaymentsRepository {
    payments: Payment[];
}

export class FilePaymentsRepository implements PaymentsRepository {
    get payments(): Payment[] {
        let payments: Payment[] = [];
        let options: any = res.payment;
        for(let option in options) {
            let payment = new Payment(option, options[option]);
            payments.push(payment);
        }
        return payments;
    }
}