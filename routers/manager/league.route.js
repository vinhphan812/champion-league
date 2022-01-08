const express = require("express");

const ctrler = require("../../controllers/league.controller");

const router = express.Router({ mergeParams: true });

router.use(ctrler.leagueMiddleware);

router.get("/", ctrler.getLeaguePage);

router.route("/report").get(ctrler.getReportPage).post(ctrler.postReportPage);

// matchs
// matchs middleware
router.use("/matchs/:match", ctrler.matchMiddleware);

router.get("/matchs/:match", ctrler.getMatch);
router
	.route("/matchs/:match/update")
	.get(ctrler.updateMatchPage)
	.post(ctrler.postUpdateMatch);

module.exports = router;
