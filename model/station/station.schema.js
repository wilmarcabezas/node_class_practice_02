const Joi  = require('joi');

const name = Joi.string();
const position = Joi.number();
const city = Joi.string();

const createStationSchema = Joi.object({
    name: name.required(),
    position: position.required(),
    city: city.required(),
});

const findStationSchema = Joi.object({
    name: name.required(),
});

module.exports = { createStationSchema, findStationSchema, }