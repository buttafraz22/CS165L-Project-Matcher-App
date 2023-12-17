/*
  reportController

  This module defines a controller for handling report-related operations.
  It exports a function for creating and submitting user reports.

  Dependencies:
  - User: Model representing the user schema.
  - Report: Model representing the report schema.
  - logController: Controller for logging operations.
*/

// Importing required models and controllers
const User = require("../models/user");
const Report = require("../models/report");
const logController = require("./logController");

// Function to create and submit a user report
async function createReport(req, res) {
  try {
    // Extracting report details from the request body
    const { reporterUser, reportedUser, reportType, reportContent } = req.body;

    // Retrieving user objects for the reporter and reported users
    const reporterUserId = await User.findOne({ _id: reporterUser });
    const reportedUserId = await User.findOne({ _id: reportedUser });

    // Creating a new report instance and saving it to the database
    const report = await Report.create({
      reporterUserId,
      reportedUserId,
      reportType,
      reportContent
    });

    // Sending a success response
    res.status(201).json({ isFailed: false, message: "Report has been submitted" });
  } catch (err) {
    // Handling errors, creating a log entry, and sending an internal server error response
    logController.createLog(err);
    res.status(500).json({ error: err.message });
  }
}

// Exporting the createReport function
module.exports = {
  createReport
};