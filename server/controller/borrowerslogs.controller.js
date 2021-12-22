const borrowersLogModel = require('../model/borrowerslogs.model.js');

exports.getAllLogs = (req, res) => {
  //get query in borrowers model
  borrowersLogModel.getAll((err, data) => {
    try {
      res.send(data);
    } catch (error) {
      res.status(409).send({ message: error.message });
      console.log(err);
    }
  });
};

exports.addNewLog = (req, res) => {
  const borrowersLogData = new borrowersLogModel(req.body);
  console.log(borrowersLogData);
  //get query saving in borrowers model
  borrowersLogModel.AddLog(borrowersLogData, (err, data) => {
    try {
      res.send(data);
    } catch (error) {
      res.status(409).send({ message: error.message });
      console.log(err);
    }
  });
};

exports.updateLogReturned = (req, res) => {
  const borrowersDataReturned = new borrowersLogModel(req.body);

  //checking for null
  if (req.body.constructor === Object && Object.keys(req.body).length === 0)
    return res
      .send(400)
      .send({ success: false, message: 'no data to change on' });
  else {
    console.log('id: ', req.params.id);
    borrowersLogModel.UpdateLog(
      req.params.id,
      borrowersDataReturned,
      (err, data) => {
        if (err) {
          console.log('error sa controller', err);
          if (err.kind === 'not_found')
            return res
              .status(404)
              .send({ message: 'Not found: ' + req.params.id });
          else {
            return res
              .status(500)
              .send({ message: 'Error updating with id ' + req.params.id });
          }
        } else res.send(data);
      }
    );
  }
};
