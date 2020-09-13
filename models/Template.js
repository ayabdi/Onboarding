const mongoose = require('mongoose');

const templateSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },

    emails: [{
        subject: {
            type: String,
            required: true
        },
        message: {
            type: String,
            required: true
        }
    }],

    tasks: [{
        lat: {
            
        },
        lng: {
            
        }
    }]
});

module.exports = mongoose.model('template', templateSchema);