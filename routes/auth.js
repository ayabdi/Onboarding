const express = require("express");
const router = express.Router();
const Auth = require("../models/Auth");
const validator = require("email-validator");
const jwt = require('jsonwebtoken');

const refreshTokens = [];
const accessTokenSecret = '`fq@clhv9jd*@W~efJUhW2^s+-cVa^vv';
const refreshTokenSecret = 'E(H5#bEVt(xRDZp$pHI9t1ie544*Iw^P';

// @desc Authenticates a JWT token
// @access Public

const authenticateJWT = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader)
        return res.send("Authentication header is null!");

    const token = authHeader.split(' ')[1];

    jwt.verify(token, accessTokenSecret, (err, user) => {
        if (err) 
            return res.send("Unable to verify token!");

        req.user = user;
        next();
    });
};

// @route POST /auth
// @desc Logs a user in
// @access Public

router.post('/login', 
    async (req, res) => {
        email = req.body.email;
        password = req.body.password;

        if (!email)
            return res.send("Email is null!");

        if (!password)
            return res.send("Password is null!");

        if (!validator.validate(email))
            return res.send("Invalid email!");

        try {
            const user = await Auth.findOne({email: email});

            if (user["password"] !== password)
                return res.send("Invalid password!");

            const accessToken = jwt.sign({ email: email }, accessTokenSecret, { expiresIn: '30m' });
            const refreshToken = jwt.sign({ email: email }, refreshTokenSecret);

            refreshTokens.push(refreshToken);

            res.json({
                accessToken,
                refreshToken
            });
        } catch (errors) {
            res.send('Error' + errors)
        }
    }
)

// @route POST /auth
// @desc Registers a user
// @access Public

router.post('/register', 
    async (req, res) => {
        email = req.body.email;
        password = req.body.password;
        confirm_password = req.body.confirm_password;

        if (!email)
            return res.send("Email is null!");

        if (!password)
            return res.send("Password is null!");

        if (!confirm_password)
            return res.send("Confirm password is null!");

        if (!validator.validate(email))
            return res.send("Invalid email!");

        if (password !== confirm_password)
            return res.send("Passwords do not match!");

        const user = new Auth({
            email: email,
            password: password
        });

        try {
            await user.save();
            res.send("Registration succeeded!");
        } catch (errors) {
            res.send('Error' + errors)
        }
    }
)

// @route POST /auth
// @desc Generates a new access token
// @access Public

router.post('/token', 
    async (req, res) => {
        token = req.body.token;

        if (!token)
            return res.send("Token is null!");

        if (!refreshTokens.includes(token))
            return res.send("Unrecognized token!");

        jwt.verify(token, refreshTokenSecret, (err, user) => {
            if (err) 
                return res.send("Unable to verify token!");
        
            const accessToken = jwt.sign({ email: user.email }, accessTokenSecret, { expiresIn: '30m' });
        
            res.json({
                accessToken
            });
        });
    }
)

// @route POST /auth
// @desc Logs a user out
// @access Public

router.post('/logout', 
    async (req, res) => {
        token = req.body.token;

        if (!token)
            return res.send("Token is null!");
        
        var token_inx = refreshTokens.indexOf(token);
        if (token_inx >= 0) 
            refreshTokens.splice(token_inx, 1);

        res.send("Logout successful!");
    }
)

module.exports = router
