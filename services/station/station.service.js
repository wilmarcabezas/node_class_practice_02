const db = require('../../db/conect');
const {Model} = require('../../model/station/station.model');
const ModelCity =  require('../../model/city/city.model');

async function addStation(data)
{       
    const cityId = await ModelCity.findOne({'name':data.city});
    const modelStation = new Model({
        ...data,
        city: cityId._id,

    });    
    const newStation = await modelStation.save();
    return newStation
}

async function findStation(data)
{
    const findStation= await Model.findOne({'name':data});
    return findStation;
}


async function allStations()
{
    const stations = await Model.find()
    .populate('city')
    .exec();
return stations;
}

async function findOne(id) {
    const findStation = await Model.findOne({'_id':id});
    return findStation;
  }

module.exports = { addStation, findStation, allStations, findOne, };