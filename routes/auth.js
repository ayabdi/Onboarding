const express = require("express");
const router = express.Router();
const Auth = require("../models/Auth");
const validator = require("email-validator");
const jwt = require('jsonwebtoken');

const refreshTokens = [];
const accessTokenSecret = '`fq@clhv9jd*@W~efJUhW2^s+-cVa^vv';
const refreshTokenSecret = 'E(H5#bEVt(xRDZp$pHI9t1ie544*Iw^P';

function debug_log(message) {
    if (process.env.NODE_ENV === 'production') 
        return;

    console.log(message);
}

// @desc Authenticates a JWT token
// @access Public

const authenticateJWT = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        debug_log("Authentication header is null!");
        return res.status(401).send("Authentication header is null!");
    }

    const token = authHeader.split(' ')[1];

    jwt.verify(token, accessTokenSecret, (err, user) => {
        if (err) {
            debug_log("Unable to verify token!");
            return res.status(403).send("Unable to verify token!");
        }

        debug_log("Token verified!");
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

        if (!email) {
            debug_log("Email is null!");
            return res.status(400).send("Email is null!");
        }

        if (!password) {
            debug_log("Password is null!");
            return res.status(400).send("Password is null!");
        }

        if (!validator.validate(email)) {
            debug_log("Invalid email!");
            return res.status(400).send("Invalid email!");
        }

        try {
            const user = await Auth.findOne({email: email});

            if (user["password"] !== password) {
                debug_log("Invalid password!");
                return res.status(400).send("Invalid password!");
            }

            const accessToken = jwt.sign({ email: email }, accessTokenSecret, { expiresIn: '30m' });
            const refreshToken = jwt.sign({ email: email }, refreshTokenSecret);

            refreshTokens.push(refreshToken);

            debug_log("Login successful!");

            res.status(200).json({
                accessToken,
                refreshToken
            });
        } catch (errors) {
            debug_log('Error' + errors);
            res.status(500).send('Error' + errors);
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
        passwordConfirm = req.body.passwordConfirm;

        if (!email) {
            debug_log("Email is null!");
            return res.status(400).send("Email is null!");
        }

        if (!password) {
            debug_log("Password is null!");
            return res.status(400).send("Password is null!");
        }

        if (!passwordConfirm) {
            debug_log("Confirm password is null!");
            return res.status(400).send("Confirm password is null!");
        }

        if (!validator.validate(email)) {
            debug_log("Invalid email!");
            return res.status(400).send("Invalid email!");
        }

        if (password !== passwordConfirm) {
            debug_log("Passwords do not match!");
            return res.status(400).send("Passwords do not match!");
        }

        const user = new Auth({
            email: email,
            password: password
        });

        try {
            await user.save();
            debug_log("Registration succeeded!");
            res.status(200).send("Registration succeeded!");
        } catch (errors) {
            debug_log('Error' + errors);
            res.status(500).send('Error' + errors)
        }
    }
)

// @route POST /auth
// @desc Generates a new access token
// @access Public

router.post('/token', 
    async (req, res) => {
        token = req.body.token;

        if (!token) {
            debug_log("Token is null!");
            return res.status(400).send("Token is null!");
        }

        if (!refreshTokens.includes(token)) {
            debug_log("Unrecognized token!");
            return res.status(400).send("Unrecognized token!");
        }

        jwt.verify(token, refreshTokenSecret, (err, user) => {
            if (err) {
                debug_log("Unable to verify token!");
                return res.status(400).send("Unable to verify token!");
            }
        
            const accessToken = jwt.sign({ email: user.email }, accessTokenSecret, { expiresIn: '30m' });

            debug_log("Access token generated!");

            res.status(200).json({
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

        if (!token) {
            debug_log("Token is null!");
            return res.status(400).send("Token is null!");
        }
        
        var token_inx = refreshTokens.indexOf(token);
        if (token_inx >= 0) 
            refreshTokens.splice(token_inx, 1);

        debug_log("Logout successful!");
        res.status(200).send("Logout successful!");
    }
)

module.exports = router
