const db = require('../../db/conect');
const Model = require('../../model/city/city.model');

async function addCity(data)
{       

    const modelCity = new Model({
        ...data
    });    
    const newCity = await modelCity.save();
    return newCity;
}

async function findCity(data)
{
    const findCity= await Model.findOne({'name':data});
    return findCity;
}


async function allCities(data)
{
    const City = await Model.find({});
    return City;
}

async function findOne(id) {
    const findCity = await Model.findOne({'_id':id});
    return findCity;
  }

module.exports = { addCity, findCity, allCities, findOne, };