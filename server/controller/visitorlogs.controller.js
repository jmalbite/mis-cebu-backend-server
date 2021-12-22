const visitorsLogModel = require('../model/visitorlogs.model.js');

//get all logs
exports.getAllLogs = (req, res) => {
  //get query in visitors logs model
  visitorsLogModel.getAll((err, data) => {
    try {
      res.send(data);
    } catch (error) {
      res
        .status(409)
        .send({ message: error.message || 'Error occured in retrieving data' });
      console.log(err);
    }
  });
};

//saving visitor data
exports.addNewLog = (req, res) => {
  const visitorLogData = new visitorsLogModel(req.body);
  console.log(visitorLogData);
  //save visitor data
  visitorsLogModel.AddLog(visitorLogData, (err, data) => {
    try {
      res.send(data);
    } catch (error) {
      res.status(409).send({ message: error.message });
    }
  });
};
