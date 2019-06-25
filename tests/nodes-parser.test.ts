import { User } from "../src/user/user";

describe('Parser', function() {
    it('parse nodes', function() {
        let user = new User("psid");
        console.log(`User ${user.psid} created.`);
    })
})