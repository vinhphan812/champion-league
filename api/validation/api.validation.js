const Team = require("../../model/team.model"),
	Player = require("../../model/player.model");

const fields = {
	league: "{ name, startTime, endTime, description }",
	team: "",
	match: "{ name, description, teams, placeIn, startTime }",
	player: "{name, weight, height, numberInTeam, birthday, position}",
};

const ERROR_MSG = {
	invalid: "Please fill in all fields ",
	playerContain: (name) => `${name} contain in team.`,
	twoTeamErr: 'Create a match containing 2 teams separated by a "-" sign',
	teamIdErr: "item in teams must a 24 characters.",
	teamInexist: "id teams invalid.",
};

module.exports = {
	createLeague: (req, res, next) => {
		const { name, startTime, endTime, description } = req.body;

		if (checkNotContain([name, startTime, endTime, description]))
			return responseError(res, ERROR_MSG.invalid + fields.league);

		res.locals.league = req.body;

		next();
	},
	createTeam: async (req, res, next) => {
		const { name, founded, manager, logo_path, backdrop_path } = req.body;

		const league = req.params.league;

		if (checkNotContain([name, founded, manager]))
			return res.status(403).json({
				success: false,
				message: "please fill out name, founded, manager, logo_path, drop_path",
				code: 403,
			});

		const teams = await Team.findOne({ name, leagueId: league });

		if (teams)
			return res.status(403).json({
				success: false,
				message: "Team name already exists",
				code: 403,
			});

		res.locals.body = {
			...req.body,
			leagueId: req.params.league,
		};
		next();
	},
	createMatch: async (req, res, next) => {
		const { name, description, teams, placeIn, startTime } = req.body;

		if (checkNotContain([name, description, teams, placeIn, startTime]))
			return responseError(res, ERROR_MSG.invalid + fields.match);

		const teamList = teams.split(/-| - | -|- /);

		if (teamList.length != 2)
			return responseError(
				res,
				'Create a match containing 2 teams separated by a "-" sign'
			);

		if (teamList[0].length != 24 || teamList[1].length != 24)
			return responseError(res, "item in teams must a 24 characters.");

		const teamsCorrect = await Team.find({
			_id: teamList,
		});

		if (teamsCorrect.length != 2)
			return responseError(res, "id teams invalid.");
		res.locals.match = {
			name,
			description,
			teams: teamList,
			placeIn,
			startTime,
			leagueId: req.params.league,
		};
		next();
	},
	updateMatch: async (req, res, next) => {
		const { body } = req;

		if (body.teams) {
			const teams = body.teams.split(/-| - | -|- /);
			if (teams.length != 2)
				return responseError(res, ERROR_MSG.twoTeamErr);

			if (teams[0].length != 24 || teams[1].length != 24)
				return responseError(res, teamIdErr);

			const teamsCorrect = await Team.find({
				_id: teams,
				leagueId: req.params.league,
			});

			if (teamsCorrect.length != 2)
				return responseError(res, ERROR_MSG.teamInexist);

			body.teams = teams;
		}
		res.locals.body = body;
		next();
	},
	createPlayer: async (req, res, next) => {
		const teamId = req.params.team,
			leagueId = req.params.league;
		const {
			name,
			weight,
			height,
			numberInTeam,
			birthday,
			position,
			avatar,
		} = req.body;

		const invalidData = checkNotContain([
			name,
			weight,
			height,
			numberInTeam,
			birthday,
			position,
		]);

		if (invalidData)
			return responseError(res, ERROR_MSG.invalid + fields.player);

		const playerContain = await Player.find({ name, teamId, leagueId });

		if (playerContain.length)
			return responseError(res, ERROR_MSG.playerContain(name));

		res.locals.body = {
			name,
			teamId,
			weight,
			height,
			numberInTeam,
			birthday,
			leagueId,
			position,
			avatar,
		};

		next();
	},
};

function responseError(res, message) {
	return res.json({
		code: 404,
		success: false,
		message,
	});
}

function checkNotContain(arr) {
	return arr.reduce((r, i) => {
		if (!i) r = true;
		return r;
	}, false);
}
