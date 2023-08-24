import { NextFunction, Request, Response } from "express";
import { requiredFields } from "../utils/requiredFields";
import { HTTP_400_BAD_REQUEST } from "../utils/statusCodes";

export const requiredFieldsValidator = (fields: string[], type: keyof Request = "body") => {
    if (!Array.isArray(fields)) {
        throw new Error("fields must be an array");
    }
    return (req: Request, res: Response, next: NextFunction) => {
        const errors = requiredFields(fields, req[type]);
        if (errors.length > 0) {
            return res.status(HTTP_400_BAD_REQUEST).json({
                errors
            });
        }
        return next();
    }
}