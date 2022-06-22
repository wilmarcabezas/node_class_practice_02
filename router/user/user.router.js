const express = require('express');
const { validatorHandler }  = require('../../middlewares/validator.handler');
const { checkApiKey } = require('../../middlewares/auth.handler');
const { checkRoles } = require('../../middlewares/auth.handler');

const userService = require('../../services/user/user.services')
const { createUserSchema, findUserSchema } = require('../../model/user/user.schema');
const passport = require('passport');
const bcrypt = require('bcrypt');

const router = express.Router();

router.post('/', checkApiKey,
validatorHandler(createUserSchema, 'body'),
async (req, res, next) => {
    /* 	#swagger.tags = ['User']
        #swagger.description = 'Endpoint to sign in a specific user...' */

    try
    {
        const body = req.body;
        res.status(201).json(await userService.addUser(body));
    }
    catch(error)
    {
        next(error);
    }   
});

router.get('/:user', 
async (req, res, next) => {
    try
    {
        res.status(201).json(await userService.findUserCitys(req.params.user));
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
        res.status(201).json(await userService.allUser());
    }
    catch(error)
    {
        res.status(401).send(error);
    }
});

module.exports=router;

/*

passport.authenticate('jwt',{session: false}),
checkRoles('admin'),
*/ 