const mongoose = require('mongoose')

const Schema = mongoose.Schema

const studygroupSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    duration: {
        type: Number,
        required: true
    },
    size: {
        type: Number,
        required: true
    },
    user_id: {
        type: String,
        required: true
    }
}, { timestamps: true })

module.exports = mongoose.model('Studygroup', studygroupSchema)
