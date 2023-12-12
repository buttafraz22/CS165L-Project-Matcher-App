const mongoose = require("mongoose");
const User = require("./user");

const logSchema = new mongoose.Schema({
    errorType: {
        type: String,
    },
    fileName: {
        type: String,
    },
    columnNum: {
        type: Number,
    },
    rowNumber: {
        type: Number,
    },
    activeStatus: {
        type: Boolean,
        default: true,
    },
}, {timestamps:true});

module.exports = mongoose.model("Log", logSchema);