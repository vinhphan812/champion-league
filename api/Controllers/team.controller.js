const Team = require("../../model/team.model.js");

module.exports = {
	getTeams: async (req, res) => {
		const teams = await Team.find({});
		res.json({
			success: true,
			code: 200,
			data: teams,
			message: `teams in ${req.params.league}`,
		});
	},
	// CURD teams in League
	createTeams: async (req, res) => {
		const { name, founded, manager, logo_path, drop_path } = req.body;

		if (!name || !founded || !manager || !logo_path || !drop_path)
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

		const team = await Team.create({
			name,
			founded,
			manager,
			logo_path,
			drop_path,
			leagueId: req.params.league,
		});

		res.json({
			success: true,
			code: 201,
			data: team,
			message: `create in ${req.params.league}`,
		});
	},
	updateTeam: async (req, res) => {
		const { body } = req;
		const { id } = res.locals.team;

		await Team.update({ _id: id }, body);

		res.json({
			success: true,
			code: 200,
			message: `update team ${req.params.team} in ${req.params.league}`,
		});
	},
	getTeam: (req, res) => {
		res.json({
			success: true,
			code: 200,
			data: res.locals.team,
			message: `get data ${req.params.team} in ${req.params.league}`,
		});
	},
	removeTeam: async (req, res) => {
		const { id } = res.locals.team;
		await Team.remove({ _id: id });
		res.json({
			success: true,
			code: 200,
			message: `delete ${req.params.team} team in ${req.params.league}`,
		});
	},
};
