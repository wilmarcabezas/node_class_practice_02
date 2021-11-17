const Joi  = require('joi');

const user = Joi.string().min(6).max(100);
const password = Joi.string().min(6);

const loginSchema = Joi.object({
    user: user.required(),
    password : password.required(),
});


module.exports = { loginSchema, }