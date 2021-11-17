const express = require("express");

const { authMiddleware } = require("../middlewares/auth.middleware");

const router = express.Router();

router.use(authMiddleware);

router.get("/", function (req, res) {
	res.send("USER");
});

module.exports = router;
