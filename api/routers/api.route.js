const express = require("express");

// middleware
const { authMiddleware } = require("../middlewares/auth.middleware"),
	{
		decentralization,
	} = require("../../middlewares/decentralization.middleware");

const leaguesRoute = require("./league.route"),
	teamRoute = require("./team.route"),
	ruleRoute = require("./rule.route"),
	donorRoute = require("./donor.route"),
	refereeRoute = require("./referee.route");

// controller
const ctrler = require("../controllers/api.controller");

const router = express.Router();

router.use("/leagues", leaguesRoute);
router.use("/teams", teamRoute);
router.use("/rules", ruleRoute);
router.use("/donors", donorRoute);
router.use("/referees", refereeRoute);

router.use(authMiddleware, decentralization("manager"));

router.get("/", ctrler.infoAPI);

router.use(ctrler.notFound);

module.exports = router;
