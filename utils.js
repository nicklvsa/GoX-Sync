exports.filterUndef = (obj) => {
    Object.keys(obj).forEach((key) => {
        if (obj[key] && typeof obj[key] === 'object') this.filterUndef(obj[key]);
        else if (obj[key] === null || obj[key] == undefined) delete obj[key];
    });
    return obj;
};

exports.clearEmpties = (obj) => {
    for (let k in obj) {
        if (!obj[k] || typeof obj[k] !== "object") {
            continue;
        }
        if (Object.keys(obj[k]).length <= 0) {
            delete obj[k];
        }
    }
    return obj;
};