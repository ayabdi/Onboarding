const mongoose = require('mongoose');

const emailSchema = new mongoose.Schema({
 
    hire:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'hire'
    },
    to:{
        type: String,
       // required: true
    },
    email:{
        type:String
    },
    from:{
        type: String,
        //required: true
    },
    fromName:{
        type: String,
        //required: true
    },

    subject:{
        type: String,

    },
    message: {
        type: String,
    },
    date: {
        type: String,
        //required: true,
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