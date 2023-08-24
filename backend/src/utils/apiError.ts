import { HTTP_400_BAD_REQUEST } from "./statusCodes";

export class APIError extends Error {
    constructor(message: string, public code: number = HTTP_400_BAD_REQUEST) {
        super(message);
    }
}