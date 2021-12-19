const express = require("express");
const User = require("../model/user.model"),
	Team = require("../model/team.model"),
	Match = require("../model/match.model"),
	Player = require("../model/player.model"),
	Donor = require("../model/donors.model");

const router = express.Router();

router.use(async (req, res, next) => {
	const userId = req.signedCookies.userId;
	if (userId) res.locals.user = await User.findOne({ _id: userId });
	next();
});

router.get("/", async (req, res) => {
	res.locals.teams = await Team.find({});
	res.locals.donors = await Donor.find({});
	res.locals.players = await Player.find({});
	res.locals.matchs = await Match.find({});

	res.render("public/home");
});

router.get("/search", async (req, res) => {
	res.render("public/search");
});

// players
router.get("/players");

// teams
router.get("/teams", async (req, res) => {
	res.locals.teams = await Team.find({});
	res.render("public/teams");
});
router.get("/teams/:team", async (req, res, next) => {
	const { team } = req.params;

	if (team.length !== 24) return next();

	const data = await Team.findOne({ _id: team }).populate("stadium");

	if (!data) return next();

	res.locals = {
		...res.locals,
		team: data,
		scripts: ["/public/js/team.js"],
	};

	res.render("team");
});

module.exports = router;
