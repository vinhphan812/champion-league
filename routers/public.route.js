const express = require("express");
const User = require("../model/user.model"),
	Team = require("../model/team.model"),
	Match = require("../model/match.model"),
	Player = require("../model/player.model"),
	Donor = require("../model/donor.model"),
	Referee = require("../model/referee.model");

const ctrler = require("../controllers/public.controller");

const router = express.Router();

router.use(async (req, res, next) => {
	const userId = req.signedCookies.userId;
	if (userId) res.locals.user = await User.findOne({ _id: userId });
	next();
});

router.get("/", ctrler.getHome);

router.get("/search", ctrler.searchPage);

// players
router.get("/players");

// teams
router.get("/teams", ctrler.getAllTeamPage);
router.get("/teams/:team", ctrler.getTeamPage);

module.exports = router;
