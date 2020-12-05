const cron = require("node-cron");
const express = require("express");
const addDays = require("date-fns/addDays");
const parseISO = require("date-fns/parseISO");
const datefns = require("date-fns");
const AWS = require("aws-sdk");

require("dotenv").config();

const sendmailRouter = express.Router();
//const bodyParser = require("body-parser");

const SES_CONFIG = {
  accessKeyId: "AKIAQ67PSZM2FI64BLE4",
  secretAccessKey: "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",
  region: "us-east-2",
};

const AWS_SES = new AWS.SES(SES_CONFIG);

var from = "testharmonizehq123@gmail.com";

sendmailRouter.post("/email", (req, res, next) => {
  var ses_mail = "From: 'Harmonize test' <" + from + ">\n";
  ses_mail = ses_mail + "To: " + req.body.to + "\n";
  ses_mail = ses_mail + `Subject: ${req.body.task}\n`;
  ses_mail = ses_mail + "MIME-Version: 1.0\n";
  ses_mail =
    ses_mail + 'Content-Type: multipart/mixed; boundary="NextPart"\n\n';
  ses_mail = ses_mail + "--NextPart\n";
  ses_mail = ses_mail + "Content-Type: text/html; charset=us-ascii\n\n";
  ses_mail = ses_mail + `${req.body.text}`;
  ses_mail = ses_mail + "--NextPart\n";

  const mail = {
    Source: "testharmonizehq123@gmail.com",
    Destinations: [req.body.to],
    RawMessage: { Data: new Buffer.from(ses_mail) },
  };

  //calculate email date and set month and day
  var emaildate = addDays(parseISO(req.body.date), -req.body.daysBefore);
  var day = datefns.getDate(emaildate);
  var month = datefns.getMonth(emaildate) + 1;
  var minute = datefns.getMinutes(new Date());
  var hour = datefns.getHours(new Date());
  var second = datefns.getSeconds(new Date()) + 2;

  //scheduler
  cron.schedule(
    `${second} ${minute} ${hour} ${day} ${month} *`,
    () => {
      AWS_SES.sendRawEmail(mail, (err, data) => {
        if (err) {
          res.json({
            status: "fail",
          });
        } else {
          console.log("emails sent");
          // res.json({
          //   status: "success",
          // });
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
  var ses_mail = "From: 'Harmonize test' <" + from + ">\n";
  ses_mail = ses_mail + "To: " + req.body.to_email + "\n";
  ses_mail = ses_mail + `Subject: ${req.body.task}\n`;
  ses_mail = ses_mail + "MIME-Version: 1.0\n";
  ses_mail =
    ses_mail + 'Content-Type: multipart/mixed; boundary="NextPart"\n\n';
  ses_mail = ses_mail + "--NextPart\n";
  ses_mail = ses_mail + "Content-Type: text/html; charset=us-ascii\n\n";
  ses_mail =
    ses_mail +
    `<p>${req.body.task}
          <br></br>
          Due Date: ${req.body.hire.startDate}
          <br></br>
          ${req.body.note}
           </p>,\n\n`;
  ses_mail = ses_mail + "--NextPart\n";

  const mail = {
    Source: "testharmonizehq123@gmail.com",
    Destinations: [req.body.to_email],
    RawMessage: { Data: new Buffer.from(ses_mail) },
  };

  //calculate email date and set month and day
  var reminderArr = req.body.reminder.split(",");
  var minute = datefns.getMinutes(new Date());
  var hour = datefns.getHours(new Date());
  var second = datefns.getSeconds(new Date()) + 2;

  //scheduler

  AWS_SES.sendRawEmail(mail, (err, data) => {
    reminderArr.map((reminder, i) => {
      var emaildate = addDays(
        parseISO(req.body.hire.startDate),
        -reminder - req.body.due_date
      );
      var day = datefns.getDate(emaildate);
      var month = datefns.getMonth(emaildate) + 1;
      cron.schedule(
        `${second} ${minute} ${hour} ${day} ${month} *`,
        () => {
          if (err) {
            res.json({
              status: "fail",
            });
          } else {
            console.log("task sent");
            // res.json({
            //   status: "success",
            // });
          }
        },
        {
          scheduled: true,
          timezone: "Europe/London",
        }
      );
    });
  });
});
module.exports = sendmailRouter;
