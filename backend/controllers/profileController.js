const User = require("../models/user");
const Role = require("../models/role");
const Profile = require("../models/profile");
const Match = require("../models/match");
const Chat = require("../models/chat");
const Message = require("../models/message");
const logController = require("./logController");
const auditController = require("./auditController");

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
        logController.createLog(err);
        res.status(500).json({ error : err.message, })
    }
}

async function getProfile(req, res) {
    try {
        const {userId} = req.params;
        const profileFound = await Profile.findOne({userId});
        if (profileFound) {
            res.json({profileFound, message: "Profile Found"});
        } else {
            res.json({isExist: false});
        }
    } catch (err) {
        logController.createLog(err);
        res.status(500).json({ error : err.message })
    }
}

async function deleteProfile(req, res) {
    try {
        const {userId} = req.params;
        const deletedProfile = await Profile.deleteOne({userId});
        const deletedUser = await User.deleteOne({_id: userId});
        const deletedMatch = await Match.deleteMany({ $or: [{ userId1: userId }, { userId2: userId }] });
        const chat = await Chat.findOne({$or: [
            { 'participants.0': userId },
            { 'participants.1': userId }
        ]});
        const deletedChat = await Chat.deleteMany({ $or: [
            { 'participants.0': userId },
            { 'participants.1': userId }
        ]});
        console.log(chat);
        if (chat !== null) {
            const deleteMessages = await Message.deleteMany({ chatId: chat._id });
        }
        if (deletedProfile) {
            res.json({message: "Profile Deleted"});
        } else {
            res.json({isExist: false});
        }
    } catch (err) {
        logController.createLog(err);
        res.status(500).json({ error : err.message })
    }
}

async function getAllProfiles(req, res) {
    try {
        const { userId , minAge , maxAge } = req.query;
        const profilesFound = await Profile.find({ userId: { $ne: userId } });
        const usersFound = await User.find({ _id: { $ne: userId }, age: {$gte: minAge, $lte: maxAge}});
        const userFound = await User.findOne({ _id: userId });
        const currentProfile = await Profile.findOne({ userId: userId });
        const profileRole = await Role.findOne({ _id: currentProfile.profileType });

        let profiles = [];

        for (let i = 0; i < profilesFound.length; i++) {
            for (let j = 0; j < usersFound.length; j++) {
                if (profilesFound[i].userId.toString() == usersFound[j]._id.toString()) {
                    if (profileRole.roleName === 'Partner') {
                        const profile = await Profile.findOne({ userId: usersFound[j]._id });
                        const role = await Role.findOne({ _id: profile.profileType });
                        if (role.roleName !== "Parent" && usersFound[j].gender != userFound.gender) {
                            profiles.push(profilesFound[i]);
                        }
                    } else {
                        const profile = await Profile.findOne({ userId: usersFound[j]._id });
                        const role = await Role.findOne({ _id: profile.profileType });
                        if (role.roleName !== "Parent") {
                            profiles.push(profilesFound[i]);
                        }
                    }
                }
            }
        }

        if (profilesFound) {
            res.json({profilesFound: profiles, message: "Profile Found"});
        } else {
            res.json({isExist: false});
        }
    } catch (err) {
        logController.createLog(err);
        res.status(500).json({ error : err.message })
    }
}

async function updateProfile(req, res) {
    try {
        const {userId} = req.params;
        const object = await Profile.findOne({userId: userId});
        const oldProfile = await Profile.findOne({userId: userId});
        const profileUpdated = await Profile.updateOne(
            {userId: userId},
            {$set: req.body},
        );
        const newProfile = await Profile.findOne({userId: userId});
        auditController.createAudit(object, oldProfile, newProfile);
        if (profileUpdated) {
            res.json({profileUpdated: newProfile, message: "Profile Updated"});
        } else {
            res.json({isExist: false});
        }
    } catch (err) {
        logController.createLog(err);
        res.status(500).json({ error : err.message })
    }
}

module.exports = {
    createProfile,
    getProfile,
    getAllProfiles,
    deleteProfile,
    updateProfile
}