import { User } from "./user";

export interface UsersRepository {
    findUser(psid: string): User;
    isUser(psid: string): boolean;
    users: User[];
    addUser(user: User): string;
    updateUser(user: User): string;
}

export class MemoryUsersRepository implements UsersRepository {

    private _users: Map<string, User>;

    constructor() {
        this._users = new Map();

        let user = new User("1");
        user.firstName = "Test";
        user.lastName = "User";
        this._users.set(user.psid, user);
    }

    findUser(psid: string): User {
        return this._users.get(psid);
    }

    isUser(psid: string): boolean {
        let user = this.findUser(psid);
        return user ? true : false;
    }

    get users(): User[] {
        let users: User[] = [];
        this._users.forEach((user) => users.push(user));
        return users;
    }

    addUser(user: User): string {
        this._users.set(user.psid, user);
        return user.psid;
    }

    updateUser(user: User): string {
        this._users.set(user.psid, user);
        return user.psid;
    }

}