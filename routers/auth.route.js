const express = require("express");

const {
		loginPage,
		postLogin,
		forgotPage,
		postForgot,
	} = require("../controllers/auth.controller"),
	{ loginValidation } = require("../validations/auth.validation");

const router = express.Router();

router.route("/login").get(loginPage).post(loginValidation, postLogin);

router.get("/logout", function (req, res, next) {
	res.clearCookie("userId").redirect("/");
});

router.route("/forgot").get(forgotPage).post(postForgot);

module.exports = router;
