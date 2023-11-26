const User = require("../models/user");
const Match = require("../models/match");
const Profile = require("../models/profile");
const Chat = require("../models/chat");

async function createChat(user1, user2) {
    try {
        const exist = await isExist(user1._id, user2._id);
        if (!exist) {
            let users = [user1, user2];
            
            const chat = await Chat({chatRoom: Math.floor(Math.random() * 999) + 100, participants: users, activeStatus: true});
            console.log(chat);
            chat.save();
            if (chat != null) {
                return true;
            } else {
                return false;
            }
        } else {
            return false;
        }

    } catch (err) {
        return false;
    }
}

async function isExist(userId1, userId2) {
    const chat = await Chat.findOne({ $or: [{ 'participants.0': userId1, 'participants.1' : userId2 }, { 'participants.0': userId2, 'participants.1': userId1 }] });
    if (chat !== null) {
        return true;
    } else {
        return false;
    }
}

async function isMatched(req, res) {
    try {
        const {userId1, userId2} = req.body;
        const match = await Match.findOne({ $or: [{ userId1, userId2 }, { userId1: userId2, userId2: userId1 }] });
        if (match !== null) {
            res.status(201).json({message: true});
        } else {
            res.status(201).json({message: false});
        }
    } catch (err) {
        res.status(500).json({ error : err.message, })
    }
}

async function deleteChat(userId1, userId2) {
    try {
        Chat.deleteOne({ $or: [{ 'participants.0': userId1, 'participants.1' : userId2 }, { 'participants.0': userId2, 'participants.1': userId1 }] })
        .then(()=>{
            return true;
        })
        .catch((err)=>{
            return false;
        })
    } catch (err) {
        return false;
    }
}

async function matchedProfiles(req, res) {
    try {
        const { userId } = req.query;
        let profiles = [];
        let profile = {};
        const matches = await Match.find({ $or: [{ userId1: userId}, { userId2: userId }] });
        for (let i = 0; i < matches.length; i++) {
            if (matches[i].userId1.toString() !== userId) {
                profile = await getProfile(matches[i].userId1.toString());
            } else {
                profile = await getProfile(matches[i].userId2.toString());
            }
            profiles.push(profile)
        }
        if (matches !== null) {
            res.status(201).json({message: true, profiles});
        } else {
            res.status(201).json({message: false});
        }
    } catch (err) {
        res.status(500).json({ error : err.message, })
    }
}

async function getProfile(userId) {
    try {
        const profile = await Profile.findOne({userId})
        if (profile) {
            return profile;
        } else {
            return {isFailed: true}
        }
    } catch(err){
        console.log(err);
    }
}


module.exports = {
    createChat,
    deleteChat
}