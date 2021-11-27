const express = require("express");

// middleware
const { authMiddleware } = require("../middlewares/auth.middleware"),
	{
		decentralization,
	} = require("../../middlewares/decentralization.middleware");

const leaguesRoute = require("./league.route");
// controller
const ctrler = require("../controllers/api.controller");

const router = express.Router();

router.use("/leagues", leaguesRoute);

router.use(authMiddleware, decentralization("manager"));

router.get("/", ctrler.infoAPI);

// router
// 	.route("/leagues/:league/teams")
// 	.get(ctrler.getTeams)
// 	.post(ctrler.createTeam);

// router.route("/leagues/:league/teams/:team").get().put().delete();

// router.route("/teams/:team/player/:id").get().post().put().delete();

// router.route("/leagues/:league/match").get().post();

// router.route("/leagues/:league/match:match").get().put().delete();

router.use(ctrler.notFound);

module.exports = router;
