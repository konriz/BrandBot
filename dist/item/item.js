"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Item {
    constructor(name, price, url) {
        this._name = name;
        this._price = price;
        this._url = url;
    }
    /**
     * Getter id
     * @return {string}
     */
    get id() {
        return this._id;
    }
    /**
     * Getter name
     * @return {string}
     */
    get name() {
        return this._name;
    }
    /**
     * Getter price
     * @return {string}
     */
    get price() {
        return this._price;
    }
    /**
     * Getter url
     * @return {string}
     */
    get url() {
        return this._url;
    }
    /**
     * Setter id
     * @param {string} value
     */
    set id(value) {
        this._id = value;
    }
    /**
     * Setter name
     * @param {string} value
     */
    set name(value) {
        this._name = value;
    }
    /**
     * Setter price
     * @param {string} value
     */
    set price(value) {
        this._price = value;
    }
    /**
     * Setter url
     * @param {string} value
     */
    set url(value) {
        this._url = value;
    }
}
exports.Item = Item;
//# sourceMappingURL=item.js.map