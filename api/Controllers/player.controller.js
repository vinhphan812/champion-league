const Player = require("../../model/player.model");

module.exports = {
	getPlayers: async (req, res, next) => {
		const { team } = req.params;

		const data = await Player.find({
			team: team,
		});

		res.json({ success: true, code: 200, data });
	},
	createPlayer: async (req, res, next) => {
		const data = await Player.create(res.locals.body);
		res.json({ success: true, code: 200, data });
	},
	updatePlayer: async (req, res, next) => {
		const { _id } = res.locals.player;

		await Player.updateOne({ _id }, req.body);

		const data = await Player.findOne({ _id });

		res.json({ success: true, code: 200, data });
	},
	getPlayer: async (req, res, next) => {
		const { player } = res.locals;

		const data = await Player.find(player, {
			createAt: 0,
			updateAt: 0,
		}).populate("team", { createAt: 0, updateAt: 0 });

		res.json({ success: true, code: 200, data });
	},
	deletePlayer: async (req, res, next) => {
		const { _id } = res.locals.player;

		await Player.remove({ _id });

		res.json({
			success: true,
			message: "Match deleted successfully",
			code: 200,
		});
	},
};
