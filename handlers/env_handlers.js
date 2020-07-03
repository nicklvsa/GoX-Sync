exports.mustGet = (variable) => {
    const found = process.env[variable];
    if (found !== undefined && found !== null && found.length > 0) {
        return found;
    }
    console.error(`Required environment variable "${variable}" was not loaded!`);
    process.exit(1);
};

exports.get = (variable) => {
    const found = process.env[variable] || undefined;
    return found;
};