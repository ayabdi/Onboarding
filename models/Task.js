const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
 
    hire:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'hire'
    },
    task:{
        type: String,
        required: true
    },
    from:{
        type: String,
        required: true
    },
    from_email:{
        type: String,
        required: true
    },
    to:{
        type:String
    },
    to_email:{
        type: String,
        //required: true
    },
    isCompleted:{
        type: Boolean,
        //required: true
    },

    due_date: {
        type: Date,
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

module.exports = mongoose.model('tasks', taskSchema);