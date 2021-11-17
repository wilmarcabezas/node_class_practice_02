const mongoose = require('mongoose');
const Joi  = require('joi');
const { boolean } = require('joi');
const Scheme = mongoose.Schema;

const modelInvoice  = new Scheme({
    id: { type: Scheme.ObjectId, },    
    element:  [{ type: mongoose.Schema.Types.ObjectId, ref: 'Elementepp' }],
    price: { type: Number,  required: [true,'Price is required field'], }
    

});

module.exports = mongoose.model('Invoice',modelInvoice);