const db = require('../../db/conect');
const Model = require('../../model/route/route.model');

const ModelCity =  require('../../model/city/city.model');
const ModelUsers = require('../../model/user/user.model');
const { populate } = require('../../model/user/user.model');

const { hashPassword } = require('../../utils/hashdata');
const bcrypt = require('bcrypt');

const { use } = require('passport');
const { parse } = require('dotenv');


async function addWork(data)
{    
    const cityId = await ModelCity.findOne({'name':data.city});
    const UserId = await ModelUsers.findOne({'user':data.user});
    
    const modelWorks = new Model({
        ...data,
        city: cityId._id,
        user: UserId._id,
    });    
    const newWork = await modelWorks.save();
    return newWork;
}

async function allWorks()
{
        const works = await Model.find()
        .populate('user').populate({
            path:'city',
        })                
        .exec();
    return works;
}

async function WorksByUser(data)
{
    const UserId = await ModelUsers.findOne(data);
    const works = await Model.find({'user': UserId._id})
        .populate('user').populate({
            path:'city',
        })                
        .exec();
    return works;
}

async function WorksByUserActive(data)
{   
    const UserId = await ModelUsers.findOne({'user':data.user});
    const query = {
        'user': UserId._id,
        'finished':data.state,
    }
    
    const works = await Model.find(query)
        .populate('user').populate({
            path:'city',
        })                
        .exec();
    return works;
}

async function UpdateStation(){
    const station = await Model.find({ _id: '618ea6f601383dbe21116eb6'}, { 'stations.0' : '618ea6f601383dbe21116eba' })
    console.log(station);
    return station;
}

module.exports = { addWork, allWorks, WorksByUser, WorksByUserActive, UpdateStation, };