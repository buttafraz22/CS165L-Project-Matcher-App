/*
  auditController

  This module defines a controller for handling audit-related operations.
  It exports a function 'createAudit' to create audit records in the database.

  Dependencies:
  - Audit: Model representing the audit schema.
  - logController: Controller for handling logging operations.
*/

// Importing the Audit model and logController
const Audit = require("../models/audit");
const logController = require("./logController");

// Function to create an audit record in the database
async function createAudit(object, oldData, newData) {
  try {
    // Creating a new audit record
    const audit = await Audit.create({
      objectId: object,
      oldData: oldData,
      newData: newData,
    });

    // Logging the creation of the audit record
    console.log('Audit created:', audit);
  } catch (error) {
    // Logging the error and creating a log entry
    logController.createLog(error);
    console.error('Error creating audit:', error);
  }
}

// Exporting the createAudit function
module.exports = {
  createAudit
};