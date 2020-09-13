const express = require("express");
const router = express.Router();

const Task = require("../models/Task");
const Hire = require("../models/Hire");


////@route GET /tasks/:hire
//@desc  Fetch Tasks per hire ID
//@access Public
router.get('/find/:id', async(req, res) => {
    try {
        const task = await Task.find({id: req.body.hire}).populate('hire', ['name', 'email'])
        
        res.json(task);
    } catch (err) {
        console.error(err.message);
        if (err.kind == 'ObjectId') {
            return res.status(400).json({ msg: "Hire not found" });
        }
        res.status(500).send('Server Error');
    }
});

//@route POST /tasks
//@desc  Create Email 
//@access Public

//Get Hire by Email
async function getHire(req, res, next) {
    let hire
     try {
     
         hire = await Hire.findOne({email : req.body.hire});
         
         if (hire == null) {
             return res.status(404).json({ message: 'Cannot Find hire' })
         }
     } catch (error) {
         return res.status(500).json({ message: error.message });
     }
     res.hire = hire
    next()
  
 }  

router.post("/", getHire ,async (req, res) => {
    
  const task = new Task({
    hire: res.hire._id,
    from_email: "testharmonizehq123@gmail.com",
    from: req.body.from,
    task: req.body.task,
    to: req.body.to,
    to_email: req.body.to_email,
    note: req.body.note,
    isCompleted: req.body.isCompleted,
    due_date: req.body.due_date,
    reminder: req.body.reminder,
  });
  try {
   
    const newTask = await task.save();
    
    res.json(newTask);
  } catch (error) {
    console.error(error.message);
    res.status(400).send("Server error");
  }
});
//@route DELETE /tasks
//@desc  DELETE Task
//@access Public

router.delete('/:id', async(req, res) => {
    try {
        //delete email
        await Task.findByIdAndRemove(req.params.id);
        res.json("Email Deleted");
    } catch (err) {
        console.error(err.message);
        if (err.kind == 'ObjectId') {
            return res.status(400).json({ msg: "Hire not found" });
        }
        res.status(500).send('Server Error');
    }
});

//@route UPDATE 
//@desc  UPDATE Task
//@access Public
async function getTask(req, res, next) {
    let tasks
    try {
        tasks = await Task.findById(req.params.id);
       
        if (tasks == null) {
            return res.status(404).json({ message: 'Cannot Find task' })
        }
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
    res.tasks = tasks
    next()
}
router.patch('/:id', getTask, async(req, res) => {
    if (req.body.from != null) {
        res.tasks.from = req.body.from
    }
    if (req.body.from_email != null) {
        res.tasks.from_email = req.body.from_email
    }
    if (req.body.task != null) {
        res.tasks.task = req.body.task
    }
    
    if (req.body.to != null) {
        res.tasks.to = req.body.to
    }
    if (req.body.to_email != null) {
        res.tasks.to_email = req.body.to_email
    }
    if (req.body.note != null) {
        res.tasks.note = req.body.note
    }
    if (req.body.isCompleted != null) {
        res.tasks.isCompleted = req.body.isCompleted
    }
    if (req.body.due_date != null) {
        res.tasks.due_date = req.body.due_date
    }
    if (req.body.reminder != null) {
        res.tasks.reminder = req.body.reminder
    }
    
    try {

        const updatedTask = await res.tasks.save()
        res.json(updatedTask)

    } catch (error) {
        res.status(400).json({ msg: error.message })
    }

})
module.exports = router;