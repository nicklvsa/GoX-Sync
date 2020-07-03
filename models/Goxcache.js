const mongoose = require('mongoose');

const goxCacheSchema = new mongoose.Schema({
    id: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    key: {
        type: String,
        required: true,
    },
    data: {
        type: Object,
        required: true,
    },
    expiration: {
        type: Object,
        required: true,
    }
});

module.exports = mongoose.model('GoxCache', goxCacheSchema);