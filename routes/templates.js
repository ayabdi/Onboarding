const express = require("express");
const router = express.Router();
const Template = require("../models/Template");

// @route POST /templates
// @desc Creates an email template 
// @access Public

router.post('/', 
    async (req, res) => {
        params = req.body
        name = params["name"]
        from = params["from"]
        subject = params["subject"]
        message = params["message"]
        days = params["days"]

        const template = new Template({
            name: name,
            from: from,
            subject: subject,
            message: message,
            days: days
        });

        try {
            const newTemplate = await template.save();
            res.json(newTemplate);
        } catch (error) {
            console.error(error.message);
            res.status(400).send("Server error");
        }
    }
)

// @route GET /templates
// @desc Retrieves an email template 
// @access Public

router.get('/name/:name', 
    async (req, res) => {
        params = req.params
        name = params["name"]

        try {
            const templates = await Template.find({name: name});
            res.json(templates);
        } catch (errors) {
            res.send('Error' + errors)
        }
    }
)

// @route DELETE /templates
// @desc Deletes an email template 
// @access Public

router.delete('/name/:name', 
    async (req, res) => {
        params = req.params
        name = params["name"]

        try {
            const templates = await Template.find({name: name}).deleteMany().exec();
            res.json(templates);
        } catch (errors) {
            res.send('Error' + errors)
        }
    }
)

// @route PATCH /templates
// @desc Updates an email template
// @access Public

router.patch('/', async(req, res) => {
    params = req.body
    name = params["name"]
    new_name = params["new_name"]
    new_from = params["new_from"]
    new_subject = params["new_subject"]
    new_message = params["new_message"]
    new_days = params["new_days"]
    var updated_template = { }

    if (new_name != null) 
        updated_template["name"] = new_name

    if (new_from != null) 
        updated_template["from"] = new_from
    
    if (new_subject != null) 
        updated_template["subject"] = new_subject
    
    if (new_message != null) 
        updated_template["message"] = new_message
    
    if (new_days != null) 
        updated_template["days"] = new_days

    try {
        const template_ret = await Template.find({name: name}).updateMany(updated_template)
        res.json(template_ret)
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
})

module.exports = router
