const Team = require("../../model/team.model.js");

module.exports = {
	getTeams: async (req, res) => {
		const teams = await Team.find(
			{ leagueId: req.params.league },
			{ _id: 1, name: 1, manager: 1, logo_path: 1, backdrop_path: 1 }
		);

		res.status(200).json({
			success: true,
			code: 200,
			data: teams,
			message: `teams in ${req.params.league}`,
		});
	},
	// CURD teams in League
	createTeams: async (req, res) => {
		const team = await Team.create(res.locals.body);

		res.json({
			success: true,
			code: 201,
			data: team,
			message: `create in ${req.params.league}`,
		});
	},
	updateTeam: async (req, res) => {
		const { body } = req,
			{ id } = res.locals.team;

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
			message: `${req.params.team} in ${req.params.league}`,
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
