const express = require('express');
const validatorHandler = require('../../middlewares/validator.handler');

const workService = require('../../services/operations/work.station.services');

const passport = require('passport');
const bcrypt = require('bcrypt');
const { checkRoles } = require('../../middlewares/auth.handler');

const router = express.Router();

router.put('/',
async (req, res, next) => {
    try
    {
        const data = req.body;
        res.status(201).json(await workService.UpdateStation(data));
    }
    catch(error)
    {
        console.log(error);
        res.status(401).send(error);
    }
});

module.exports=router;