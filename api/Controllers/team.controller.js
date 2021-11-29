const Team = require("../../model/team.model.js"),
	Player = require("../../model/player.model.js"),
	Match = require("../../model/match.model.js");

module.exports = {
	getTeams: async (req, res) => {
		const teams = await Team.find(
			{},
			{ _id: 1, name: 1, manager: 1, logo_path: 1 }
		);

		res.status(200).json({
			success: true,
			code: 200,
			data: teams,
			message: `teams`,
		});
	},
	// CURD teams
	createTeams: async (req, res) => {
		const team = await Team.create(res.locals.team);

		res.json({
			success: true,
			code: 201,
			data: team,
			message: `${team.name} create successful`,
		});
	},
	updateTeam: async (req, res) => {
		const { body } = req,
			{ id } = res.locals.team;

		await Team.update({ _id: id }, body);

		res.json({
			success: true,
			code: 200,
			message: `update team ${req.locals.team.name}`,
		});
	},
	getTeam: (req, res) => {
		res.json({
			success: true,
			code: 200,
			data: res.locals.team,
			message: `detail ${req.params.team}`,
		});
	},
	removeTeam: async (req, res) => {
		const { team } = res.locals;

		// remove player in team
		await Player.deleteMany({ teamId: team });

		// remove all match have a team join in.
		await Match.deleteMany({ teams: team });

		// remove team
		await Team.deleteOne({ _id: team });

		res.json({
			success: true,
			code: 200,
			message: `delete ${team.name} team`,
		});
	},
};
