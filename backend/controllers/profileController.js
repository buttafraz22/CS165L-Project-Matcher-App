const User = require("../models/user");
const Role = require("../models/role");
const Profile = require("../models/profile")

async function createProfile(req, res) {
    try {
        console.log("I am in");
        console.log(req.file);
        console.log(req.body);

        const profilePicture = req.file;

        const formData = JSON.parse(req.body.profileData);
        console.log(formData);

        const {username, profileType: roleName, ...profileData} = formData;

        console.log("Role Name: ", roleName);

        const userId = await User.findOne({username});
        const profileType = await Role.findOne({roleName: `${roleName.charAt(0).toUpperCase()}${roleName.slice(1)}`});

        const profileCompleteData = {
            ...profileData,
            profileType,
            userId,
            profilePicture,
        }

        console.log(profileCompleteData);
        const user = await Profile(profileCompleteData);
        user.save();
        if (user != null) {
            let message = 'Profile has been created.';
            res.status(201).json({message});
        } else {
            let err = 'There is a error.';
            res.status(201).json({err});
        }
    } catch (err) {
        res.status(500).json({ error : err.message, })
    }
}

module.exports = {
    createProfile
}