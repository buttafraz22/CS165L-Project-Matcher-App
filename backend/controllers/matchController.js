/*
  matchController

  This module defines a controller for handling match-related operations.
  It exports functions for creating a match, checking if a match exists,
  deleting a match, and retrieving matched profiles.

  Dependencies:
  - User: Model representing the user schema.
  - Match: Model representing the match schema.
  - Profile: Model representing the profile schema.
  - chatController: Controller for chat-related operations.
  - logController: Controller for logging operations.
*/

// Importing required models and controllers
const User = require("../models/user");
const Match = require("../models/match");
const Profile = require("../models/profile");
const chatController = require("./chatController");
const logController = require("./logController");

// Function to create a match between two users
async function createMatch(req, res) {
  try {
    const { userId1, userId2 } = req.body;

    // Checking if the match already exists
    const exist = await isExist(userId1, userId2);

    if (!exist) {
      // Retrieving user details
      const user1 = await User.findOne({ _id: userId1 });
      const user2 = await User.findOne({ _id: userId2 });

      // Creating a chat for the matched users
      chatController.createChat(user1, user2);

      // Creating a match instance and saving it to the database
      const match = await Match({ userId1: user1, userId2: user2, activeStatus: true });
      match.save();

      if (match != null) {
        const message = `You are matched with ${user2.username}.`;
        res.status(201).json({ message });
      } else {
        const err = 'There is an error.';
        res.status(201).json({ err });
      }
    } else {
      const message = 'Already matched.';
      res.status(201).json({ message });
    }
  } catch (err) {
    // Handling errors, creating a log entry, and sending an internal server error response
    logController.createLog(err);
    res.status(500).json({ error: err.message });
  }
}

// Function to check if a match exists between two users
async function isExist(userId1, userId2) {
  const match = await Match.findOne({ $or: [{ userId1, userId2 }, { userId1: userId2, userId2: userId1 }] });
  return match !== null;
}

// Function to check if two users are matched
async function isMatched(req, res) {
  try {
    const { userId1, userId2 } = req.body;

    // Checking if the match exists
    const match = await Match.findOne({ $or: [{ userId1, userId2 }, { userId1: userId2, userId2: userId1 }] });

    if (match !== null) {
      res.status(201).json({ message: true });
    } else {
      res.status(201).json({ message: false });
    }
  } catch (err) {
    // Handling errors, creating a log entry, and sending an internal server error response
    logController.createLog(err);
    res.status(500).json({ error: err.message });
  }
}

// Function to delete a match between two users
async function deleteMatch(req, res) {
  try {
    const { userId1, userId2 } = req.body;

    // Deleting the chat associated with the match
    chatController.deleteChat(userId1, userId2);

    // Deleting the match from the database
    Match.deleteOne({ $or: [{ userId1, userId2 }, { userId1: userId2, userId2: userId1 }] })
      .then(() => {
        res.status(201).json({ message: true });
      })
      .catch((err) => {
        res.status(201).json({ message: false });
      });
  } catch (err) {
    // Handling errors, creating a log entry, and sending an internal server error response
    logController.createLog(err);
    res.status(500).json({ error: err.message });
  }
}

// Function to retrieve profiles of users who are matched with a given user
async function matchedProfiles(req, res) {
  try {
    const { userId, search } = req.query;
    let profiles = [];
    let profile = null;

    // Retrieving matches associated with the user
    const matches = await Match.find({ $or: [{ userId1: userId }, { userId2: userId }] });

    for (let i = 0; i < matches.length; i++) {
      // Retrieving the profile of the matched user
      if (matches[i].userId1.toString() !== userId) {
        if (search.length > 0) {
          profile = await getSearchedProfile(matches[i].userId1.toString(), search);
        } else {
          profile = await getProfile(matches[i].userId1.toString());
        }
      } else {
        if (search.length > 0) {
          profile = await getSearchedProfile(matches[i].userId2.toString(), search);
        } else {
          profile = await getProfile(matches[i].userId2.toString());
        }
      }

      if (profile !== null) {
        profiles.push(profile);
      }
    }

    if (profiles.length > 0) {
      res.status(201).json({ isFailed: false, profiles });
    } else {
      res.status(201).json({ isFailed: true });
    }
  } catch (err) {
    // Handling errors, creating a log entry, and sending an internal server error response
    logController.createLog(err);
    res.status(500).json({ error: err.message });
  }
}

// Function to retrieve the profile of a user based on the user ID
async function getProfile(userId) {
  try {
    const profile = await Profile.findOne({ userId });

    if (profile) {
      return profile;
    } else {
      return { isFailed: true };
    }
  } catch (err) {
    // Handling errors and creating a log entry
    logController.createLog(err);
  }
}

// Function to retrieve a searched profile of a user based on the user ID and search query
async function getSearchedProfile(userId, search) {
  try {
    const profile = await Profile.findOne({ userId, name: { $regex: new RegExp(search, 'i') } });

    if (profile) {
      return profile;
    } else {
      return null;
    }
  } catch (err) {
    // Handling errors and creating a log entry
    logController.createLog(err);
  }
}

// Exporting the matchController functions
module.exports = {
  createMatch,
  isMatched,
  deleteMatch,
  matchedProfiles
};