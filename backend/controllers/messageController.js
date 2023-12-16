const User = require("../models/user");
const Match = require("../models/match");
const Profile = require("../models/profile");
const Chat = require("../models/chat");
const Message = require("../models/message");

async function createMessage(req, res) {
    try {
        const { chatId, userId, messageContent, time } = req.body;
        const chat = await Chat.findOne({_id: chatId});
        const user = await User.findOne({_id: userId});

        console.log(chat);
        console.log(user);

        const message = await Message({
            chatId: chat,
            userId: user,
            messageContent: messageContent,
            time: time
        })

        console.log(message);

        message.save();
        if (message != null) {
            res.status(201).json({isFailed: false, message});
        } else {
            res.status(201).json({isFailed: true});
        }

    } catch (err) {
        res.status(500).json({ error : err.message, })
    }
}

async function getMessages(req, res) {
    try {
        const { chatId } = req.query;
        console.log("Chat Id: ",chatId);
        const messagesFound = await Message.find({ chatId: chatId });

        let messages = [];

        for (let i = 0; i < messagesFound.length; i++) {
            const user = await User.findOne({_id: messagesFound[i].userId});
            if (user) {
                const profile = await Profile.findOne({userId: messagesFound[i].userId});
                messages.push({ message: messagesFound[i], name: profile.name });
            } else {
                console.log("User not found for userId:", messagesFound[i].userId);
            }
        }

        if (messagesFound) {
            res.json({isFailed: false, messages});
        } else {
            res.json({isFailed: true});
        }
    } catch (err) {
        console.log("err");
        res.status(500).json({ error : err.message })
    }
}

async function isExist(userId1, userId2) {
    const chat = await Chat.findOne({ $or: [{ 'participants.0': userId1, 'participants.1' : userId2 }, { 'participants.0': userId2, 'participants.1': userId1 }] });
    if (chat !== null) {
        return true;
    } else {
        return false;
    }
}

async function deleteChat(userId1, userId2) {
    try {
        Chat.deleteOne({ $or: [{ 'participants.0': userId1, 'participants.1' : userId2 }, { 'participants.0': userId2, 'participants.1': userId1 }] })
        .then(()=>{
            return true;
        })
        .catch((err)=>{
            return false;
        })
    } catch (err) {
        return false;
    }
}

async function getRoom(req, res) {
    try {
        const { userId1, userId2 } = req.query;
        const chat = await Chat.findOne({ $or: [{ 'participants.0': userId1, 'participants.1' : userId2 }, { 'participants.0': userId2, 'participants.1': userId1 }] });
        if (chat !== null) {
            res.status(201).json({message: true, chat});
        } else {
            res.status(201).json({message: false});
        }
    } catch (err) {
        res.status(500).json({ error : err.message, })
    }
}

module.exports = {
    createMessage,
    getMessages
}