const express = require('express')
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer')


const url = 'mongodb://localhost/Onboarding'

const app = express();

mongoose.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
})
const con = mongoose.connection

con.on('open', function() {
    console.log('Database connected..')
})

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", " GET, PUT, POST, DELETE, OPTIONS");
    next();
  });   
app.use(express.json());

//bodyparser
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

app.use('/hires', require('./routes/hires'));
app.use('/send_email', require('./routes/mailer'))
app.use('/emails', require('./routes/emails'))

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log('Server started on port 5000'));