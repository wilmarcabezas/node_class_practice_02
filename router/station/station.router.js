const express = require('express');
const { validatorHandler } = require('../../middlewares/validator.handler');
const stationService = require('../../services/station/station.service')
const { createStationSchema } = require('../../model/station/station.schema');
const passport = require('passport');
const bcrypt = require('bcrypt');
const { checkRoles } = require('../../middlewares/auth.handler');

const router = express.Router();


router.post('/', 
passport.authenticate('jwt',{session: false}),
checkRoles('admin'),
validatorHandler(createStationSchema, 'body'),
async (req, res, next) => {
    try
    {
        const body = req.body;
        res.status(201).json(await stationService.addStation(body));
    }
    catch(error)
    {
        console.log(error);
        res.status(401).send(error);
    }   
});

router.get('/:station', 
async (req, res, next) => {
    try
    {
        res.status(201).json(await stationService.findStation(req.params.station));
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
        res.status(201).json(await stationService.allStations());
    }
    catch(error)
    {
        console.log(error);
        res.status(401).send(error);
    }
});

module.exports=router;