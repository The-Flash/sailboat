import sanitize from "sanitize-html";

export const sanitizeInput = (
    inputBody: string | Array<any> | object | null,
): any => {
    if (typeof inputBody === 'string') {
        return sanitize(inputBody)
    } else if (Array.isArray(inputBody)) {
        return inputBody.map(sanitizeInput)
    } else if (typeof inputBody === 'object' && inputBody !== null) {
        return Object.keys(inputBody).reduce((r: any, key: string) => {
            r[key] = sanitizeInput(inputBody[key as keyof typeof inputBody])
            return r
        }, {})
    }

    return inputBody
}