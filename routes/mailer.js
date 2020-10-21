const nodemailer = require("nodemailer");
const cron = require("node-cron");
const express = require("express");
const addDays = require("date-fns/addDays");
const parseISO = require("date-fns/parseISO");
const datefns = require("date-fns");

const sendmailRouter = express.Router();
const bodyParser = require("body-parser");
const { google } = require("googleapis");
const OAuth2 = google.auth.OAuth2;
// //bodyparser
// router.use(bodyParser.json())
// router.use(bodyParser.urlencoded({extended: true}))

const myOAuth2Client = new OAuth2(
  "427228709758-5ig3aced21f9hdf4efo5nukthpmjl2cn.apps.googleusercontent.com",
  "8E1N_PpAfi4FYH-2UAvs3M3l",
  )
myOAuth2Client.setCredentials({
  refresh_token:"1//04MM62P5vS-bhCgYIARAAGAQSNwF-L9Irv0WvbdAx9YADWbIylb0Sbbr-Xj01S07YxT8i2zwvB-vP6Eus8vlypA6xN-QeHWomeI0"
  });
  const myAccessToken = myOAuth2Client.getAccessToken()
const transport = {
  //all of the configuration for making a site send an email.

  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    type: "OAuth2",
    user: "testharmonizehq123@gmail.com",
    clientId: " 427228709758-5ig3aced21f9hdf4efo5nukthpmjl2cn.apps.googleusercontent.com",
          clientSecret: " 8E1N_PpAfi4FYH-2UAvs3M3l",
          refreshToken: "1//04MM62P5vS-bhCgYIARAAGAQSNwF-L9Irv0WvbdAx9YADWbIylb0Sbbr-Xj01S07YxT8i2zwvB-vP6Eus8vlypA6xN-QeHWomeI0",
          accessToken: myAccessToken //access token variable we defined earlier
   
  },
  tls: { rejectUnauthorized: false }
};

const transporter = nodemailer.createTransport(transport);
transporter.verify((error, success) => {
  if (error) {
    //if error happened code ends here
    console.error(error);
  } else {
    //this means success
    console.log("users ready to mail myself");
  }
});

sendmailRouter.post("/email", (req, res, next) => {
  //make mailable object
  const mail = {
    from: "testharmonizehq123@gmail.com",
    to: req.body.to,
    subject: req.body.subject,
    text: req.body.message,
    date: req.body.date,
    daysBefore: req.body.daysBefore,
    hire: req.body.hire,
  };

  //calculate email date and set month and day
  var emaildate = addDays(parseISO(req.body.date), -req.body.daysBefore);
  var day = datefns.getDate(emaildate);
  var month = datefns.getMonth(emaildate) + 1;
  var minute = datefns.getMinutes(new Date()) + 1;
  var hour = datefns.getHours(new Date()) - 1;

  //scheduler
  cron.schedule(
    `${minute} ${hour} ${day} ${month} *`,
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
    from: "testharmonizehq123@gmail.com",
    to: req.body.to_email,
    subject: "Automated Email reminder from " + req.body.from,
    //text: req.body.message,
    date: req.body.hire.startDate,
    reminder: req.body.reminder,
    due_date: req.body.due_date,
    html: `<p>${req.body.task}
             <br></br>
             Due Date: ${req.body.hire.startDate}
             <br></br>
             ${req.body.note}
          </p>`,
  };

  //calculate email date and set month and day
  var reminderArr = req.body.reminder.split(",");
  var minute = datefns.getMinutes(new Date()) + 1;
  var hour = datefns.getHours(new Date()) - 1;

  //scheduler
  reminderArr.map((reminder) => {
    var emaildate = addDays(
      parseISO(req.body.hire.startDate),
      -reminder - req.body.due_date
    );
    var day = datefns.getDate(emaildate);
    var month = datefns.getMonth(emaildate) + 1;
    cron.schedule(
      `${minute} ${hour} ${day} ${month} *`,
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
