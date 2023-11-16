const User = require("../models/user");

async function createUser(req, res) {
    try {
        console.log(req.body);
        const user = await User(req.body);
        user.save();
        res.status(201).json(user)
    } catch (err) {
        res.status(500).json({ error : err.message, })
    }
}

async function updateUser(req, res) {
    try {
        const {id} = req.params;
        const updatedUser = await User.findByIdAndUpdate(id,req.body,{ new: true });
        res.json(updatedUser)
    } catch (err) {
        res.status(500).json({ error : err.message })
    }
}

async function getAllUsers(req, res) {
    try {
        const users = await User.find();
        res.json(users);
    } catch (err) {
        res.status(500).json({ error : err.message, });
    }
}

async function deleteUser(req, res) {
    try {
        const {id} = req.params;
        const deleteUser = await User.findByIdAndRemove(id);
        res.sendStatus(204);
    } catch (err) {
        res.status(500).json({ error : err.message })
    }
}

module.exports = {
    createUser,
    updateUser,
    getAllUsers,
    deleteUser
}