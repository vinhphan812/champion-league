const express = require("express");

const { authMiddleware } = require("../middlewares/auth.middleware"),
	leagueMiddleware = require("../middlewares/league.middleware");

const ctrler = require("../controllers/league.controller");

const teamRoute = require("./team.route");

const router = express.Router();

router.use(authMiddleware);

router.use("/:league/teams", teamRoute);

router.route("/").get(ctrler.getLeagues).post(ctrler.createLeague);

router
	.route("/:league")
	.all(leagueMiddleware)
	.get(ctrler.getDetailLeague)
	.put(ctrler.updateLeague)
	.delete(ctrler.removeLeague);

module.exports = router;
