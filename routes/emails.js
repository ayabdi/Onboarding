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
module.exports = router;