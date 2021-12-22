const SQL = require('../config/db');

//constructor for borrowers logs
const BorrowersLogs = function (borrowers) {
  this.borrowers_id = borrowers.borrowers_id;
  this.employee_code = borrowers.employee_code;
  this.firstname = borrowers.firstname;
  this.lastname = borrowers.lastname;
  this.company = borrowers.company;
  this.item_borrowed = borrowers.item_borrowed;
  this.date_time_borrowed = borrowers.date_time_borrowed;
  this.borrowers_signature = borrowers.borrowers_signature;
  this.date_time_returned = borrowers.date_time_returned;
  this.borrowers_signature_returned = borrowers.borrowers_signature_returned;
  this.item_status = borrowers.item_status;
};

//get all logs for the borrowers and item borrowed in the IT
BorrowersLogs.getAll = (result) => {
  SQL.query('SELECT * FROM borrowers_logs', (err, res) => {
    try {
      result(null, res);
      console.log('Borrowers logs successfully fetch');
    } catch (error) {
      result(null, err);
      console.log(error);
      console.log('Error in fetching borrowers logs');
    }
  });
};

//add logs for borrowers
BorrowersLogs.AddLog = (newLog, result) => {
  SQL.query('INSERT INTO borrowers_logs SET ?', newLog, (err, res) => {
    //checking error during request
    if (err) {
      console.log('error: ', err);
      result(err, null);
      return;
    }

    console.log('Borrowers log created : ', {
      borrowers_id: res.borrowers_id,
      ...newLog,
    });
    result(null, { borrowers_id: res.borrowers_id, ...newLog });
  });
};

//update when item returned such as
//item_status, borrowers_signature_returned, date_time_returned
BorrowersLogs.UpdateLog = (borrowers_id, dataLog, result) => {
  console.log('id model', borrowers_id);
  SQL.query(
    'UPDATE borrowers_logs SET date_time_returned = ?, borrowers_signature_returned = ?, item_status =? WHERE borrowers_id = ?',
    [
      dataLog.date_time_returned,
      dataLog.borrowers_signature_returned,
      dataLog.item_status,
      borrowers_id,
    ],
    (err, res) => {
      //check error during request
      if (err) {
        console.log('error: ', err);
        result(null, err);
        return;
      }

      //checking if the id is found
      if (res.affectedRows === 0) {
        result({ kind: 'not found' }, null);
        return;
      }

      //if if/else statement is false then update borrowers logs with corresponding id
      console.log('updated logs: ', { id: borrowers_id, ...dataLog });
      result(null, { borrowers_id: borrowers_id, ...dataLog });
    }
  );
};

module.exports = BorrowersLogs;
