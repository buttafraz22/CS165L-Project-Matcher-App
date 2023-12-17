/*
  profileController

  This module defines a controller for handling profile-related operations.
  It exports functions for creating profiles, retrieving profiles, updating profiles,
  deleting profiles, and getting a list of all profiles.

  Dependencies:
  - User: Model representing the user schema.
  - Role: Model representing the role schema.
  - Profile: Model representing the profile schema.
  - Match: Model representing the match schema.
  - Chat: Model representing the chat schema.
  - Message: Model representing the message schema.
  - logController: Controller for logging operations.
  - auditController: Controller for audit operations.
*/

// Importing required models and controllers
const User = require("../models/user");
const Role = require("../models/role");
const Profile = require("../models/profile");
const Match = require("../models/match");
const Chat = require("../models/chat");
const Message = require("../models/message");
const logController = require("./logController");
const auditController = require("./auditController");

// Function to create a new profile
async function createProfile(req, res) {
  try {
    // Parsing form data and extracting relevant information
    const profilePicture = req.file;
    const formData = JSON.parse(req.body.profileData);
    const { username, profileType: roleName, ...profileData } = formData;

    // Retrieving user and role details
    const userId = await User.findOne({ username });
    const profileType = await Role.findOne({
      roleName: `${roleName.charAt(0).toUpperCase()}${roleName.slice(1)}`
    });

    // Constructing complete profile data
    const profileCompleteData = {
      ...profileData,
      profileType,
      userId,
      profilePicture
    };

    // Creating a new profile instance and saving it to the database
    const profile = await Profile(profileCompleteData);
    profile.save();

    if (profile != null) {
      const message = 'Profile has been created.';
      res.status(201).json({ message, ...userId._id });
    } else {
      let err = 'There is an error.';
      res.status(201).json({ err });
    }
  } catch (err) {
    // Handling errors, creating a log entry, and sending an internal server error response
    logController.createLog(err);
    res.status(500).json({ error: err.message });
  }
}

// Function to retrieve a profile based on user ID
async function getProfile(req, res) {
  try {
    const { userId } = req.params;
    const profileFound = await Profile.findOne({ userId });

    if (profileFound) {
      res.json({ profileFound, message: "Profile Found" });
    } else {
      res.json({ isExist: false });
    }
  } catch (err) {
    // Handling errors, creating a log entry, and sending an internal server error response
    logController.createLog(err);
    res.status(500).json({ error: err.message });
  }
}

// Function to delete a profile based on user ID
async function deleteProfile(req, res) {
  try {
    const { userId } = req.params;

    // Deleting profile, associated user, matches, chat, and messages
    const deletedProfile = await Profile.deleteOne({ userId });
    const deletedUser = await User.deleteOne({ _id: userId });
    const deletedMatch = await Match.deleteMany({
      $or: [{ userId1: userId }, { userId2: userId }]
    });
    const chat = await Chat.findOne({
      $or: [{ 'participants.0': userId }, { 'participants.1': userId }]
    });
    const deletedChat = await Chat.deleteMany({
      $or: [{ 'participants.0': userId }, { 'participants.1': userId }]
    });

    if (chat !== null) {
      const deleteMessages = await Message.deleteMany({ chatId: chat._id });
    }

    if (deletedProfile) {
      res.json({ message: "Profile Deleted" });
    } else {
      res.json({ isExist: false });
    }
  } catch (err) {
    // Handling errors, creating a log entry, and sending an internal server error response
    logController.createLog(err);
    res.status(500).json({ error: err.message });
  }
}

// Function to retrieve a list of all profiles based on search criteria
async function getAllProfiles(req, res) {
  try {
    const { userId, minAge, maxAge } = req.query;

    // Retrieving profiles and users based on search criteria
    const profilesFound = await Profile.find({ userId: { $ne: userId } });
    const usersFound = await User.find({
      _id: { $ne: userId },
      age: { $gte: minAge, $lte: maxAge }
    });
    const userFound = await User.findOne({ _id: userId });
    const currentProfile = await Profile.findOne({ userId: userId });
    const profileRole = await Role.findOne({ _id: currentProfile.profileType });

    let profiles = [];

    for (let i = 0; i < profilesFound.length; i++) {
      for (let j = 0; j < usersFound.length; j++) {
        if (profilesFound[i].userId.toString() == usersFound[j]._id.toString()) {
          if (profileRole.roleName === 'Partner') {
            const profile = await Profile.findOne({ userId: usersFound[j]._id });
            const role = await Role.findOne({ _id: profile.profileType });
            if (role.roleName !== "Parent" && usersFound[j].gender != userFound.gender) {
              profiles.push(profilesFound[i]);
            }
          } else {
            const profile = await Profile.findOne({ userId: usersFound[j]._id });
            const role = await Role.findOne({ _id: profile.profileType });
            if (role.roleName !== "Parent") {
              profiles.push(profilesFound[i]);
            }
          }
        }
      }
    }

    if (profilesFound) {
      res.json({ profilesFound: profiles, message: "Profile Found" });
    } else {
      res.json({ isExist: false });
    }
  } catch (err) {
    // Handling errors, creating a log entry, and sending an internal server error response
    logController.createLog(err);
    res.status(500).json({ error: err.message });
  }
}

// Function to update a profile based on user ID
async function updateProfile(req, res) {
  try {
    const { userId } = req.params;

    // Retrieving old and new profile data for audit
    const object = await Profile.findOne({ userId: userId });
    const oldProfile = await Profile.findOne({ userId: userId });
    const profileUpdated = await Profile.updateOne(
      { userId: userId },
      { $set: req.body }
    );
    const newProfile = await Profile.findOne({ userId: userId });

    // Creating an audit entry for profile update
    auditController.createAudit(object, oldProfile, newProfile);

    if (profileUpdated) {
      res.json({ profileUpdated: newProfile, message: "Profile Updated" });
    } else {
      res.json({ isExist: false });
    }
  } catch (err) {
    // Handling errors, creating a log entry, and sending an internal server error response
    logController.createLog(err);
    res.status(500).json({ error: err.message });
  }
}

// Exporting the profileController functions
module.exports = {
  createProfile,
  getProfile,
  getAllProfiles,
  deleteProfile,
  updateProfile
};