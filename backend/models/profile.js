const mongoose = require("mongoose");
const Role = require("./role");
const User = require("./user");

const profileSchema = new mongoose.Schema({
    name: {
        type: String,
    },
    profilePicture: {
        fieldname: String,
        originalname: String,
        encoding: String,
        mimetype: String,
        destination: String,
        filename: String,
        path: String,
        size: Number,
    },
    relationshipStatus: {
        type: String,
        enum: ['single', 'divorced', 'married'],
        default: 'married'
    },
    aboutMe: {
        type: String,
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    profileType: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Role',
    },
    activeStatus: {
        type: Boolean,
        default: true,
    },
    image: {
        type: String,
    }
}, {timestamps:true});

module.exports = mongoose.model("Profile", profileSchema);