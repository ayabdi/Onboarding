const express = require("express");
const router = express.Router();

const Email = require("../models/Email");
const Hire = require("../models/Hire");

//@route GET emails per hire
router.get("/:id", async (req, res) => {
  try {
    const emails = await Email.find({
       hires: req.body.hires,
    }).populate('hires');
    res.json(emails);
  } catch (errors) {
    
    if (errors.kind == 'ObjectId') {
        return res.status(400).json({ msg: "Hire not found" });
    }
    res.status(500).send('Server Error');
  }
});

//@route POST Create Email

//@route POST /hires
//@desc  Register hire
//@access Public

router.post("/", async (req, res) => {
  const email = new Email({
    hires: req.body.hires,
    from: "ay.abdi1106@gmail.com",
    to: "abdulrahmanabdi98@gmail.com",
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
//@route DELETE /hires
//@desc  DELETE profile and User
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
    if (req.body.daysBefore != null) {
        res.email.daysBefore = req.body.daysBefore
    }
    if (req.body.hm_email != null) {
        res.email.hm_email = req.body.hm_email
    }
    try {
        const updatedEmail = await res.email.save()
        res.json(updatedEmail)

    } catch (error) {
        res.status(400).json({ msg: error.message })
    }

})
module.exports = router;