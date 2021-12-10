const User = require("../model/user.model"),
	League = require("../model/league.model"),
	Team = require("../model/team.model"),
	Player = require("../model/player.model"),
	Stadium = require("../model/stadium.model");

module.exports = {
	getManagerPage: async (req, res, next) => {
		const user = await User.findOne({ _id: req.signedCookies.userId });

		res.locals.leagues = await League.find({});
		res.locals.teams = await Team.find({});

		res.locals.scripts = ["/public/js/manager.js"];
		res.render("manager/home", { user });
	},
	getCreateLeaguePage: (req, res, next) => {
		res.render("manager/createLeague");
	},
	getCreateTeamPage: (req, res, next) => {
		res.locals.body = {};
		res.locals.scripts = ["/public/js/createTeam.js"];
		res.render("manager/createTeam");
	},
	createLeague: async (req, res, next) => {
		const league = await League.create(res.locals.body);

		if (league) return res.redirect("/manager");
		next();
	},
	getLeaguePage: async (req, res, next) => {
		const { league } = req.params;

		if (league.length != 24) next();

		const data = await League.findOne({ _id: league });

		if (!data) next();
		res.locals.league = data;
		res.render("manager/league");
	},
	createTeam: async (req, res, next) => {
		const { stadiumName, address, capacity } = req.body;
		try {
			// parse player list
			const players = JSON.parse(req.body.players);

			// create team
			const team = await Team.create(req.body);

			// check player list contain
			if (players) {
				// write player into MongoDB
				for (const player of players) {
					player.team = team.id;
					console.log(player);
					await Player.create(player);
				}
			}

			//TODO create Stadium for team (relationship)
			const stadium = await Stadium.create({
				name: stadiumName,
				address,
				capacity,
				team: team.id,
			});

			//TODO update stadium for team (relationship)
			await Team.updateOne(
				{ _id: team.id },
				{ $set: { stadium: stadium.id } }
			);
			// create success go to this team page
			if (team) return res.redirect("/manager/teams/" + team.id);
			next();
		} catch (error) {
			res.send(error);
		}
	},
	getTeamPage: async (req, res, next) => {
		const { team } = req.params;

		if (team.length != 24) return next();

		const data = await Team.findOne({ _id: team }).populate("stadium");

		if (!data) return next();

		res.locals.scripts = ["/public/js/team.manager.js"];
		res.locals.team = data;

		res.render("manager/team");
	},
};
