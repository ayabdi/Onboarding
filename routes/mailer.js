const nodemailer = require('nodemailer');
const express = require('express');


const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user:'ay.abdi1106@gmail.com',
        password: 'thegame005' 
    }
})

function sendEmail(mail) {
    var mailOptions = {
        from: 'ay.abdi1106@gmail.com',
        to: mail.to,
        subject: mail.subject,
        message: mail.message
    }
    transporter.sendMail(mailOptions, function(err, info)){
        if (err){
            console.log(err)
        }
        else {
           console.log('Email sent: ' + info.response) 
        }
                                                                        
    }
}

app.post('/send_email'), (req, res) => {
   mail = {
    to: req.body.to_address,
    subject: req.body.subject,
    body: req.body.message
   }
   sendEmail(mail)
   res.redirect('/')
}
