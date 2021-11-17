const express = require("express"),
	User = require("../model/user.model");

const {
		decentralization,
	} = require("../middlewares/decentralization.middleware"),
	{ authMiddleware } = require("../middlewares/auth.middleware");

const router = express.Router();

router.get(
	"/",
	authMiddleware,
	decentralization("admin"),
	async (req, res, next) => {
		const userId = req.signedCookies.userId;
		const user = await User.findOne({ _id: userId });
		res.render("admin/home", { user });
	}
);

module.exports = router;
