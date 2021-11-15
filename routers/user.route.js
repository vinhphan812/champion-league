const express = require("express");

const router = express.Router();

// router.use();

router.get("/", function (req, res) {
	res.send("USER");
});

module.exports = router;
