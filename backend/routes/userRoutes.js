const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

router.post("/users", userController.createUser);
router.get("/users", userController.getAllUsers);
router.delete("/users/:id", userController.deleteUser);
router.put("/users/:id", userController.updateUser);
router.get("/login", userController.login);

module.exports = router;