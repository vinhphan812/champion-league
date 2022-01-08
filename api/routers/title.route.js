const express = require("express");
const router = express.Router();

const ctrler = require("../controllers/title.controller");

router.route("/").get(ctrler.getTitles).post(ctrler.createTitle);

router
	.route("/:title")
	.all(ctrler.titleMiddlware)
	.get(ctrler.getTitle)
	.post(ctrler.tagFor)
	.put(ctrler.updateTitle)
	.delete(ctrler.removeTitle);

module.exports = router;
