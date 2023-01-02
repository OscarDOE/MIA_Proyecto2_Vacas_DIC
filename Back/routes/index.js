const express = require('express');

// const productsRouter = require('./products.router');
// const categoriesRouter = require('./categories.router');
const usersRouter = require('./users.router');
const viajesRouter = require('./viajes.router');
const autosRouter = require('./autos.router');
const solicitudesRouter = require('./solicitudes.router');

function routerApi(app) {
  const router = express.Router();
  app.use('/', router);
  router.use('/viajes', viajesRouter);
  router.use('/autos', autosRouter);
  router.use('/users', usersRouter);
  router.use('/solicitudes', solicitudesRouter); 
}

module.exports = routerApi;
