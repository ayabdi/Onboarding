const express = require('express')
const mongoose = require('mongoose');
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
    next();
  });
app.use(express.json());
app.use('/hires', require('./routes/hires'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log('Server started on port 5000'));