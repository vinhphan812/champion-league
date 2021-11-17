const express = require("express");

// middleware
const { authMiddleware } = require("../../middlewares/auth.middleware"),
	{
		decentralization,
	} = require("../../middlewares/decentralization.middleware");

// controller
const {
	infoAPI,
	createLeague,
	notFound,
	getLeagues,
} = require("../Controllers/api.controller");

const router = express.Router();

router.use(authMiddleware, decentralization("user"));

router.get("/", infoAPI);

router.route("/leagues").get(getLeagues).post(createLeague);

router.route("/leagues/:id").get().put().delete();

router.route("/team").get().post();

router.route("/team/:id").get().put().delete();

router.route("/player").get().post().put().delete();

router.use(notFound);

module.exports = router;
