export class Item {
    id: string;
    name: string;
    price: string;
    url: string;

    constructor(name: string, price: string, url: string) {
        this.name = name;
        this.price = price;
        this.url = url;
    }
}