const League = require("../../model/league.model");

module.exports = {
	// get all Leagues
	getLeagues: async (req, res) => {
		const leagues = await League.find({});
		res.json({ code: 200, data: leagues, success: true });
	},

	// CURD leagues
	createLeague: async (req, res, next) => {
		const { leagueName, startTime, endTime, description } = req.body;

		if (!leagueName || !startTime || !endTime || !description)
			return res.json({
				code: 404,
				success: false,
				message: "please fill out leagueName, description startTime, endTime",
			});

		const league = await League.create({
			leagueName,
			description,
			startTime: new Date(startTime),
			endTime: new Date(endTime),
		});

		res.json({
			success: true,
			data: league,
			message: "League created successfully",
			code: 200,
		});
	},
	getDetailLeague: async (req, res, next) => {
		res.json({
			success: true,
			data: res.locals.league,
			code: 200,
		});
	},
	updateLeague: async (req, res, next) => {
		const { body } = req,
			_id = res.locals.league._id.toString();

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
		const _id = res.locals.league._id.toString();

		await League.remove({ _id: _id });

		res.json({
			success: true,
			message: "League deleted successfully",
			code: 200,
		});
	},
};
