/*
  logController

  This module defines a controller for handling logging operations.
  It exports functions for creating a log entry and adding an error to the log.

  Dependencies:
  - Log: Model representing the log schema.
*/

// Importing the Log model
const Log = require("../models/log");

// Function to create a log entry based on error information
async function createLog(error) {
  // Extracting file, row, and column information from the error stack trace
  const stackMatch = error.stack.match(/at\s.*\((.*):(\d+):(\d+)\)/);

  if (stackMatch) {
    // Destructuring the matched values
    const [, fileName, rowNumber, columnNumber] = stackMatch;

    // Creating a new log instance with error details
    const newLog = await Log({
      errorType: error.name,
      fileName,
      columnNum: parseInt(columnNumber, 10),
      rowNum: parseInt(rowNumber, 10),
      activeStatus: true,
    });

    // Saving the log entry to the database
    await newLog.save();
  } else {
    console.error('Unable to extract file, row, and column information from stack trace.');
  }
}

// Function to add an error to the log
async function addToLog(req, res) {
  try {
    // Extracting the error from the request body
    const { error } = req.body;

    // Logging the error and sending a success response
    console.log(error);
    // createLog(error);
    res.status(201).json({ message: "Error has been registered" });
  } catch (err) {
    // Logging the error, creating a log entry, and sending an internal server error response
    createLog(err);
    res.status(500).json({ error: err.message });
  }
}

// Exporting the logController functions
module.exports = {
  addToLog
};