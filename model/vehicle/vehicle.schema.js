const Joi  = require('joi');

const name = Joi.string().max(100);

const createVehicleSchema = Joi.object({
    name: name.required(),
});

const findVehicleSchema = Joi.object({
    name: name.required(),
});

module.exports = { createVehicleSchema, findVehicleSchema, }