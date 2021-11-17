const jwt = require('jsonwebtoken');
const config = require('../config/config');

const secret = process.env.secret;

const payload = {
    sub: 1, 
    role:'operator'
};

function signToken(payload,secret){
    return jwt.sign(payload, secret);
}

const token = signToken(payload,secret);

return token;