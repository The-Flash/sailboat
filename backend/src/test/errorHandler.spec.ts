import { mockReq, mockRes } from "sinon-express-mock";
import { spy } from "sinon";
import { errorHandler } from "../middlewares/errorHandler";
import sinonChai from "sinon-chai";
import { expect, use } from "chai";
import { APIError } from "../utils/apiError";


use(sinonChai);

describe("errorHandler", function () {
    it("calls next if error does not have message", async function () {
        const err = new Error();
        const req = mockReq();
        const res = mockRes();
        const next = spy();

        errorHandler(err, req, res, next);

        expect(next.called).to.be.true;
    })

    it("calls next when headers have been sent", async function () {
        const err = new Error("test error");
        const req = mockReq();
        const res = mockRes({
            headersSent: true
        });
        const next = spy();

        errorHandler(err, req, res, next);

        expect(next.called).to.be.true;
    })

    it("responds with correct error code and message when an API Error occurs", function () {
        const err = new APIError("api error");
        const req = mockReq();
        const res = mockRes({
            headerSent: false
        });
        const next = spy();

        errorHandler(err, req, res, next);

        expect(res.status).to.be.calledWithMatch(err.code);
        expect(res.json).to.be.calledWithMatch({
            message: "api error"
        });
    })
})