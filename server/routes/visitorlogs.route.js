module.exports = (app) => {
  const visitors = require('../controller/visitorlogs.controller.js');

  const router = require('express').Router();

  //get all controllers for route api
  router.get('/', visitors.getAllLogs);
  router.post('/', visitors.addNewLog);

  app.use('/api/visitorslogs', router);
};
