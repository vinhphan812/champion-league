const { DEFAULT_IGNORE_FIELD } = require("../../utils");

const Match = require("../../model/match.model"),
	MatchDetail = require("../../model/matchDetail.model");

module.exports = {
	getMatchs: async (req, res, next) => {
		const match = await Match.find(
			{ league: req.params.league },
			{
				description: 0,
				referees: 0,
				...DEFAULT_IGNORE_FIELD,
			}
		)
			.populate("stadium", DEFAULT_IGNORE_FIELD)
			.populate("teams", DEFAULT_IGNORE_FIELD);
		res.json({ code: 200, data: match, success: true });
	},
	// CURD for match
	createMatch: async (req, res, next) => {
		const match = await Match.create(res.locals.match);

		res.json({
			success: true,
			data: match,
			message: `Match created successfully in ${res.locals.league.name}`,
			code: 200,
		});
	},
	getMatch: async (req, res, next) => {
		let { match } = res.locals;

		match = await Match.findOne(
			{ _id: match },
			{
				createAt: 0,
				updateAt: 0,
			}
		).populate("teams", {
			createAt: 0,
			updateAt: 0,
		});

		res.json({
			success: true,
			data: match,
			code: 200,
		});
	},
	updateMatch: async (req, res, next) => {
		const { body } = res.locals,
			{ _id, createAt } = res.locals.match;

		body.createMatch = createAt;
		body.updateAt = new Date();

		await Match.updateOne({ _id }, body);

		const league = await Match.findOne({ _id });

		res.json({
			success: true,
			data: league,
			message: "Match updated successfully",
			code: 200,
		});
	},
	removeMatch: async (req, res, next) => {
		const { _id, name } = res.locals.match;

		await Match.deleteOne({ _id });

		res.json({
			success: true,
			message: `deleted Match "${name}" successfully`,
			code: 200,
		});
	},
	getMatchDetails: async (req, res, next) => {
		const { league, match } = res.locals;
		const data = await MatchDetail.find({ league, match })
			.populate("team")
			.populate("player");

		res.json({ success: true, data });
	},
};
