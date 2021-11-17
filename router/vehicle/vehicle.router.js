const express = require('express');
const { validatorHandler } = require('../../middlewares/validator.handler');

const vehicleService = require('../../services/vehicle/vehicle.service')
const { createVehicleSchema } = require('../../model/vehicle/vehicle.schema');

const passport = require('passport');
const bcrypt = require('bcrypt');
const { checkRoles } = require('../../middlewares/auth.handler');

const router = express.Router();


router.post('/', 
passport.authenticate('jwt',{session: false}),
checkRoles('admin'),
validatorHandler(createVehicleSchema, 'body'),
async (req, res, next) => {
    try
    {
        const body = req.body;
        res.status(201).json(await vehicleService.addVehicle(body));
    }
    catch(error)
    {
        console.log(error);
        res.status(401).send(error);
    }   
});

router.get('/:vehicle', 
async (req, res, next) => {
    try
    {
        res.status(201).json(await vehicleService.findVehicle(req.params.vehicle));
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
        res.status(201).json(await vehicleService.allVehicles());
    }
    catch(error)
    {
        res.status(401).send(error);
    }
});

module.exports=router;