const mongoose = require('mongoose');

const authSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    registration_timestamp: {
        type: Date, 
        required: true,
        default: Date.now
    }
});

module.exports = mongoose.model('auth', authSchema);