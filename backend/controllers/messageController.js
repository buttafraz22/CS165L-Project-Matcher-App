/*
  messageController

  This module defines a controller for handling message-related operations.
  It exports functions for creating messages, retrieving messages, and deleting old messages.

  Dependencies:
  - User: Model representing the user schema.
  - Match: Model representing the match schema.
  - Profile: Model representing the profile schema.
  - Chat: Model representing the chat schema.
  - Message: Model representing the message schema.
  - logController: Controller for logging operations.
*/

// Importing required models and controllers
const User = require("../models/user");
const Match = require("../models/match");
const Profile = require("../models/profile");
const Chat = require("../models/chat");
const Message = require("../models/message");
const logController = require("./logController");

// Function to create a new message in a chat
async function createMessage(req, res) {
  try {
    const { chatId, userId, messageContent, time } = req.body;

    // Retrieving chat and user details
    const chat = await Chat.findOne({ _id: chatId });
    const user = await User.findOne({ _id: userId });

    // Creating a new message instance and saving it to the database
    const message = await Message({
      chatId: chat,
      userId: user,
      messageContent: messageContent,
      time: time
    });

    message.save();

    if (message != null) {
      res.status(201).json({ isFailed: false, message });
    } else {
      res.status(201).json({ isFailed: true });
    }
  } catch (err) {
    // Handling errors, creating a log entry, and sending an internal server error response
    logController.createLog(err);
    res.status(500).json({ error: err.message });
  }
}

// Function to retrieve messages for a given chat
async function getMessages(req, res) {
  try {
    // Deleting old messages before retrieving new ones
    deleteOldMessages();

    const { chatId } = req.query;

    // Retrieving messages associated with the chat
    const messagesFound = await Message.find({ chatId: chatId });

    let messages = [];

    for (let i = 0; i < messagesFound.length; i++) {
      // Retrieving user and profile details for each message
      const user = await User.findOne({ _id: messagesFound[i].userId });

      if (user) {
        const profile = await Profile.findOne({ userId: messagesFound[i].userId });
        messages.push({ message: messagesFound[i], name: profile.name });
      } else {
        console.log("User not found for userId:", messagesFound[i].userId);
      }
    }

    if (messagesFound) {
      res.json({ isFailed: false, messages });
    } else {
      res.json({ isFailed: true });
    }
  } catch (err) {
    // Handling errors, creating a log entry, and sending an internal server error response
    logController.createLog(err);
    res.status(500).json({ error: err.message });
  }
}

// Function to delete messages older than 7 days
async function deleteOldMessages() {
  try {
    // Calculate the date from 7 days ago
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

    // Delete messages older than 7 days
    await Message.deleteMany({ createdAt: { $lt: sevenDaysAgo } });

    console.log('Old messages deleted successfully.');
  } catch (err) {
    // Handling errors, creating a log entry, and logging the error to the console
    logController.createLog(err);
    console.error('Error deleting old messages:', err);
  }
}

// Exporting the messageController functions
module.exports = {
  createMessage,
  getMessages
};