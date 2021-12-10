const express = require("express"),
	User = require("../model/user.model");

const {
		decentralization,
	} = require("../middlewares/decentralization.middleware"),
	{ authMiddleware } = require("../middlewares/auth.middleware");

const router = express.Router();

// router.use();

router.get(
	"/",
	authMiddleware,
	decentralization("admin"),
	async (req, res, next) => {
		const user = await User.findOne({ _id: req.signedCookies.userId });

		res.render("admin/home");
	}
);

module.exports = router;
