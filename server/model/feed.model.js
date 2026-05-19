const { Schema, model } = require('mongoose');

const feedSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
    author: {
        type: String,
        required: true,
    }
}, { timestamps: true });

const Feed = model('Feed', feedSchema);

module.exports = Feed;