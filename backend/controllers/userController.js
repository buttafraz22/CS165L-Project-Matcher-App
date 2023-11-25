const User = require("../models/user");
const Role = require("../models/role");
const bcrypt = require('bcrypt');
const saltRounds = 10;

async function createUser(req, res) {
    try {
        const {password, ...remainingData} = req.body;
        let message = '';

        const usernameCheck = await isUsernameUnique(remainingData.username);
        const emailCheck = await isEmailUnique(remainingData.email);

        if (!usernameCheck) {
            message = "Username already exist";
        } else if (!emailCheck) {
            message = "Email already exist";
        } else {
            message = "User has been created";
            bcrypt.hash(password, saltRounds, async function(err, hash) {
                const user = await User({...remainingData, password: hash});
                user.save();
            });
        }
        res.status(201).json({message});
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
        const userFound = await User.findOne({username});
        bcrypt.compare(password, userFound.password, async function(err, result) {
            if (result) {       
                res.json({userFound});
            } else {
                res.json({isExist: false});
            }
        });
    } catch (err) {
        res.status(500).json({ error : err.message })
    }
}

async function isUsernameUnique(username) {
    const userFound = await User.findOne({username});
    console.log(userFound);
    if (userFound === null) {
        return true;
    }
    console.log("Username exist");
    return false;
}

async function isEmailUnique(email) {
    const userFound = await User.findOne({email});
    console.log(userFound);
    if (userFound === null) {
        return true;
    }
    console.log("Email exist");
    return false;
}

module.exports = {
    createUser,
    updateUser,
    getAllUsers,
    deleteUser,
    login
}