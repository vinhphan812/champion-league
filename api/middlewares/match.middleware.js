const Match = require("../../model/match.model.js");
const err = {
	success: false,
	message: "Not Found League.",
	code: 404,
};

module.exports = async (req, res, next) => {
	const { match, league } = req.params;

	if (match.length != 24 || league.length != 24)
		return res.status(404).json(err);

	const data = await Match.findOne({ _id: match, leagueId: league });

	if (!data) return res.status(404).json(err);

	res.locals.match = data;
	next();
};
