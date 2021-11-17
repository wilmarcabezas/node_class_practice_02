const express = require('express');
const { validatorHandler } = require('../../middlewares/validator.handler');
const elementService = require('../../services/element/element.service')
const { createElementSchema } = require('../../model/elementepp/elementepp.schema');
const passport = require('passport');
const bcrypt = require('bcrypt');
const { checkRoles } = require('../../middlewares/auth.handler');

const router = express.Router();


router.post('/', 
passport.authenticate('jwt',{session: false}),
checkRoles('admin'),
validatorHandler(createElementSchema, 'body'),
async (req, res, next) => {
    try
    {
        const body = req.body;
        res.status(201).json(await elementService.addElement(body));
    }
    catch(error)
    {
        res.status(500).send(error);
    }   
});

router.get('/:station', 
async (req, res, next) => {
    try
    {
        res.status(201).json(await elementService.findElement(req.params.station));
    }
    catch(error)
    {
        res.status(500).send(error);
    }   
});

router.get('/',
async (req, res, next) => {
    try
    {
        res.status(201).json(await elementService.allElements());
    }
    catch(error)
    {
        res.status(401).send(error);
    }
});

module.exports=router;