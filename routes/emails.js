const express = require("express");
const router = express.Router();
const axios = require("axios")

const Email = require("../models/Email");
const Hire = require("../models/Hire");
const { body } = require("express-validator");



////@route GET /emails/:email
//@desc  Fetch Emails per email address
//@access Public
router.get('/find/:email', async(req, res) => {
    try {
        const email = await Email.find({to : req.params.email}).populate('hire', ['name', 'email'])
        
        res.json(email);
    } catch (err) {
        console.error(err.message);
        if (err.kind == 'ObjectId') {
            return res.status(400).json({ msg: "Hire not found" });
        }
        res.status(500).send('Server Error');
    }
});

//@route POST /emails
//@desc  Create Email 
//@access Public
    
//Get Hire by Email
async function getHire(req, res, next) {
   let hire
    try {
    
        hire = await Hire.findOne({email : req.body.to});
        
        if (hire == null) {
            return res.status(404).json({ message: 'Cannot Find email' })
        }
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
    res.hire = hire
   next()
 
}

router.post("/", getHire, async (req, res) => {
    
  const email = new Email({
    hire: res.hire._id,
    from: "harmonize.onboarding@gmail.com",
    fromName: req.body.fromName,
    to: req.body.to,
    subject: req.body.subject,
    message: req.body.message,
    date: req.body.date,
    daysBefore: req.body.daysBefore,
  });
  try {
   
    const newEmail = await email.save();
    
    res.json(newEmail);
  } catch (error) {
    console.error(error.message);
    res.status(400).send("Server error");
  }
});
//@route DELETE /emails
//@desc  DELETE email
//@access Public

router.delete('/:id', async(req, res) => {
    try {
        //delete email
        await Email.findByIdAndRemove(req.params.id);
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
//@desc  UPDATE Email
//@access Public
async function getEmail(req, res, next) {
    let email
    try {
        email = await Email.findById(req.params.id);
        console.log(req.body.hire)
        if (email == null) {
            return res.status(404).json({ message: 'Cannot Find email' })
        }
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
    res.email = email
    next()
}
router.patch('/:id', getEmail, async(req, res) => {
    if (req.body.from != null) {
        res.email.from = req.body.from
    }
    
    if (req.body.to != null) {
        res.email.to = req.body.to
    }
    if (req.body.subject != null) {
        res.email.subject = req.body.subject
    }
    if (req.body.message != null) {
        res.email.message = req.body.message
    }
    if (req.body.date != null) {
        res.email.date = req.body.date
    }
    if (req.body.daysBefore != null) {
        res.email.daysBefore = req.body.daysBefore
    }
    
    try {
        res.email.hire = req.body.hire
        
        const updatedEmail = await res.email.save()
        res.json(updatedEmail)

    } catch (error) {
        res.status(400).json({ msg: error.message })
    }

})
module.exports = router;