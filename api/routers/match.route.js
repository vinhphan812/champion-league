const express = require("express");

const ctrler = require("../controllers/match.controller");

const { authMiddleware } = require("../middlewares/auth.middleware"),
	matchMiddleware = require("../middlewares/match.middleware");

const { createMatch, updateMatch } = require("../validation/api.validation");

const router = express.Router({ mergeParams: true });

router.use(authMiddleware);

router.route("/").get(ctrler.getMatchs).post(createMatch, ctrler.createMatch);

router.use("/:match", matchMiddleware);

router
	.route("/:match")
	.get(ctrler.getMatch)
	.put(updateMatch, ctrler.updateMatch)
	.delete(ctrler.removeMatch);

router.get("/:match/details", ctrler.getMatchDetails);

module.exports = router;
