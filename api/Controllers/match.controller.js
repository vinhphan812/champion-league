const Match = require("../../model/match.model"),
	Team = require("../../model/team.model");

module.exports = {
	getMatchs: async (req, res, next) => {
		console.log(req.params);
		const match = await Match.find({ leagueId: req.params.league });
		res.json({ code: 200, data: match, success: true });
	},
	// CURD for match
	createMatch: async (req, res, next) => {
		const match = await Match.create(res.locals.match);

		res.json({
			success: true,
			data: match,
			message: `Match created successfully in ${req.params.league}`,
			code: 200,
		});
	},
	getMatch: async (req, res, next) => {
		let { match } = res.locals;

		match.teams = await Team.find({ _id: match.teams });

		res.json({
			success: true,
			data: match,
			code: 200,
		});
	},
	updateMatch: async (req, res, next) => {
		const { body } = res.locals,
			_id = res.locals.match._id;

		await Match.update({ _id }, body);

		const league = await Match.findOne({ _id });

		res.json({
			success: true,
			data: league,
			message: "Match updated successfully",
			code: 200,
		});
	},
	removeMatch: async (req, res, next) => {
		const _id = res.locals.match._id;

		await Match.remove({ _id });

		res.json({
			success: true,
			message: "Match deleted successfully",
			code: 200,
		});
	},
};
