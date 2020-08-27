const mongoose = require('mongoose');

const emailSchema = new mongoose.Schema({
 
    hires:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'hires'
    },
    to: {
        type: String
        
    },
    from :{
        type: String,
        required: true

    },

    subject:{
        type: String,

    },
    message: {
        type: String,
    },
    date: {
        type: Date,
        required: true,
    },
    daysBefore : {
       type: String
    },

    date_created: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('emails', emailSchema);