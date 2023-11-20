const express = require("express");
const router = express.Router();
const profileController = require("../controllers/profileController");
const upload = require('../models/multerSetup')

router.post("/profiles", upload.single('file'), profileController.createProfile);

module.exports = router;