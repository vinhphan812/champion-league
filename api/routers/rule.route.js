const express = require("express");

const ctrler = require("../controllers/rule.controller");

const ruleMiddleware = require("../middlewares/rule.middleware");

const router = express.Router({ mergeParams: true });

router.route("/").get(ctrler.getRules).post(ctrler.getRules);

router
	.route("/:rule")
	.all(ruleMiddleware)
	.get(ctrler.getRule)
	.put(ctrler.updateRule)
	.delete(ctrler.removeRule);

module.exports = router;
