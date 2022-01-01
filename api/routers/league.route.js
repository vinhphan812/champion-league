const express = require("express");

const { authMiddleware } = require("../middlewares/auth.middleware"),
	leagueMiddleware = require("../middlewares/league.middleware");

const ctrler = require("../controllers/league.controller");

const matchRoute = require("./match.route");

const { createLeague } = require("../validation/api.validation");

const router = express.Router();

router.use(authMiddleware);

router.use("/:league/matchs", leagueMiddleware, matchRoute);

router.use("/:league/joins", leagueMiddleware, ctrler.getTeamsJoinLeague);

router
	.route("/")
	.get(ctrler.getLeagues)
	.post(createLeague, ctrler.createLeague);

router
	.route("/:league")
	.all(leagueMiddleware)
	.get(ctrler.getLeague)
	.put(ctrler.updateLeague)
	.delete(ctrler.removeLeague); // remove league => remove all team in league and all match in league

module.exports = router;
