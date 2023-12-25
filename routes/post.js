const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    postCaption: {
        type: String,
        required: true
    },
    file: {
        type: String,
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    likes: {
        type: Array,
        default: []
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Post', postSchema);
