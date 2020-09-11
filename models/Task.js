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
    note:{
        type: String,
    },
    isCompleted:{
        type: Boolean,
        //required: true
    },

    due_date: {
        type: String,
        //required: true,
    },
    reminder : {
       type: {String}
       //required: true,
    },

    date_created: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('tasks', taskSchema);