const cron = require("node-cron");
const nodemailer = require("nodemailer");
const express = require("express");
const addDays = require("date-fns/addDays");
const parseISO = require("date-fns/parseISO");
const datefns = require("date-fns");
const moment = require('moment')

require("dotenv").config();

const sendmailRouter = express.Router();

const transport = {
  //all of the configuration for making a site send an email.
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASSWORD,
  },
};

const transporter = nodemailer.createTransport(transport);
transporter.verify((error, success) => {
  if (error) {
    //if error happened code ends here
    console.error(error);
  } else {
    //this means success
    console.log("[mailer] users ready to mail");
  }
});

sendmailRouter.post("/email", (req, res, next) => {
  //make mailable object
  const mail = {
    from: process.env.EMAIL,
    to: req.body.to,
    subject: req.body.subject,
    text: req.body.message,
  };

  //calculate email date and set month and day
  var emaildate = addDays(parseISO(req.body.date), -req.body.daysBefore);
  var day = datefns.getDate(emaildate);
  var month = datefns.getMonth(emaildate) + 1;
  var minute = datefns.getMinutes(new Date()) ;
  var hour = datefns.getHours(new Date());
  var second = datefns.getSeconds(new Date()) + 2

  //scheduler
  cron.schedule(
    `${second} ${minute} ${hour} ${day} ${month} *`,
    () => {
      console.log("email sent");
      console.log(day);
      transporter.sendMail(mail, (err, data) => {
        // error handling goes here.
        if (err) {
          res.json({
            status: "fail",
          });
        } else {
          res.json({
            status: "success",
          });
        }
      });
    },
    {
      scheduled: true,
      timezone: "Europe/London",

    }
  );
});

////Task reminders

sendmailRouter.post("/task", (req, res, next) => {
  //make mailable object
  const mail = {
    from: process.env.EMAIL,
    to: req.body.to_email,
    subject: "Automated Email reminder from " + req.body.from,
    //text: req.body.message,
    html: `<p>${req.body.task}
             <br></br>
             Due Date: ${moment(datefns.parseISO(req.body.hire.startDate)).toDate().toLocaleString("default", {
              month: "long",
              day: "numeric",
              year: "numeric",
             })}
             <br></br>
             ${req.body.note}
          </p>`,
  };

  //calculate email date and set month and day
  var reminderArr = req.body.reminder.split(",");
  var minute = datefns.getMinutes(new Date()) ;
  var hour = datefns.getHours(new Date()) ;
  var second = datefns.getSeconds(new Date()) + 2

  //scheduler
  reminderArr.map((reminder) => {
    var emaildate = addDays(
      parseISO(req.body.hire.startDate),
      -reminder - req.body.due_date
    );
    var day = datefns.getDate(emaildate);
    var month = datefns.getMonth(emaildate) + 1;
    cron.schedule(
      `${second} ${minute} ${hour} ${day} ${month} *`,
      () => {
        console.log("task sent");
        console.log(req.body.hire.startDate);
        transporter.sendMail(mail, (err, data) => {
          // error handling goes here.
          if (err) {
            res.json({
              status: "fail",
            });
          } else {
            res.json({
              status: "success",
            });
          }
        });
      },
      {
        scheduled: true,
        timezone: "Europe/London",
      }
    );
  });
});
module.exports = sendmailRouter;
