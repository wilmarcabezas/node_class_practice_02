const Joi  = require('joi');

const name = Joi.string().max(100);

const createCitySchema = Joi.object({
    name: name.required(),
});

const findCitySchema = Joi.object({
    name: name.required(),
});

module.exports = { createCitySchema, findCitySchema, }