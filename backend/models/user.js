const mongoose = require("mongoose");
const Role = require("./role");

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true,
        validate: {
            validator: (value) => value.length >= 8,
            message: 'Password must be at least 8 characters long'
        }
    },
    email: {
        type: String,
        unique: true
    },
    age: {
        type: Number,
        min: 18,
        max: 70,
        required: true
    },
    gender: {
        type: String,
        enum: ['male', 'female'],
        required: true
    },
}, {timestamps:true});

module.exports = mongoose.model("User", userSchema);