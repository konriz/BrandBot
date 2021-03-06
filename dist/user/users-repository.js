"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const user_1 = require("./user");
class MemoryUsersRepository {
    constructor() {
        this._users = new Map();
        let user = new user_1.User("1");
        user.firstName = "Test";
        user.lastName = "User";
        this._users.set(user.psid, user);
    }
    findUser(psid) {
        return this._users.get(psid);
    }
    isUser(psid) {
        let user = this.findUser(psid);
        return user ? true : false;
    }
    get users() {
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
        return user.psid;
    }
}
exports.MemoryUsersRepository = MemoryUsersRepository;
//# sourceMappingURL=users-repository.js.map