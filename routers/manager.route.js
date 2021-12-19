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

router.get("/", ctrler.getManagerPage);

//TODO LEAGUE
//? - create
router
	.route("/leagues")
	.get(ctrler.getCreateLeaguePage)
	.post(
		upload.single("logo"),
		validations.createLeague,
		ctrler.createLeague
	);

//? - detail
router.get("/leagues/:league", ctrler.getLeaguePage);

//TODO TEAM
// ? - create
router
	.route("/teams")
	.get(ctrler.getCreateTeamPage)
	.post(upload.single("logo"), validations.createTeam, ctrler.createTeam);

//? - detail
router.get("/teams/:team", ctrler.getTeamPage);

//TODO DONORS
// ? - create
router
	.route("/donors")
	.get(ctrler.getCreateDonor)
	.post(upload.single("logo"), validations.createDonor, ctrler.createDonor);

// ? - detail

router.get("/donors/:donor", ctrler.getDonorsPage);

router
	.route("/referees")
	.get(ctrler.getCreateReferee)
	.post(
		upload.single("logo"),
		validations.createReferee,
		ctrler.createReferee
	);

module.exports = router;
