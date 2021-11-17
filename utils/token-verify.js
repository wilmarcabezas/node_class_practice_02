const jwt = require('jsonwebtoken');
const config = require('../config/config');

const secret = process.env.secret;


function verifyToken(token,secret){
    return jwt.verify(payload, secret);
}

const payload = verifyToken(token,secret);

return payload;