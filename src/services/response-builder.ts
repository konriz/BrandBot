import { nodes } from "../app";
import { User } from "../user/user";

export class ResponseBuilder {

    private _user: User;

    constructor(user: User) {
        this._user = user;
    }

    getResponse(name: string) {
        let message = nodes.getNode(name).getView();
        return {
            recipient: {
              id: this._user.psid
            },
            message: message
          };
    }
}