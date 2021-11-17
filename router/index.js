const express = require('express');
const loginRouter = require('./auth/auth.router');

const userRouter = require('./user/user.router');
const cityRouter = require('./city/city.router');
const stationRouter = require('./station/station.router');
const vehicleRouter = require('./vehicle/vehicle.router');
const elementRouter = require('./element/element.router');
const workRouter = require('./work/work.router');
const materialRouter = require('./typeofmaterial/typeofmaterial.router');
const operationRouter = require('./operations/work.station.router');



function routerApi(app) {
  const router = express.Router();
  app.use('/api/v1', router);

  router.use('/user', userRouter);
  router.use('/city', cityRouter);
  router.use('/station', stationRouter);
  router.use('/vehicle', vehicleRouter);
  router.use('/element', elementRouter);
  router.use('/work', workRouter);
  router.use('/material', materialRouter);

  router.use('/operation', operationRouter);  
  router.use('/auth', loginRouter);
}

module.exports = routerApi;