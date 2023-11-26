const mongoose = require("mongoose");
const Chat = require("./chat");
const User = require("./user");

const messageSchema = new mongoose.Schema({
    chatId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Chat',
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    time: {
        type: Date,
    },
    messageContent: {
        type: String,
    },
    activeStatus: {
        type: Boolean,
        default: true,
    },
}, {timestamps:true});

module.exports = mongoose.model("Message", messageSchema);