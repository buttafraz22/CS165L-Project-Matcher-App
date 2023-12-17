const mongoose = require("mongoose");
const User = require("./user");

const reportSchema = new mongoose.Schema({
    reporterUserId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    reportedUserId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    reportType: {
        type: String,
        enum: [
            'profileViolation',
            'harassment',
            'impersonation',
            'scamFraud',
            'inappropriateContent',
            'technicalIssue',
        ],
    },
    reportContent: {
        type: String
    },
    activeStatus: {
        type: Boolean,
        default: true,
    }
}, {timestamps:true});

module.exports = mongoose.model("Report", reportSchema);