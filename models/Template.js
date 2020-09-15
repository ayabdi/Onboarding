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
        },
        days: {
            type: [Number],
            required: true
        }
    }],

    tasks: [{
        name: {
            type: String,
            required: true
        },
        note: {
            type: String,
            required: true
        },
        due_days: {
            type: Number,
            required: true
        },
        reminder_days: {
            type: [Number],
            required: true
        }
    }]
});

module.exports = mongoose.model('template', templateSchema);