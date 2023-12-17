const User = require("../models/user");
const Report = require("../models/report");
const logController = require("./logController");

async function createReport(req, res) {
    try {
        const {reporterUser, reportedUser, reportType, reportContent} = req.body;

        const reporterUserId = await User.findOne({_id: reporterUser});
        const reportedUserId = await User.findOne({_id: reportedUser});

        const report = await Report.create({
            reporterUserId,
            reportedUserId,
            reportType,
            reportContent
        })
        
        res.status(201).json({isFailed: false, message: "Report has been submitted"});
    } catch (err) {
        logController.createLog(err);
        res.status(500).json({ error : err.message, })
    }
}

module.exports = {
    createReport,
}