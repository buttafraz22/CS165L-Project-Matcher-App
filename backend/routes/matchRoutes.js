const express = require("express");
const router = express.Router();
const matchController = require("../controllers/matchController");

router.post("/matches", matchController.createMatch);
router.post("/is-matched", matchController.isMatched);
router.post("/un-match", matchController.deleteMatch);
router.get("/matched-profiles", matchController.matchedProfiles);

module.exports = router;