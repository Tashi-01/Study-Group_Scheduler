const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const dateSchema = new Schema({
    date: {
        type: Date, 
        required: true
    },
    studyGroup: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Studygroup',        
        required: true
    }
}, { timestamps: true });

module.exports = mongoose.model('Date', dateSchema);
