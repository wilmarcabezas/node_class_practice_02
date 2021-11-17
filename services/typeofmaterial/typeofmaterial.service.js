const db = require('../../db/conect');
const Model = require('../../model/typeofmaterial/typeofmaterial.model');

async function addMaterial(data)
{       

    const modelElement = new Model({
        ...data
    });    
    const newElement= await modelElement.save();
    return newElement;
}

async function findMaterial(data)
{
    const findMaterial = await Model.findOne({'name':data});
    return findMaterial;
}

async function allMaterials(data)
{
    const Material = await Model.find({});
    return Material;
}

async function findOne(id) {
    const findMaterial = await Model.findOne({'_id':id});
    return findMaterial;
  }
module.exports = { addMaterial, findMaterial, allMaterials, findOne, };