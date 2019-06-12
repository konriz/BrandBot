import { nodesTable } from "../app";
import { User } from "../user/user";

export class ResponseBuilder {

    private _user: User;

    constructor(user: User) {
        this._user = user;
    }
    
    private getNodeView(name: string) {
        return nodesTable.getView(name);
    }

    getResponse(name: string) {
        let message = this.getNodeView(name);
        return {
            recipient: {
              id: this._user.psid
            },
            message: message
          };
    }
}