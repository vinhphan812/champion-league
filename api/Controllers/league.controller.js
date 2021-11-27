const League = require("../../model/league.model");

module.exports = {
	// get all Leagues
	getLeagues: async (req, res) => {
		const leagues = await League.find({});
		res.json({ code: 200, data: leagues, success: true });
	},

	// CURD leagues
	createLeague: async (req, res, next) => {
		const league = await League.create(res.locals.league);

		res.json({
			success: true,
			data: league,
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
			_id = res.locals.league._id;

		await League.update({ _id }, body);

		const league = await League.findOne({ _id });

		res.json({
			success: true,
			data: league,
			message: "League updated successfully",
			code: 200,
		});
	},
	removeLeague: async (req, res, next) => {
		const _id = res.locals.league;

		await League.remove({ _id });

		res.json({
			success: true,
			message: "League deleted successfully",
			code: 200,
		});
	},
};
