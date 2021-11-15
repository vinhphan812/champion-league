const express = require("express");

const {
	loginPage,
	postLogin,
	registerPage,
	postRegister,
} = require("../Controllers/auth.controller");

const router = express.Router();

router.route("/login").get(loginPage).post(postLogin);

router.route("/register").get(registerPage).post(postRegister);

module.exports = router;
