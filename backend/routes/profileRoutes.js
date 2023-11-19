const express = require("express");
const router = express.Router();
const profileController = require("../controllers/profileController");

router.post("/profiles", profileController.createProfile);

module.exports = router;