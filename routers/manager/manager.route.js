const express = require("express"),
	multer = require("multer");

const {
		decentralization,
	} = require("../../middlewares/decentralization.middleware"),
	{ authMiddleware } = require("../../middlewares/auth.middleware");

const validations = require("../../validations/create.validation");

const ctrler = require("../../controllers/manager.controller");

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

const leagueRoute = require("./league.route");

router.use(authMiddleware, decentralization("manager"), (req, res, next) => {
	res.locals.isManager = true;
	next();
});

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
router.use("/leagues/:league", leagueRoute);

//TODO TEAM
// ? - create
router
	.route("/teams")
	.get(ctrler.getCreateTeamPage)
	.post(upload.single("logo"), validations.createTeam, ctrler.createTeam);

//? - detail
router.get("/teams/:team", ctrler.getTeamPage);
router.get("/teams/:team/players/:player", ctrler.getPlayer);

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

router.get("/referees/:referee", ctrler.getReferee);

module.exports = router;
