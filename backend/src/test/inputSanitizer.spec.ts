import { mockRes } from "sinon-express-mock";
import { spy } from "sinon";
import { expect } from "chai";
import { inputSanitizer } from "../middlewares/inputSanitizer";

describe("inputSanitizer", function() {
    it("assigns req.body with sanitized input", function() {
        const req = {
            body: "<hello/>"
        }
        const res = mockRes();
        const next = spy();

        inputSanitizer(req as any, res, next);
        expect(req.body).to.be.eq("");
        expect(next).to.be.called;
    })
})