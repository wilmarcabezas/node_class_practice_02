const db = require('../../db/conect');
const Model = require('../../model/invoice/invoice.model');

async function addInvoice(data){       
    const modelInvoice = new Model({...data });    
    return await modelInvoice.save();
}

async function findOne(id) {
    const findInvoice= await Model.findOne({'_id':id});
    return findInvoice;
}

module.exports = { addInvoice, findOne, };