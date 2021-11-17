const db = require('../../db/conect');
const Model = require('../../model/user/user.model');
const ModelCity =  require('../../model/city/city.model');

const { hashPassword } = require('../../utils/hashdata');
const bcrypt = require('bcrypt');
const { use } = require('passport');
const { populate } = require('../../model/user/user.model');

const boom = require('@hapi/boom');


async function addUser(data)
{    
   
        const passwordhash = await bcrypt.hash(data.password, 10);
        
        const cityId = await ModelCity.findOne({'_id':data.city});
        //Validate city

        if(!cityId){
            throw boom.notFound('Invalid city');
        }
        
        const modelUsers = new Model({
            ...data,
            password: passwordhash,
            city: cityId._id,
        });    
        

        //Validate username and email
        const userExists = await Model.find({ $or:  [ { 'user': data.user } , { 'email': data.email } ] } )
        if(userExists.length>0){
            throw boom.conflict('User or email must be unique');
        }

        //If before is correct, then created user
        const newuser = await modelUsers.save();
        console.log(newuser);
        return {
            'message':'Created',
            'user':
            {
                'id': newuser._id,
                'name': newuser.user
            }
        };   
    
       
}

async function findUserCitys(data)
{
    return new Promise((resolve, reject) =>{
        let filter = {};
        if(filter !== null)
        {
            filter={ 'user':data };
        }
        Model.find(filter)
            .populate('city')
            .exec((error, populated) => {
                if(error){
                    reject(error);
                    console.log(error);
                    return false;
                }
                resolve(populated);
            })
    });
}

async function findUser(data)
{
    const finduser = await Model.findOne({'user':data});        
    return finduser;
}

async function updateUser(data, changes)
{
    const user = await Model.findOne(data);
    const rta = await user.update(changes);
    return rta;
}

async function updateToken(data, changes)
{
    console.log(changes);
    const user = await Model.findOne(data);
    console.log('El usuario es:' + user);
    const rta = user.updateOne(changes);
    return rta;
}

async function findUserByEmail(data)
{
    const finduser = await Model.findOne({'email':data});
    return finduser;
}

async function allUser(data)
{   

    return new Promise((resolve, reject) =>{        
        Model.find()
            .populate('city')
            .exec((error, populated) => {
                if(error){
                    reject(error);
                    console.log(error);
                    return false;
                }
                resolve(populated);
            })
    });
}

async function findOne(id) {
    const finduser = await Model.findOne({'_id':id});
    return finduser;
  }

module.exports = { addUser, findUser, allUser, findUserByEmail, updateUser, updateToken, findOne, findUserCitys };