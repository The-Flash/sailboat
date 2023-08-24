import { NextFunction, Request, Response } from "express";
import { sanitizeInput } from "../utils/sanitizeInput";

export const inputSanitizer = (req: Request, res: Response, next: NextFunction) => {
    req.body = sanitizeInput(req.body);
    next();
}