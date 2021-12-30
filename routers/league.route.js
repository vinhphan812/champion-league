const express = require("express");

const ctrler = require("../controllers/league.controller");

const router = express.Router({ mergeParams: true });

router.use(ctrler.leagueMiddleware);

router.get("/", ctrler.getLeaguePage);

// matchs
router.route("/matchs/:match", ctrler.getMatch);

router.route("/matchs/:matchs/update", ctrler.updateMatch);

module.exports = router;
