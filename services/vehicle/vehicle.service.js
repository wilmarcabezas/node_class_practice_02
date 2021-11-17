const db = require('../../db/conect');
const Model = require('../../model/vehicle/vehicle.model');

async function addVehicle(data)
{       

    const modelVehicle = new Model({
        ...data
    });    
    const newVehicle= await modelVehicle.save();
    return newVehicle;
}

async function findVehicle(data)
{
    const findVehicle= await Model.findOne({'name':data});
    return findVehicle;
}


async function allVehicles(data)
{
    const Vehicle = await Model.find({});
    return Vehicle;
}

async function findOne(id) {
    const findVehicle = await Model.findOne({'_id':id});
    return findVehicle;
  }

module.exports = { addVehicle, findVehicle, allVehicles, findOne, };