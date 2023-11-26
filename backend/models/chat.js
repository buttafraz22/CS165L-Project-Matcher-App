const mongoose = require("mongoose");
const User = require("./user");

const chatSchema = new mongoose.Schema({
    chatRoom: {
        type: Number,
    },
    participants: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    }],
    activeStatus: {
        type: Boolean,
        default: true,
    },
}, {timestamps:true});

module.exports = mongoose.model("Chat", chatSchema);