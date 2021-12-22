module.exports = (app) => {
  const borrowers = require('../controller/borrowerslogs.controller.js');

  const router = require('express').Router();

  //get all controllers for route api
  router.get('/', borrowers.getAllLogs);
  router.post('/', borrowers.addNewLog);
  router.put('/:id', borrowers.updateLogReturned);

  app.use('/api/borrowerslogs', router);
};
