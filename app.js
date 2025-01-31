const express = require('express')
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer')
const path = require('path');
const cors = require('cors');
const proxy = require('http-proxy-middleware')
const url = process.env.MONGO_URI

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

app.use(cors());

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type");
    res.header("Access-Control-Allow-Methods", " GET, PUT, POST,PATCH, DELETE, OPTIONS");
    next();
  });   
app.use(express.json());



//bodyparser
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

app.use('/api/hires', require('./routes/hires'));
app.use('/api/send_email', require('./routes/mailer'))
app.use('/api/emails', require('./routes/emails'))
app.use('/api/tasks', require('./routes/tasks'))
app.use('/api/templates', require('./routes/templates'))
app.use('/api/auth', require('./routes/auth'))

// module.exports = function(app) {
//   // add other server routes to path array
//   app.use(proxy(['/api/templates' ], { target: 'http://localhost:5000' }));
// } 

// Serve static assets in production
if (process.env.NODE_ENV === 'production') {
    console.log("Running in production mode!");

    // Set static folder
    app.use(express.static('client/build'));
  
    app.get('*', (req, res) => {
      res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });
} else {
    console.log("Running in development mode!");
}

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
