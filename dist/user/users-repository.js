"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const user_1 = require("./user");
class UsersMemoryRepository {
    constructor() {
        this._users = new Map();
        let user = new user_1.User("1");
        user.firstName = "Test";
        user.lastName = "User";
        this._users.set(user.psid, user);
    }
    getUser(psid) {
        return this._users.get(psid);
    }
    isUser(psid) {
        let user = this.getUser(psid);
        return user ? true : false;
    }
    getAllUsers() {
        let users = [];
        this._users.forEach((user) => users.push(user));
        return users;
    }
    addUser(user) {
        this._users.set(user.psid, user);
        return user.psid;
    }
    updateUser(user) {
        this._users.set(user.psid, user);
        console.log("Updated user:", JSON.stringify(user));
        return user.psid;
    }
}
exports.UsersMemoryRepository = UsersMemoryRepository;
//# sourceMappingURL=users-repository.js.map