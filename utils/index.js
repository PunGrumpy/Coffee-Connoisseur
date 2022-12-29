export const isEmpty = (obj) => {
    if (obj === undefined || obj === null) {
        return false;
    }
    return Object.keys(obj).length === 0;
};
