const express = require('express');
const materialService = require('../../services/typeofmaterial/typeofmaterial.service');
const { createMaterialchema } = require('../../model/typeofmaterial/typeofmaterial.schema');
const passport = require('passport');
const bcrypt = require('bcrypt');

const { validatorHandler } = require('../../middlewares/validator.handler');
const { checkRoles } = require('../../middlewares/auth.handler');

const router = express.Router();


router.post('/', 
passport.authenticate('jwt',{session: false}),
checkRoles('admin'),
validatorHandler(createMaterialchema, 'body'),
async (req, res, next) => {
    try
    {
        const body = req.body;
        res.status(201).json(await materialService.addMaterial(body));
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
        res.status(201).json(await materialService.allMaterials());
    }
    catch(error)
    {
        res.status(401).send(error);
    }
});

module.exports=router;