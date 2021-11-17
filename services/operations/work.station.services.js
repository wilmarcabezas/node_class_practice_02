const db = require('../../db/conect');
const Model = require('../../model/work/work.model');

const ModelCity =  require('../../model/city/city.model');
const ModelUsers = require('../../model/user/user.model');
const { populate } = require('../../model/user/user.model');



async function UpdateStateStation(data){

    const station = await Model.findById({ _id: data.idWork }, { stations: {'$elemMatch': { _id: data.idStationWork } } } );
    station.stations.id(data.idStationWork).done=data.state;
    station.save();
    
    return station;
}

module.exports = { UpdateStateStation, };