const express = require("express");
const User = require("../model/user.model");

const router = express.Router();

router.get("/", async (req, res) => {
	const userId = req.signedCookies.userId;
	let user;
	if (userId) user = await User.findOne({ _id: userId });
	res.render("public/home", { user });
});

module.exports = router;
