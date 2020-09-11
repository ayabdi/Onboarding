const express = require("express");
const router = express.Router();

const Task = require("../models/Task");
const Hire = require("../models/Hire");


////@route GET /tasks/:email
//@desc  Fetch Tasks per hire ID
//@access Public
router.get('/find/:id', async(req, res) => {
    try {
        const task = await Task.find({hire: req.body.hire}).populate('hire', ['name', 'email'])
        
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
             return res.status(404).json({ message: 'Cannot Find email' })
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
    let task
    try {
        task = await Task.findById(req.params.id);
       
        if (task == null) {
            return res.status(404).json({ message: 'Cannot Find task' })
        }
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
    res.task = task
    next()
}
router.patch('/:id', getTask, async(req, res) => {
    if (req.body.from != null) {
        res.task.from = req.body.from
    }
    
    if (req.body.to != null) {
        res.task.to = req.body.to
    }
    if (req.body.to_email != null) {
        res.task.to_email = req.body.to_email
    }
    if (req.body.note != null) {
        res.task.note = req.body.note
    }
    if (req.body.isCompleted != null) {
        res.task.isCompleted = req.body.isCompleted
    }
    if (req.body.due_date != null) {
        res.task.due_date = req.body.due_date
    }
    if (req.body.daysBefore != null) {
        res.task.daysBefore = req.body.daysBefore
    }
    
    try {
        
        const updateTask = await res.task.save()
        res.json(updatedTask)

    } catch (error) {
        res.status(400).json({ msg: error.message })
    }

})
module.exports = router;