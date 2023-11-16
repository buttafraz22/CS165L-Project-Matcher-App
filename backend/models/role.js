const mongoose = require("mongoose");
const immutablePlugin = require('mongoose-immutable');

const roleSchema = new mongoose.Schema({
    roleName: String,
    desc: String
}, {timestamps:true});

roleSchema.plugin(immutablePlugin);

module.exports = mongoose.model("Role", roleSchema);

// const role1 = Role({
//     roleName: "Partner",
//     desc: "Partners in the matchmaking system enjoy standalone access for their personal matchmaking pursuits. Moreover, they have the added functionality to actively participate in helping others find suitable matches within the system."
// });

// const role2 = Role({
//     roleName: "Parent",
//     desc: "Parents in the system have the authority to find a match for any user. However, it's important to note that while logged in as a parent, they cannot act as intermediaries in finding a match for someone else, ensuring a distinct user experience for each role."
// });