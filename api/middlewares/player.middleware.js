const Player = require("../../model/player.model");

const ERROR = {
	invalid: "league, team, player correct 24 characters",
	incorrect: "Player not found",
};

module.exports = async (req, res, next) => {
	const { league, team, player } = req.params;

	if (league.length != 24 || team.length != 24 || player.length != 24)
		return res.status(404).json({
			success: false,
			message: ERROR.invalid,
			code: 404,
		});

	const data = await Player.findOne({
		_id: player,
		leagueId: league,
		teamId: team,
	});

	if (!data)
		return res
			.status(404)
			.json({ success: false, message: ERROR.incorrect, code: 404 });
	res.locals.player = data;
	next();
};
