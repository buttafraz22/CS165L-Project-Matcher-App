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

        const message = await Message({
            chatId: chat,
            userId: user,
            messageContent: messageContent,
            time: time
        })

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
        deleteOldMessages();
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

async function deleteOldMessages() {
    try {
        const sevenDaysAgo = new Date();
        sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

        // Delete messages older than 7 days
        await Message.deleteMany({ createdAt: { $lt: sevenDaysAgo } });
        console.log('Old messages deleted successfully.');
    } catch (error) {
        console.error('Error deleting old messages:', error);
    }
};

module.exports = {
    createMessage,
    getMessages
}