const express = require("express"),
	multer = require("multer");

const ctrler = require("../controllers/team.controller");

const { authMiddleware } = require("../middlewares/auth.middleware"),
	teamMiddleware = require("../middlewares/team.middleware"),
	{ createTeam } = require("../validation/api.validation");

const teamRoute = require("./player.route.js"),
	stadiumRoute = require("./stadium.route");

const router = express.Router({ mergeParams: true });

const storage = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, "./public/uploads");
	},
	filename: function (req, file, cb) {
		cb(null, file.originalname);
	},
});

const upload = multer({ storage });

router.use(authMiddleware);

router.use("/:team/players", teamRoute);
router.use("/:team/stadiums", stadiumRoute);

router.route("/").get(ctrler.getTeams).post(createTeam, ctrler.createTeams);

router
	.route("/:team")
	.all(teamMiddleware)
	.get(ctrler.getTeam)
	.put(ctrler.updateTeam)
	.delete(ctrler.removeTeam);

router.post(
	"/:team/logo",
	teamMiddleware,
	upload.single("logo"),
	ctrler.updateLogo
);

module.exports = router;
