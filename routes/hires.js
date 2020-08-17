const express = require('express');
const router = express.Router();
//const auth = require("../../middleware/auth");
const { check, validationResult } = require("express-validator");

const Hire = require("../models/Hire");

router.get('/', async(req, res) => {
    try {
        const hires = await Hire.find();
        res.json(hires);

    } catch (errors) {
        res.send('Error' + errors)
    }
});
//@route POST /hires
//@desc  Register hire
//@access Public

router.post(
    '/', [
        //Validating entries
        check("name", "Name is required").not().isEmpty(),
        check("email", "Please include a valid email").isEmail(),
        check("job_title", "Name is required").not().isEmpty(),
        check("department", "Name is required").not().isEmpty(),
        check("hiring_manager", "Name is required").not().isEmpty(),
        check("hm_email", "Please include a valid email").isEmail(),
    ],
    async(req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const hire = new Hire({
            name: req.body.name,
            email: req.body.email,
            job_title: req.body.job_title,
            department: req.body.department,
            hiring_manager: req.body.hiring_manager,
            hm_email: req.body.hm_email,
        });
        try {
            const newHire = await hire.save();
            res.json(newHire);
        } catch (error) {
            console.error(error.message);
            res.status(400).send("Server error");
        }
    });

//@route GET api/profile
//@desc  Get all profiles
//@access Public

router.get('/', async(req, res) => {
    try {
        const profiles = await Profile.find().populate('user', ['name', 'avatar']);
        res.json(profiles);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;