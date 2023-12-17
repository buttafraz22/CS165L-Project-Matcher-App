/*
  chatController

  This module defines a controller for handling chat-related operations.
  It exports functions for creating a chat, deleting a chat, and retrieving chat rooms.

  Dependencies:
  - Chat: Model representing the chat schema.
  - logController: Controller for handling logging operations.
*/

// Importing the Chat model and logController
const Chat = require("../models/chat");
const logController = require("./logController");

// Function to create a new chat room in the database
async function createChat(user1, user2) {
  try {
    // Checking if the chat room already exists
    const exist = await isExist(user1._id, user2._id);

    if (!exist) {
      // Creating an array of chat participants
      let users = [user1, user2];

      // Creating a new chat instance with a random chat room number
      const chat = await Chat({ chatRoom: Math.floor(Math.random() * 999) + 100, participants: users, activeStatus: true });
      
      // Saving the chat to the database
      chat.save();

      // Returning success if chat is created, else returning failure
      return chat != null;
    } else {
      return false;
    }
  } catch (err) {
    // Logging the error and creating a log entry
    logController.createLog(err);
    return false;
  }
}

// Function to check if a chat room already exists between two users
async function isExist(userId1, userId2) {
  const chat = await Chat.findOne({ $or: [{ 'participants.0': userId1, 'participants.1': userId2 }, { 'participants.0': userId2, 'participants.1': userId1 }] });
  return chat !== null;
}

// Function to delete a chat room between two users
async function deleteChat(userId1, userId2) {
  try {
    // Deleting the chat room based on user IDs
    const result = await Chat.deleteOne({ $or: [{ 'participants.0': userId1, 'participants.1': userId2 }, { 'participants.0': userId2, 'participants.1': userId1 }] });

    // Returning success if chat is deleted, else returning failure
    return result.deletedCount > 0;
  } catch (err) {
    // Logging the error and creating a log entry
    logController.createLog(err);
    return false;
  }
}

// Function to get the chat room information between two users
async function getRoom(req, res) {
  try {
    const { userId1, userId2 } = req.query;

    // Finding the chat room based on user IDs
    const chat = await Chat.findOne({ $or: [{ 'participants.0': userId1, 'participants.1': userId2 }, { 'participants.0': userId2, 'participants.1': userId1 }] });

    // Returning success and chat details if chat room is found, else returning failure
    res.status(201).json({ message: chat !== null, chat });
  } catch (err) {
    // Logging the error and sending an internal server error response
    logController.createLog(err);
    res.status(500).json({ error: err.message });
  }
}

// Exporting the chatController functions
module.exports = {
  createChat,
  deleteChat,
  getRoom
};