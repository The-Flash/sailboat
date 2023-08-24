function navigateObj(obj: any, path: string): object {
    let value = obj;
    const pathArray = path.split(".");
    pathArray.forEach((p: string) => {
        value = value[p];
    });
    return value;
}

export function isTruthy(obj: object, path: string) {
    try {
        if (Array.isArray(path)) {
            for (let p of path) {
                const value = navigateObj(obj, p);
                if (!value) {
                    return false;
                }
            }
            return true;
        } else {
            const value = navigateObj(obj, path);
            return !!value;
        }
    } catch (e) {
        if (e instanceof TypeError) {
            return false;
        }
    }
}

export function isFalsey(obj: object, path: string) {
    return !isTruthy(obj, path);
}