const Joi  = require('joi');

const user = Joi.string().min(6).max(100);
const password = Joi.string().min(6);
const role = Joi.string();
const email = Joi.string();
const city = Joi.string();

const createUserSchema = Joi.object({
    user: user.required(),
    password : password.required(),
    email : email.required(),
    city: city.required(),
});

const findUserSchema = Joi.object({
    user: user.required(),
});

module.exports = { createUserSchema, findUserSchema, }