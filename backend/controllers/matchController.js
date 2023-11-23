const User = require("../models/user");
const Match = require("../models/match")

async function createMatch(req, res) {
    try {
        const {userId1, userId2} = req.body;

        const user1 = await User.findOne({_id: userId1});
        const user2 = await User.findOne({_id: userId2});

        console.log(user1);
        console.log(user2);

        const match = await Match({userId1: user1, userId2: user2, activeStatus: true});
        match.save();
        if (match != null) {
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