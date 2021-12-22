const SQL = require('../config/db.js');

//constructor
const VisitorLogs = function (visitor) {
  this.visitor_id = visitor.visitor_id;
  this.employee_code = visitor.employee_code;
  this.firstname = visitor.firstname;
  this.lastname = visitor.lastname;
  this.area_visited = visitor.area_visited;
  this.company = visitor.company;
  this.purpose = visitor.purpose;
  this.visitor_signature = visitor.signature;
  this.time_visited = new Date();
};

//get all logs
VisitorLogs.getAll = (result) => {
  SQL.query('SELECT * FROM visitor_logs', (err, res) => {
    try {
      result(null, res);
    } catch (error) {
      result(null, err);
      console.log(error);
      console.log('Error in fetching visitors logs');
    }
  });
};

VisitorLogs.AddLog = (newLog, result) => {
  SQL.query('INSERT INTO visitor_logs SET ?', newLog, (err, res) => {
    try {
      result(null, res);
      console.log(res);
      console.log('Log Added Succesfully');
    } catch (error) {
      result(err, null);
      console.log(error);
      console.log('Error in saving visitor log');
    }
  });
};

module.exports = VisitorLogs;
