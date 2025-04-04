const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const chatSchema = new Schema({
    studyGroup: {
        type: String, // Store the study group name
        required: true
    },
    user: {
        type: String, // Store the username of the person sending the message
        required: true
    },
    message: {
        type: String, // The chat message
        required: true
    },
    timestamp: {
        type: Date,
        default: Date.now
    }
}, { timestamps: true });

module.exports = mongoose.model('Chat', chatSchema);
