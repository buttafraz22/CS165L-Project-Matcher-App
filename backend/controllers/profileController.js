const User = require("../models/user");
const Role = require("../models/role");
const Profile = require("../models/profile")

async function createProfile(req, res) {
    try {
        console.log("I am in");
        // const {profileType, username, ...profileData} = req.body;
        // const roleFound = await Role.findOne({roleName: profileType});
        // const userFound = await User.findOne({username: username});
        // const profleCompleteData = {...profileData, role: roleFound, userId: userFound};
        // const user = await Profile(profleCompleteData);
        // user.save();
        let message = 'Profile has been created';
        res.status(201).json({message})
    } catch (err) {
        res.status(500).json({ error : err.message, })
    }
}

module.exports = {
    createProfile
}