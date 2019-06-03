import { ResponseBuilder } from "../src/services/response-builder";

describe('response-builder', function() {
    it('getSorry', function() {

        let message = ResponseBuilder.getSorryMessage();
        console.log(JSON.stringify(message));
    });
});