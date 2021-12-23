const express = require("express");

const ctrler = require("../controllers/referee.controller");

const refereeMiddleware = require("../middlewares/referee.middleware");

const router = express.Router({ mergeParams: true });

router.get("/", ctrler.getReferees);

router
	.route("/:referee")
	.all(refereeMiddleware)
	.get(ctrler.getReferee)
	.put(ctrler.updateReferee)
	.delete(ctrler.removeReferee);

module.exports = router;
