const User = require("../models/user");
const Match = require("../models/match");
const Profile = require("../models/profile");
const chatController = require("./chatController");

async function createMatch(req, res) {
    try {
        const {userId1, userId2} = req.body;
        const exist = await isExist(userId1, userId2);
        if (!exist) {
            const user1 = await User.findOne({_id: userId1});
            const user2 = await User.findOne({_id: userId2});

            chatController.createChat(user1, user2);
            
            const match = await Match({userId1: user1, userId2: user2, activeStatus: true});
            match.save();
            if (match != null) {
                const message = 'You are matched with ' + user2.username + '.';
                res.status(201).json({message});
            } else {
                let err = 'There is a error.';
                res.status(201).json({err});
            }
        } else {
            const message = 'Already matched.';
            res.status(201).json({message});
        }

    } catch (err) {
        res.status(500).json({ error : err.message, })
    }
}

async function isExist(userId1, userId2) {
    const match = await Match.findOne({ $or: [{ userId1, userId2 }, { userId1: userId2, userId2: userId1 }] });
    if (match !== null) {
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

async function deleteMatch(req, res) {
    try {
        const {userId1, userId2} = req.body;
        chatController.deleteChat(userId1, userId2);
        Match.deleteOne({ $or: [{ userId1, userId2 }, { userId1: userId2, userId2: userId1 }] })
        .then(()=>{
            res.status(201).json({message: true});
        })
        .catch((err)=>{
            res.status(201).json({message: false});
        })
    } catch (err) {
        res.status(500).json({ error : err.message, })
    }
}

async function matchedProfiles(req, res) {
    try {
        const { userId , search } = req.query;
        let profiles = [];
        let profile = null;
        const matches = await Match.find({ $or: [{ userId1: userId}, { userId2: userId }] });
        for (let i = 0; i < matches.length; i++) {
            if (matches[i].userId1.toString() !== userId) {
                if (search.length > 0) {
                    profile = await getSearchedProfile(matches[i].userId1.toString(), search);
                } else {
                    profile = await getProfile(matches[i].userId1.toString());
                }
            } else {
                if (search.length > 0) {
                    profile = await getSearchedProfile(matches[i].userId2.toString(), search);
                } else {
                    profile = await getProfile(matches[i].userId2.toString());
                }
            }
            if (profile !== null) {
                profiles.push(profile)
            }
        }
        if (profiles.length > 0) {
            res.status(201).json({isFailed: false, profiles});
        } else {
            res.status(201).json({isFailed: true});
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

async function getSearchedProfile(userId, search) {
    try {
        const profile = await Profile.findOne({userId, name: { $regex: new RegExp(search, 'i') }})
        if (profile) {
            return profile;
        } else {
            return null;
        }
    } catch(err){
        console.log(err);
    }
}


module.exports = {
    createMatch,
    isMatched,
    deleteMatch,
    matchedProfiles
}