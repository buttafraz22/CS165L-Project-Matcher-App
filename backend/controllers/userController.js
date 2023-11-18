const User = require("../models/user");
const Role = require("../models/role");

async function createUser(req, res) {
    try {
        const {role, ...userData} = req.body;
        const roleFound = await Role.findOne({roleName: role});
        const userCompleteData = {...userData, role: roleFound};
        let message = '';

        if (!isUsernameUnique(userData.username)) {
            message = "Username already exist";
        } else if (!isUsernameUnique(userData.email)) {
            message = "Email already exist";
        } else {
            message = "User has been created";
        }

        const user = await User(userData);
        user.save();
        res.status(201).json({message})
    } catch (err) {
        res.status(500).json({ error : err.message, })
    }
}

async function updateUser(req, res) {
    try {
        const {id} = req.params;

        const {role, ...userData} = req.body;
        const roleFound = await Role.findOne({roleName: role});
        const userCompleteData = {...userData, role: roleFound};
        
        const updatedUser = await User.findByIdAndUpdate(id,userData,{ new: true });
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
        const deleteUser = await User.findByIdAndDelete(id);
        res.sendStatus(204);
    } catch (err) {
        res.status(500).json({ error : err.message })
    }
}

async function login(req, res) {
    try {
        const {username, password} = req.body;
        const userFound = await User.findOne({username, password});
        if (userFound) {
            res.json({isExist: true});
        } else {
            res.json({isExist: false});
        }
    } catch (err) {
        res.status(500).json({ error : err.message })
    }
}

async function isUsernameUnique(username) {
    const userFound = await User.findOne({username});
    if (userFound) {
        return false;
    }
    return true;
}

async function isEmailUnique(email) {
    const userFound = await User.findOne({email});
    if (userFound) {
        return false;
    }
    return true;
}

module.exports = {
    createUser,
    updateUser,
    getAllUsers,
    deleteUser,
    login
}