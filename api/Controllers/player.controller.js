const Player = require("../../model/player.model");

module.exports = {
	getPlayers: async (req, res, next) => {
		const { team, league } = req.params;
		const data = await Player.find(
			{
				leagueId: league,
				teamId: team,
			},
			{ _id: 1, name: 1, position: 1 }
		);
		res.json({ success: true, code: 200, data });
	},
	createPlayer: async (req, res, next) => {
		const data = await Player.create(res.locals.body);
		res.json({ success: true, code: 200, data });
	},
	updatePlayer: async (req, res, next) => {
		const _id = res.locals.player.id;

		await Player.update({ _id }, req.body);

		const data = await Player.findOne({ _id });

		res.json({ success: true, code: 200, data });
	},
	getPlayer: (req, res, next) => {
		res.json({ success: true, code: 200, data: res.locals.player });
	},
	deletePlayer: async (req, res, next) => {
		console.log(res.locals);

		const _id = res.locals.player.id;

		await Player.remove({ _id });

		res.json({
			success: true,
			message: "Match deleted successfully",
			code: 200,
		});
	},
};
