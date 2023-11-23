const User = require("../models/user");
const Match = require("../models/match")

async function createMatch(req, res) {
    try {
        const {userId1, userId2} = req.body;

        const {username, profileType: roleName, ...profileData} = formData;

        const user1 = await User.findOne({_id: userId1});
        const user2 = await User.findOne({_id: userId2});

        const match = await Match({userId1: user1, userId2: user2});
        match.save();
        if (profile != null) {
            const message = 'You are matched with ' + user2.username;
            res.status(201).json({message});
        } else {
            let err = 'There is a error.';
            res.status(201).json({err});
        }
    } catch (err) {
        console.log("I am in");
        res.status(500).json({ error : err.message, })
    }
}

module.exports = {
    createMatch,
}