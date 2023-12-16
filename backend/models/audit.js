const mongoose = require("mongoose");
const User = require("../models/user");

const auditSchema = new mongoose.Schema({
    objectId: {
        type: mongoose.Schema.Types.ObjectId,
        refPath: 'type',
    },
    oldData: {
        type: mongoose.Schema.Types.Mixed,
    },
    newData: {
        type: mongoose.Schema.Types.Mixed,
    },
    activeStatus: {
        type: Boolean,
        default: true,
    },
}, {timestamps:true});

module.exports = mongoose.model("Audit", auditSchema);