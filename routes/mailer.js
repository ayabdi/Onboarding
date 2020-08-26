const nodemailer = require('nodemailer');
const express = require('express');


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
      user: 'ay.abdi1106@gmail.com',
      pass: 'thegame005'
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
      to: 'abdulrahmanabdi98@gmail.com',
      subject: req.body.subject,
      text: req.body.message 

    }
// error handling goes here. 
transporter.sendMail(mail, (err,data) => {
    if(err) {
      res.json({
        status: 'fail'
      })
    } else {
      res.json({
        status: 'success'
      })
    }
  })
  });
// function sendEmail(mail) {
//     var mailOptions = {
//         from: 'ay.abdi1106@gmail.com',
//         to: mail.to,
//         subject: mail.subject,
//         message: mail.message
//     }
    
//     transporter.sendMail(mailOptions, function(err, info){
//         if (err){
//             console.log(err + 'ffs')
//         }
//         else {
//            console.log('Email sent: ' + info.response) 
//         }
                                                                        
//     })
// }
// //PoST
// router.post('/'), (req, res) => {
//    mail = {
//     to: req.body.to_address,
//     subject: req.body.subject,
//     body: req.body.message
//    }
//    sendEmail(mail)
//    res.redirect('/')
// }
module.exports = sendmailRouter;
