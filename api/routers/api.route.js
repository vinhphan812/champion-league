const express = require("express");

// middleware
const { authMiddleware } = require("../middlewares/auth.middleware"),
	{
		decentralization,
	} = require("../../middlewares/decentralization.middleware");

const leaguesRoute = require("./league.route"),
	teamRoute = require("./team.route"),
	ruleRouter = require("./rule.route"),
	donorRouter = require("./donor.route");

// controller
const ctrler = require("../controllers/api.controller");

const router = express.Router();

router.use("/leagues", leaguesRoute);
router.use("/teams", teamRoute);
router.use("/rules", ruleRouter);
router.use("/donors", donorRouter);

router.use(authMiddleware, decentralization("manager"));

router.get("/", ctrler.infoAPI);

router.use(ctrler.notFound);

module.exports = router;
