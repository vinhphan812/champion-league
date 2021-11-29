const Match = require("../../model/match.model.js");
const err = {
	success: false,
	message: "LeagueId, MatchId not format 24 characters.",
	code: 404,
};

module.exports = async (req, res, next) => {
	const { match } = req.params;

	if (match.length != 24) return res.status(404).json(err);

	const data = await Match.findOne({
		_id: match,
		leagueId: res.locals.league,
	});

	if (!data)
		return res
			.status(404)
			.json({ success: false, message: "Not Found Match", code: 404 });

	res.locals.match = data;
	next();
};
