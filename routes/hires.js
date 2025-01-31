const express = require('express');
const router = express.Router();
//const auth = require("../../middleware/auth");
const { check, validationResult } = require("express-validator");
const authenticateJWT = require('../middleware/authenticateJWT');

const Hire = require("../models/Hire");

//@route GET /hires
//@desc  GET all hires
//@access Public


router.get('/', authenticateJWT, async(req, res) => {
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
    '/', authenticateJWT, [
        //Validating entries
        check("name", "Name is required").not().isEmpty(),
        // check('email')
        // .not()
        // .isEmpty()
        // .withMessage('Email is required')
        // .isEmail()
        // .withMessage('Invalid Email')
        // .custom((value, {req}) => {
        //   return new Promise((resolve, reject) => {
        //     Hire.findOne({email:req.body.email}, function(err, user){
        //       if(err) {
        //         reject(new Error('Server Error'))
        //       }
        //       if(Boolean(user)) {
        //         reject(new Error('E-mail already in use'))
                
        //       }
        //       resolve(true)
        //     });
        //   });
        // }),
        // check("email", "Please include a valid email").isEmail(),
        // check("job_title", "Name is required").not().isEmpty(),
        // check("department", "Name is required").not().isEmpty(),
        // check("hiring_manager", "Name is required").not().isEmpty(),
        // check("hm_email", "Please include a valid email").isEmail(),
    ],
    async(req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array()});   }
      
        const hire = new Hire({
            startDate: req.body.startDate,
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
//@route GET hire by id /hires
//@desc  Register hire
//@access Public
// router.get('/:id', async(req, res) => {
//     try {
//         const hire = await Hire.findById(req.params.id);
//         res.json(hire);
//     } catch (err) {
//         console.error(err.message);
//         if (err.kind == 'ObjectId') {
//             return res.status(400).json({ msg: "Hire not found" });
//         }
//         res.status(500).send('Server Error');
//     }
// });
//@route GET hire by email /hires/find/:email
//@desc  Get hire data by email address
//@access Public
router.get('/:email', authenticateJWT, async(req, res) => {
    try {
        const hire = await Hire.find({email: req.params.email});
        res.json(hire);
    } catch (err) {
        console.error(err.message);
        if (err.kind == 'ObjectId') {
            return res.status(400).json({ msg: "Hire not found" });
        }
        res.status(500).send('Server Error');
    }
});
//@route DELETE /hires
//@desc  DELETE hire
//@access Public
async function getHire(req, res, next) {
    let hire
    try {
        hire = await Hire.findById(req.params.id);

        if (hire == null) {
            return res.status(404).json({ message: 'Cannot Find Hire' })
        }
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
    res.hire = hire
    next()
}
router.delete('/:id', authenticateJWT, async(req, res) => {
    try {
        //Remove profile
        await Hire.findByIdAndRemove(req.params.id);
        res.json("Profile Deleted");
    } catch (err) {
        console.error(err.message);
        if (err.kind == 'ObjectId') {
            return res.status(400).json({ msg: "Hire not found" });
        }
        res.status(500).send('Server Error');
    }
});

//@route UPDATE /hires
//@desc  UPDATE Hire
//@access Public
router.patch('/:id', authenticateJWT, getHire, async(req, res) => {
    if (req.body.name != null) {
        res.hire.name = req.body.name
    }
    if (req.body.email != null) {
        res.hire.email = req.body.email
    }
    if (req.body.job_title != null) {
        res.hire.job_title = req.body.job_title
    }
    if (req.body.department != null) {
        res.hire.department = req.body.department
    }
    if (req.body.hiring_manager != null) {
        res.hire.hiring_manager = req.body.hiring_manager
    }
    if (req.body.hm_email != null) {
        res.hire.hm_email = req.body.hm_email
    }
    try {
        const updatedHire = await res.hire.save()
        res.json(updatedHire)

    } catch (error) {
        res.status(400).json({ msg: error.message })
    }

})
module.exports = router;