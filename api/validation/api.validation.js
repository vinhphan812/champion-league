const Team = require("../../model/team.model"),
	Player = require("../../model/player.model");

const fields = {
	league: "{ name, startTime, endTime, description }",
	team: "",
	match: "{ name, description, teams, placeIn, startTime }",
	player: "{name, weight, height, numberInTeam, birthday, position}",
	rule: "{name, description}",
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
			return Error(res, ERROR_MSG.invalid + fields.league);

		res.locals.league = req.body;

		next();
	},
	createTeam: async (req, res, next) => {
		const { name, founded, manager, logo_path, backdrop_path } = req.body;

		if (checkNotContain([name, founded, manager]))
			return res.status(403).json({
				success: false,
				message: "please fill out name, founded, manager, logo_path, drop_path",
				code: 403,
			});

		const teams = await Team.findOne({ name });

		if (teams)
			return res.status(403).json({
				success: false,
				message: "Team name already exists",
				code: 403,
			});

		res.locals.team = req.body;

		next();
	},
	createMatch: async (req, res, next) => {
		const { name, description, teams, placeIn, startTime } = req.body;

		if (checkNotContain([name, description, teams, placeIn, startTime]))
			return Error(res, ERROR_MSG.invalid + fields.match);

		const teamList = teams.split(/-| - | -|- /);

		if (teamList.length != 2)
			return Error(
				res,
				'Create a match containing 2 teams separated by a "-" sign'
			);

		if (teamList[0].length != 24 || teamList[1].length != 24)
			return Error(res, "item in teams must a 24 characters.");

		const teamsCorrect = await Team.find({
			_id: teamList,
		});

		if (teamsCorrect.length != 2) return Error(res, "id teams invalid.");
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
			if (teams.length != 2) return Error(res, ERROR_MSG.twoTeamErr);

			if (teams[0].length != 24 || teams[1].length != 24)
				return Error(res, teamIdErr);

			const teamsCorrect = await Team.find({
				_id: teams,
				leagueId: req.params.league,
			});

			if (teamsCorrect.length != 2)
				return Error(res, ERROR_MSG.teamInexist);

			body.teams = teams;
		}
		res.locals.body = body;
		next();
	},
	createPlayer: async (req, res, next) => {
		const { team } = req.params;
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

		if (invalidData) return Error(res, ERROR_MSG.invalid + fields.player);

		const playerContain = await Player.findOne({ name, team });

		if (playerContain) return Error(res, ERROR_MSG.playerContain(name));

		res.locals.body = {
			name,
			team,
			weight,
			height,
			numberInTeam,
			birthday,
			position,
			avatar,
		};

		next();
	},
	createRule: async (req, res, next) => {
		const { name, description } = req.body;

		if (checkNotContain([name, description]))
			return Error(res, ERROR_MSG.invalid + fields.rule);

		res.locals.body = req.body;

		next();
	},
};

function Error(res, message) {
	return res.status(400).json({
		code: 400,
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
