const nodemailer = require('nodemailer');
const cron = require('node-cron');
const express = require('express');
const addDays = require('date-fns/addDays')
const parseISO = require('date-fns/parseISO')
const datefns = require('date-fns')

const sendmailRouter = express.Router()
const bodyParser = require('body-parser');
// //bodyparser
// router.use(bodyParser.json())
// router.use(bodyParser.urlencoded({extended: true}))



const transport = {
    //all of the configuration for making a site send an email.
  
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
      user: 'testharmonizehq123@gmail.com',
      pass: 'harmonizehq@12345'
    }
  };
  
  const transporter = nodemailer.createTransport(transport);
  transporter.verify((error, success) => {
    if(error) {
      //if error happened code ends here
      console.error(error)
    } else {
      //this means success
      console.log('users ready to mail myself')
    }
  });




 sendmailRouter.post('/', (req,res, next) => {
    //make mailable object
    const mail = {
      from: 'ay.abdi1106@gmail.com',
      to: req.body.email,
      subject: req.body.subject,
      text: req.body.message,
      date :req.body.date,
      daysBefore: req.body.daysBefore


    }
    //calculate email date and set month and day
    var emaildate = addDays(parseISO(req.body.date),  -req.body.daysBefore)
    var day = datefns.getDate(emaildate)
    var month = datefns.getMonth(emaildate)+1
    

    //scheduler
cron.schedule(` 48 12 ${day} ${month} *`, () => {
    console.log('email sent');
transporter.sendMail(mail, (err,data) => {
    // error handling goes here. 
    if(err) {
      res.json({
        status: 'fail'
      })
    } else {
      res.json({
        status: 'success'
      })
    }
  })}, {
  scheduled: true,
  timezone: "Europe/London"
  });
 });
module.exports = sendmailRouter;
