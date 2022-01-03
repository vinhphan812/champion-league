const Team = require("../model/team.model");

const fields = {
	league: "{ name, startTime, endTime, description }",
	team: "{ name, founded, manager, logo_path} ",
	match: "{ name, description, teams, placeIn, startTime }",
	player: "{name, weight, height, numberInTeam, birthday, position}",
	rule: "{name, description}",
	donor: "{name, address, email, phone, funding}",
	referee: "{name, address, email, phone, birthday}",
};

const ERROR_MSG = {
	invalid: "Please fill in all fields ",
	playerContain: (name) => `${name} contain in team.`,
	twoTeamErr: 'Create a match containing 2 teams separated by a "-" sign',
	teamIdErr: "item in teams must a 24 characters.",
	teamInexist: "id teams invalid.",
	existTeam: "Team name already exists",
	funding: "Invalid sponsorship amount",
};
module.exports = {
	createLeague: (req, res, next) => {
		const { name, startTime } = req.body;
		const errors = [];

		res.locals.body = req.body;

		if (checkNotContain([name, startTime]))
			errors.push(ERROR_MSG.invalid + fields.league);
		if (errors.length) {
			res.locals.errors = errors;
			return res.render("manager/createLeague");
		}

		if (req.file?.path) req.body.logo_path = "/" + req.file?.path;

		next();
	},
	createTeam: async (req, res, next) => {
		const { name, founded, coach, stadiumName, address, capacity } =
			req.body;

		const errors = [];

		res.locals.scripts = ["/public/js/createTeam.js"];

		if (!parseInt(capacity))
			errors.push("sức chứa của sân vận động phải là số.");

		if (
			checkNotContain([
				name,
				founded,
				coach,
				stadiumName,
				address,
				capacity,
			])
		)
			errors.push(ERROR_MSG.invalid + fields.team);

		const teams = await Team.findOne({ name });

		if (teams) errors.push(ERROR_MSG.existTeam);

		if (req.file) req.body.logo_path = "/" + req.file?.path;

		res.locals.body = req.body;

		res.locals.errors = errors;

		if (errors.length) return res.render("manager/createTeam");

		next();
	},
	createDonor: async (req, res, next) => {
		const { name, address, email, phone, funding } = req.body,
			errors = [];

		if (checkNotContain([name, address, email, phone, funding]))
			errors.push(ERROR_MSG.invalid + fields.donor);

		if (funding < 100) errors.push(ERROR_MSG.funding);

		if (req.file) req.body.logo_path = "/" + req.file?.path;

		res.locals.body = req.body;

		res.locals.errors = errors;

		if (errors.length) return res.render("manager/createDonor");

		next();
	},
	createReferee: async (req, res, next) => {
		const { name, email, phone, birthday } = req.body;
		const errors = [];

		res.locals.body = req.body;
		console.log(req.body);

		if (checkNotContain([name, email, phone, birthday]))
			errors.push(ERROR_MSG.invalid + fields.referee);

		if (errors.length) {
			res.locals.errors = errors;
			return res.render("manager/createReferee");
		}

		if (req.file) req.body.avatar = "/" + req.file?.path;

		next();
	},
};

function checkNotContain(arr) {
	return arr.reduce((r, i) => {
		if (!i) r = true;
		return r;
	}, false);
}
