const User = require("../models/user");
const Role = require("../models/role");
const Profile = require("../models/profile");

// const fs = require('fs');
// const base64Img = require('base64-img');
// const path = require('path');

// const publicPath = path.join(__dirname, 'public');

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
        const { userId } = req.params;
        const profilesFound = await Profile.find({ userId: { $ne: userId } });
        const usersFound = await User.find({ _id: { $ne: userId } });
        const userFound = await User.findOne({ _id: userId });

        oppositeGenderProfiles = [];

        for (let i = 0; i < profilesFound.length; i++) {
            for (let j = 0; j < usersFound.length; j++) {
                if (profilesFound[i].userId.toString() == usersFound[j]._id.toString()) {
                    if (usersFound[j].gender != userFound.gender) {
                        oppositeGenderProfiles.push(profilesFound[i]);
                    }
                }
            }
        }

        if (profilesFound) {
            res.json({profilesFound: oppositeGenderProfiles, message: "Profile Found"});
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