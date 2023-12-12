const mongoose = require("mongoose");

const auditSchema = new mongoose.Schema({
    objectId: {
        type: mongoose.Schema.Types.ObjectId,
        refPath: 'type',
    },
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
}, {timestamps:true});

module.exports = mongoose.model("Audit", auditSchema);