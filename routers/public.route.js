const express = require("express");
const User = require("../model/user.model");

const ctrler = require("../controllers/public.controller");

const router = express.Router();

router.use(async (req, res, next) => {
	const userId = req.signedCookies.userId;
	if (userId) res.locals.user = await User.findOne({ _id: userId });
	next();
});

router.get("/", ctrler.getHome);

//rule
router.get("/rules", ctrler.getRules);

router.get("/search", ctrler.searchPage);

// leagues
router.get("/leagues/:league", ctrler.getLeague);
router.get("/leagues/:league/matchs/:match", ctrler.getMatch);

// teams
router.get("/teams", ctrler.getAllTeamPage);
router.get("/teams/:team", ctrler.getTeamPage);

// players
router.get("/teams/:team/players/:player", ctrler.getPlayer);

// referees
router.get("/referees/:referee", ctrler.getReferee);

module.exports = router;
