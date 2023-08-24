import { NextFunction, Request, Response } from "express";
import { APIError } from "../utils/apiError";

export const errorHandler = (err: Error, _req: Request, res: Response, next: NextFunction) => {
    if (!err.message) {
        return next(err);
    }
    if (err instanceof APIError) {
        return res.status(err.code).json({
            message: err.message
        });
    }
    next(err);
}