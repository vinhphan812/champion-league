const express = require("express"),
	User = require("../model/user.model");

const {
		decentralization,
	} = require("../middlewares/decentralization.middleware"),
	{ authMiddleware } = require("../middlewares/auth.middleware");

const router = express.Router();

router.use(authMiddleware, decentralization("admin"));

router.get("/", async (req, res, next) => {
	res.locals.users = await User.find({});

	res.render("admin/home");
});

module.exports = router;
