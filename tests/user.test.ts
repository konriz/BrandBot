import { User } from "../src/user/user";
import * as chai from "chai";

describe('User', function() {
    it('is created', function() {
        let psid = "psid";
        let user = new User(psid);
        chai.assert(user.psid === psid);
    }),
    it('address is assigned', function() {
        let psid = "psid";
        let user = new User(psid);

        let address = "address";
        user.address = address;
        chai.assert(user.address === address);
    })
})