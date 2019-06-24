import { nodes, users } from "../app";
import { User } from "../user/user";
import { BotNode } from "../nodesTree/nodes/abstract-node";

export class ResponseBuilder {

    private _user: User;

    constructor(user: User) {
        this._user = user;
    }

    getResponse(name: string) {
      let responseNode: BotNode = nodes.getNode(name);
      responseNode.setUser(this._user);
      this._user.lastSeenNodeName = responseNode.getName();
      this._user.lastSeen = new Date();
      users.updateUser(this._user);
        return {
            recipient: {
              id: this._user.psid
            },
            message: responseNode.getView()
          };
    }
}