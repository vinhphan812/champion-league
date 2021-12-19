const express = require("express");

const ctrler = require("../controllers/stadium.controller");

// const ruleMiddleware = require("../middlewares/stadiume.middleware");

const router = express.Router({ mergeParams: true });

router.route("/").post(ctrler.createStadium);

router
	.route("/:stadium")
	.all(ctrler.checkStadium)
	.put(ctrler.updateStadium)
	.delete(ctrler.removeStadium);

module.exports = router;
