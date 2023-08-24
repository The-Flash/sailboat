import { isTruthy } from "./objectProps";

export const requiredFields = (required: string[] = [], requestBody:any = {}) => {
    return required.map((field) => {
        return isTruthy(requestBody, field)
            ? null
            : `${field} is required`
    }).filter(item => item != null)
}