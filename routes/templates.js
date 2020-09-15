const express = require("express");
const router = express.Router();
const Template = require("../models/Template");

// @route POST /templates
// @desc Creates a template 
// @access Public

router.post('/', 
    async (req, res) => {
        params = req.body
        name = params["name"]
        emails = params["emails"]
        tasks = params["tasks"]

        const template = new Template({
            name: name,
            emails: emails,
            tasks: tasks
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
// @desc Retrieves a template 
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
// @desc Deletes a template 
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
// @desc Updates a template
// @access Public

router.patch('/', async(req, res) => {
    params = req.body
    name = params["name"]
    new_name = params["new_name"]
    new_emails = params["new_emails"]
    new_tasks = params["new_tasks"]
    var updated_template = { }

    if (new_name != null) 
        updated_template["name"] = new_name

    if (new_emails != null) 
        updated_template["emails"] = new_emails
    
    if (new_tasks != null) 
        updated_template["tasks"] = new_tasks

    try {
        const template_ret = await Template.find({name: name}).updateMany(updated_template)
        res.json(template_ret)
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
})

module.exports = router
