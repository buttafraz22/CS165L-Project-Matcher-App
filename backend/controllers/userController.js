/*
  userController

  This module defines a controller for handling user-related operations.
  It exports functions for creating, updating, retrieving, and deleting user records,
  as well as logging in users and checking username/email uniqueness.

  Dependencies:
  - User: Model representing the user schema.
  - Role: Model representing the role schema.
  - bcrypt: Library for hashing passwords.
  - logController: Controller for logging operations.
*/

// Importing required models, libraries, and controllers
const User = require("../models/user");
const Role = require("../models/role");
const bcrypt = require('bcrypt');
const logController = require("./logController");
const saltRounds = 10;

// Function to create a new user
async function createUser(req, res) {
    try {
        // Extracting password and other user data from the request body
        const { password, ...remainingData } = req.body;
        let requestedData = { isFailed: true };

        // Checking if the username and email are unique
        const usernameCheck = await isUsernameUnique(remainingData.username);
        const emailCheck = await isEmailUnique(remainingData.email);

        if (!usernameCheck) {
            requestedData.message = "Username already exists";
        } else if (!emailCheck) {
            requestedData.message = "Email already exists";
        } else {
            // Hashing the password and creating a new user instance
            requestedData.message = "User has been created";
            requestedData.isFailed = false;
            const hash = await bcrypt.hash(password, saltRounds);
            const user = await User({ ...remainingData, password: hash });
            await user.save();
            const userId = user.id;
            requestedData.id = userId;
        }
        res.status(201).json({ requestedData });
    } catch (err) {
        // Handling errors, creating a log entry, and sending an internal server error response
        logController.createLog(err);
        res.status(500).json({ error: err.message });
    }
}

// Function to update a user's information
async function updateUser(req, res) {
    try {
        const { id } = req.params;

        // Extracting role and other user data from the request body
        const { role, ...userData } = req.body;
        
        // Finding the role based on its name
        const roleFound = await Role.findOne({ roleName: role });
        const userCompleteData = { ...userData, role: roleFound };
        
        // Updating the user information and sending the updated user as a response
        const updatedUser = await User.findByIdAndUpdate(id, userCompleteData, { new: true });
        res.json(updatedUser);
    } catch (err) {
        // Handling errors, creating a log entry, and sending an internal server error response
        logController.createLog(err);
        res.status(500).json({ error: err.message });
    }
}

// Function to retrieve all users
async function getAllUsers(req, res) {
    try {
        // Retrieving all users and sending them as a response
        const users = await User.find();
        res.json(users);
    } catch (err) {
        // Handling errors, creating a log entry, and sending an internal server error response
        logController.createLog(err);
        res.status(500).json({ error: err.message });
    }
}

// Function to delete a user
async function deleteUser(req, res) {
    try {
        const { id } = req.params;

        // Deleting the user and sending a success status
        await User.findByIdAndDelete(id);
        res.sendStatus(204);
    } catch (err) {
        // Handling errors, creating a log entry, and sending an internal server error response
        logController.createLog(err);
        res.status(500).json({ error: err.message });
    }
}

// Function to handle user login
async function login(req, res) {
    try {
        const { username, password } = req.body;

        // Finding the user based on the provided username
        const userFound = await User.findOne({ username });

        if (userFound) {
            // Comparing the provided password with the hashed password in the database
            bcrypt.compare(password, userFound.password, async function (err, result) {
                if (result) {
                    // Sending the user details as a response if the password is correct
                    res.json({ userFound });
                } else {
                    // Sending a response indicating incorrect login credentials
                    res.json({ isExist: false });
                }
            });
        } else {
            // Sending a response indicating that the user does not exist
            res.json({ isExist: false });
        }
    } catch (err) {
        // Handling errors, creating a log entry, and sending an internal server error response
        logController.createLog(err);
        res.status(500).json({ error: err.message });
    }
}

// Function to check if a username is unique
async function isUsernameUnique(username) {
    const userFound = await User.findOne({ username });
    return userFound === null;
}

// Function to check if an email is unique
async function isEmailUnique(email) {
    const userFound = await User.findOne({ email });
    return userFound === null;
}

// Exporting user-related functions
module.exports = {
    createUser,
    updateUser,
    getAllUsers,
    deleteUser,
    login
};