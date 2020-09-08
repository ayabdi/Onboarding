const mongoose = require('mongoose');

const hireSchema = new mongoose.Schema({
    
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    job_title: {
        type: String,
        required: true
    },
    department: {
        type: String,
        required: true
    },
    hiring_manager: {
        type: String,
        //required: true
    },
    hm_email: {
        type: String,
       // required: true
    },


    date_created: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('hire', hireSchema);