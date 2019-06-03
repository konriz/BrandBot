import { GraphAPi } from "../src/services/graph-api";

describe('graph-api', function() {
    it('callUserProfileAPI', function() {
        GraphAPi.callUserProfileAPI("1");
    });
});