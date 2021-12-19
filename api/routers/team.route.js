const express = require("express");

const ctrler = require("../controllers/team.controller");

const { authMiddleware } = require("../middlewares/auth.middleware"),
	teamMiddleware = require("../middlewares/team.middleware"),
	{ createTeam } = require("../validation/api.validation");

const teamRoute = require("./player.route.js"),
	stadiumRoute = require("./stadium.route");

const router = express.Router({ mergeParams: true });

router.use(authMiddleware);

router.use("/:team/players", teamRoute);
router.use("/:team/stadiums", stadiumRoute);

router.route("/").get(ctrler.getTeams).post(createTeam, ctrler.createTeams);

router
	.route("/:team")
	.all(teamMiddleware)
	.get(ctrler.getTeam)
	.put(ctrler.updateTeam)
	.delete(ctrler.removeTeam);

module.exports = router;
