const League = require("../../model/league.model"),
	Team = require("../../model/team.model"),
	Player = require("../../model/player.model"),
	Match = require("../../model/match.model");

module.exports = {
	// get all Leagues
	getLeagues: async (req, res) => {
		const leagues = await League.find(
			{},
			{ _id: 1, name: 1, startTime: 1, logo_path: 1 }
		);
		res.json({ code: 200, data: leagues, success: true });
	},

	// CURD leagues
	createLeague: async (req, res, next) => {
		const data = await League.create(res.locals.league);

		res.json({
			success: true,
			data: data,
			message: "League created successfully",
			code: 200,
		});
	},
	getLeague: async (req, res, next) => {
		res.json({
			success: true,
			data: res.locals.league,
			code: 200,
		});
	},
	updateLeague: async (req, res, next) => {
		const { body } = req,
			{ createAt, _id, name } = res.locals.league;

		body.updateAt = new Date();
		body.createAt = createAt;

		await League.updateOne({ _id }, body);

		const league = await League.findOne({ _id });

		res.json({
			success: true,
			data: league,
			message: `Updated ${name} successfully`,
			code: 200,
		});
	},
	removeLeague: async (req, res, next) => {
		const { _id, name } = res.locals.league;

		await League.deleteOne({ _id });

		await res.json({
			success: true,
			message: `Deleted ${name} successfully`,
			code: 200,
		});
	},
};
