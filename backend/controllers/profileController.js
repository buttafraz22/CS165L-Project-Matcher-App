const User = require("../models/user");
const Role = require("../models/role");
const Profile = require("../models/profile")

async function createProfile(req, res) {
    try {
        const profilePicture = req.file;

        const formData = JSON.parse(req.body.profileData);

        const {username, profileType: roleName, ...profileData} = formData;

        const userId = await User.findOne({username});
        const profileType = await Role.findOne({roleName: `${roleName.charAt(0).toUpperCase()}${roleName.slice(1)}`});

        const profileCompleteData = {
            ...profileData,
            profileType,
            userId,
            profilePicture,
        }

        // Profile(profileCompleteData)
        // .then(user => {
        //     if (user !== null) {
        //     user.save()
        //         // .then(() => {
        //         //     console.log("I am in");
        //         //     let message = 'Profile has been created.';
        //         //     res.status(201).json({ message });
        //         // })
        //         // .catch(err => {
        //         //     res.status(500).json({ error: err.message });
        //         // });
        //     } else {
        //         let errMessage = 'There is an error.';
        //         res.status(400).json({ error: errMessage });
        //     }
        // })
        // .catch(err => {
        //     res.status(500).json({ error: err.message });
        // });
        const profile = await Profile(profileCompleteData);
        profile.save();
        if (profile != null) {
            const message = 'Profile has been created.';
            res.status(201).json({message, ...userId._id});
        } else {
            let err = 'There is a error.';
            res.status(201).json({err});
        }
    } catch (err) {
        console.log("I am in");
        res.status(500).json({ error : err.message, })
    }
}

async function getProfile(req, res) {
    try {
        const {userId} = req.params;
        console.log(userId);
        const profileFound = await Profile.findOne({userId});
        if (profileFound) {
            res.json({profileFound, message: "Profile Found"});
        } else {
            res.json({isExist: false});
        }
    } catch (err) {
        res.status(500).json({ error : err.message })
    }
}

async function getAllProfiles(req, res) {
    try {
        const {userId} = req.params;
        console.log(userId);
        const profilesFound = await Profile.find({ userId: { $ne: userId } });
        if (profilesFound) {
            res.json({profilesFound, message: "Profile Found"});
        } else {
            res.json({isExist: false});
        }
    } catch (err) {
        res.status(500).json({ error : err.message })
    }
}

module.exports = {
    createProfile,
    getProfile,
    getAllProfiles
}