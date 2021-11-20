const express = require("express");

const ctrler = require("../controllers/team.controller");

const { authMiddleware } = require("../middlewares/auth.middleware"),
	leagueMiddleware = require("../middlewares/league.middleware"),
	teamMiddleware = require("../middlewares/team.middleware");

const router = express.Router({ mergeParams: true });

router.use(authMiddleware, leagueMiddleware);

router.route("/").get(ctrler.getTeams).post(ctrler.createTeams);

router
	.route("/:team")
	.all(teamMiddleware)
	.get(ctrler.getTeam)
	.put(ctrler.updateTeam)
	.delete(ctrler.removeTeam);

module.exports = router;
