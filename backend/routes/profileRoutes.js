const express = require("express");
const router = express.Router();
const profileController = require("../controllers/profileController");
const upload = require('../models/multerSetup')

router.post("/profiles", upload.single('file'), profileController.createProfile);
router.get("/profile/:userId", profileController.getProfile);
router.get("/profiles", profileController.getAllProfiles);
router.delete("/profile/:userId", profileController.deleteProfile);
router.patch("/profile/:userId", profileController.updateProfile);

module.exports = router;