const Joi  = require('joi');

const name = Joi.string().max(100);

const createElementSchema = Joi.object({
    name: name.required(),
});

const findElementSchema = Joi.object({
    name: name.required(),
});

module.exports = { createElementSchema, findElementSchema, }