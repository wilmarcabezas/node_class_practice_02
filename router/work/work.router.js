const express = require('express');
const validatorHandler = require('../../middlewares/validator.handler');

const workService = require('../../services/work/work.services');

const passport = require('passport');
const bcrypt = require('bcrypt');
const { checkRoles } = require('../../middlewares/auth.handler');

const router = express.Router();



router.post('/', 
passport.authenticate('jwt',{session: false}),
checkRoles('admin','operator'),
async (req, res, next) => {
    try
    {
        const body = req.body;
        res.status(201).json(await workService.addWork(body));
    }
    catch(error)
    {
        res.status(401).send(error+' ');
    }   
});

router.get('/works-state/', 
async (req, res, next) => {
    try
    {
        const body = req.body;
        res.status(201).json(await workService.WorksByUserActive(body));
    }
    catch(error)
    {
        console.log(error);
        res.status(401).send(error);
    }   
});

router.get('/:user', 
async (req, res, next) => {
    try
    {
        const body = req.query;
        res.status(201).json(await workService.WorksByUser(body));
    }
    catch(error)
    {
        console.log(error);
        res.status(401).send(error);
    }   
});


router.get('/',
async (req, res, next) => {
    try
    {
        res.status(201).json(await workService.allWorks());
    }
    catch(error)
    {
        res.status(401).send(error);
    }
});

module.exports=router;