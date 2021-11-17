const express = require('express');
const validatorHandler = require('../../middlewares/validator.handler');
const cityService = require('../../services/city/city.service')
const { createCitySchema } = require('../../model/city/city.schema');
const passport = require('passport');
const bcrypt = require('bcrypt');
const { checkRoles } = require('../../middlewares/auth.handler');

const router = express.Router();


passport.authenticate('jwt',{session: false}),
checkRoles('admin'),

router.post('/', 
async (req, res, next) => {
    try
    {
        const body = req.body;
        res.status(201).json(await cityService.addCity(body));
    }
    catch(error)
    {
        console.log(error);
        res.status(401).send(error);
    }   
});

router.get('/:city', 
async (req, res, next) => {
    try
    {
        res.status(201).json(await cityService.findUser(req.params.city));
    }
    catch(error)
    {
        res.status(401).send(error);
    }   
});

router.get('/',
async (req, res, next) => {
    try
    {
        res.status(201).json(await cityService.allCities());
    }
    catch(error)
    {
        res.status(401).send(error);
    }
});

module.exports=router;