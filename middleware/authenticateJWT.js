const jwt = require('jsonwebtoken');
require('dotenv').config();
const accessTokenSecret = '`fq@clhv9jd*@W~efJUhW2^s+-cVa^vv';

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

    debug_log("Authentication header: " + authHeader);
    
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

module.exports = authenticateJWT;