const Team = require("../model/team.model");

const fields = {
	league: "{ name, startTime, endTime, description }",
	team: "{ name, founded, manager, logo_path} ",
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
	existTeam: "Team name already exists",
};
module.exports = {
	createLeague: (req, res, next) => {
		const { name, startTime, endTime, description } = req.body;

		if (checkNotContain([name, startTime, endTime, description]))
			return res.render("manager/createLeague", {
				errors: [ERROR_MSG.invalid + fields.league],
			});

		if (req.file?.path) req.body.logo_path = "/" + req.file?.path;

		res.locals.body = req.body;

		next();
	},
	createTeam: async (req, res, next) => {
		const { name, founded, manager, coach } = req.body;

		const errors = [];

		res.locals.scripts = ["/public/js/createTeam.js"];
		if (checkNotContain([name, founded, manager, coach]))
			errors.push(ERROR_MSG.invalid + fields.team);

		const teams = await Team.findOne({ name });

		if (teams) errors.push(ERROR_MSG.existTeam);

		res.locals.errors = errors;

		if (req.file) req.body.logo_path = "/" + req.file?.path;

		res.locals.body = req.body;

		if (errors.length) return res.render("manager/createTeam");

		next();
	},
};

function checkNotContain(arr) {
	return arr.reduce((r, i) => {
		if (!i) r = true;
		return r;
	}, false);
}
