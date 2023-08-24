import { mockRes } from "sinon-express-mock";
import { spy } from "sinon";
import { expect, use } from "chai";
import sinonChai from "sinon-chai";
import { requiredFieldsValidator } from "../middlewares/requiredFieldsValidator";
import { HTTP_400_BAD_REQUEST } from "../utils/statusCodes";

use(sinonChai);

describe("requiredFieldsValidator", function() {
    it("throws an Error if fields is not an array", function() {
        const fields = "fields";
        try {
            requiredFieldsValidator(fields as any, "body");
            expect.fail();
        } catch(e) {
            expect((e as any).message).to.be.eq("fields must be an array")
        }
    })

    it("calls next if required fields are passed", function() {
        const fields = ["title"];
        const res = mockRes();
        const req = {
            body: {
                title: "task title"
            }
        }
        const next = spy();
        const handler = requiredFieldsValidator(fields, "body");
        handler(req as any, res, next);
        expect(next).to.be.called;
    })
    
    it("throws an 400 bad request if required fields are missing", function() {
        const fields = ["title"];
        const res = mockRes();
        const req = {
            body: {}
        }
        const next = spy();
        const handler = requiredFieldsValidator(fields, "body");
        handler(req as any, res, next);
        expect(next).to.not.be.called;
        expect(res.status).to.be.calledWith(HTTP_400_BAD_REQUEST);
    })
})