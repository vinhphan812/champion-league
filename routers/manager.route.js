const express = require("express"),
	multer = require("multer");

const {
		decentralization,
	} = require("../middlewares/decentralization.middleware"),
	{ authMiddleware } = require("../middlewares/auth.middleware");

const validations = require("../validations/create.validation");

const ctrler = require("../controllers/manager.controller");

// const leagueRoute = require("./manager/league.route.js");

const storage = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, "./public/uploads");
	},
	filename: function (req, file, cb) {
		cb(null, file.originalname);
	},
});

const upload = multer({ storage });

const router = express.Router();

router.use(authMiddleware, decentralization("manager"));

// router.use("/leagues", leaguesRoute);

router.get("/", ctrler.getManagerPage);

router
	.route("/leagues")
	.get(ctrler.getCreateLeaguePage)
	.post(
		upload.single("logo"),
		validations.createLeague,
		ctrler.createLeague
	);

router
	.route("/teams")
	.get(ctrler.getCreateTeamPage)
	.post(upload.single("logo"), validations.createTeam, ctrler.createTeam);

router.get("/teams/:team", ctrler.getTeamPage);

router.get("/leagues/:league", ctrler.getLeaguePage);

module.exports = router;
