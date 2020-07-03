exports.error = (err) => {
    console.error(`An error occurred with the database: ${err}`);
};

exports.open = () => {
    console.log('Database connection initialized!');
};