const express = require("express");

const {
		loginPage,
		postLogin,
		registerPage,
		postRegister,
		forgotPage,
		postForgot,
	} = require("../Controllers/auth.controller"),
	{
		registerValidation,
		loginValidation,
	} = require("../validation/auth.validation");

const router = express.Router();

router.route("/login").get(loginPage).post(loginValidation, postLogin);

router
	.route("/register")
	.get(registerPage)
	.post(registerValidation, postRegister);

router.get("/logout", function (req, res, next) {
	res.clearCookie("userId").redirect("/");
});

router.route("/forgot").get(forgotPage).post(postForgot);

module.exports = router;
