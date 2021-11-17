const Joi  = require('joi');

const name = Joi.string().max(100);
const price= Joi.number();

const createMaterialchema = Joi.object({
    name: name.required(),
    price: price.required(),
});

const findMaterialSchema = Joi.object({
    name: name.required(),
});

module.exports = { createMaterialchema, findMaterialSchema, }