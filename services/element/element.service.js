const db = require('../../db/conect');
const Model = require('../../model/elementepp/elementepp.model');

async function addElement(data){       
    const modelElement = new Model({...data });    
    return await modelElement.save();
}

async function findElement(data){
    return await Model.findOne({'name':data});
}


async function allElements(data){
    const Element = await Model.find({});
    return Element;
}

async function findOne(id) {
    const findElement= await Model.findOne({'_id':id});
    return findElement;
}

module.exports = { addElement, findElement, allElements, findOne, };