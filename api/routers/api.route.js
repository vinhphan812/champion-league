const express = require("express");

const router = express.Router();

router.get("/", function (req, res) {
	res.json({
		success: true,
		content: "this is a api champion league",
	});
});

module.exports = router;
