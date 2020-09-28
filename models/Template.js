const mongoose = require('mongoose');

const templateSchema = new mongoose.Schema({
    name: {
        type: String,
        
        unique: true
    },

    emails: [{
        _id:{
          type: String
        },
        subject: {
            type: String,
            //required: true
        },
        message: {
            type: String,
            //required: true
        },
        daysBefore: {
            type: String,
            //required: true
        }
    },{ _id: false, id: false }],

    tasks: [{
        _id:{
            type: String
          },
        
        task: {
            type: String,
          //  required: true
        },
        note: {
            type: String,
            //required: true
        },
        to: {
            type: String,
           // required: true
        },
        to_email: {
            type: String,
            //required: true
        },
        due_date: {
            type: String,
            //required: true
        },
        reminder: {
            type: String,
            //required: true
        }
    }]
});

module.exports = mongoose.model('template', templateSchema);