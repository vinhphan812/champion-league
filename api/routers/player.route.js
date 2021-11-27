const express = require("express");

const router = express.Router({ mergeParams: true });

const { createPlayer } = require("../validation/api.validation");
const playerMiddleware = require("../middlewares/player.middleware");

const ctrler = require("../controllers/player.controller");

router
	.route("/")
	.get(ctrler.getPlayers)
	.post(createPlayer, ctrler.createPlayer);

router
	.route("/:player")
	.all(playerMiddleware)
	.get(ctrler.getPlayer)
	.put(ctrler.updatePlayer)
	.delete(ctrler.deletePlayer);

module.exports = router;
