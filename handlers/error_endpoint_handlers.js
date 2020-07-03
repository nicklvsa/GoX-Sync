exports.four0Four = () => {
    return {
        content: '404 not found!',
        error: 404,
    };
}

exports.generalError = (errMsg, errCode) => {
    return {
        content: errMsg,
        error: errCode,
    };
};

exports.generalResponse = (response) => {
    return {
        content: response,
    }
};
