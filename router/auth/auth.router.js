const express = require('express');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const router = express.Router();
const { config } = require('../../config/config');
const AuthService = require('../../services/auth/auth.service');
const ModelUsers = require('../../model/user/user.model');
const boom = require('@hapi/boom');

const service = new AuthService();


router.post('/login',
  passport.authenticate('local', {session: false}),
  async (req, res, next) => {
    try 
    {
      const user =  req.user;
      const payload = {
        sub: user._id,
        role: user.role,
      };

      const accesstoken = await jwt.sign(payload,config.jwtSecret,{
        expiresIn:'1d'
      });

      const verify = await jwt.verify(accesstoken,config.jwtSecret);
      const refreshtoken = await jwt.sign(payload,config.jwtRefreshSecret);

      const updateAccessToken = await ModelUsers.updateOne({_id: req.user.id},{accesstoken: accesstoken});
      const updateRefreshToken = await ModelUsers.updateOne({_id: req.user.id},{refreshtoken: refreshtoken});
      

      res.json(
        {
          'message':'Login succesfull',
          data: {
            accesstoken: accesstoken,
            refreshtoken: refreshtoken,
            'expire': verify.exp,
          },
        }
      );
    } catch (error) 
    {
      next(error);
    }
  }
);

router.post('/refresh-token/:data', 
async (req, res, next) =>{
  try{
    const verify = await jwt.verify(req.params.data,config.jwtRefreshSecret);
    if(!verify){
      throw boom.invalid('Invalid token');
    }

    console.log(verify);
    const payload = {
      sub: verify.sub,
      role: verify.role,
    };

    const accesstoken = await jwt.sign(payload,config.jwtSecret,{ expiresIn:'1d'  });


    const Accessverify = await jwt.verify(accesstoken,config.jwtSecret);
    const refreshtoken = await jwt.sign(payload,config.jwtRefreshSecret);

    const updateAccessToken = await ModelUsers.updateOne({_id: verify.sub},{accesstoken: accesstoken});
    const updateRefreshToken = await ModelUsers.updateOne({_id: verify.sub},{refreshtoken: refreshtoken});

    res.json(
      {
        'message':'Token refresh',
        data: {
          accesstoken: accesstoken,
          refreshtoken: refreshtoken,
          'expire': verify.exp,
        },
      }
    );
  }
  catch(err){
    next(err);
  }
}
);

router.post('/recovery',
  async (req, res, next) => {
    console.log(config.smtpPassword);
    try {
      const { email } = req.body;
      const rta = await service.sendRecovery(email);
      res.json(rta);
    } catch (error) {
      next(error);
    }
  }
);

router.post('/change-password',
  async (req, res, next) => {
    try {
      const { token, newPassword } = req.body;
      const rta = await service.changePassword(token, newPassword);
      res.json(rta);
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;