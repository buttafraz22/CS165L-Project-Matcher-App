const mongoose = require("mongoose");
const Role = require("./role");
const User = require("./user");

const profileSchema = new mongoose.Schema({
    name: {
        type: String,
    },
    profilePicture: {
        type: String,
    },
    relationshipStatus: {
        type: String,
        enum: ['single', 'married'],
    },
    aboutMe: {
        type: String,
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    profileType: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Role',
        enum: ['partner', 'parent'],
    }
}, {timestamps:true});

module.exports = mongoose.model("Profile", profileSchema);