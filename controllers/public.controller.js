const League = require("../model/league.model"),
	Team = require("../model/team.model"),
	Match = require("../model/match.model"),
	Player = require("../model/player.model"),
	Donor = require("../model/donor.model"),
	Referee = require("../model/referee.model");

module.exports = {
	getHome: async (req, res) => {
		res.locals.teams = await Team.find({});
		res.locals.donors = await Donor.find({});
		res.locals.players = await Player.find({});
		res.locals.matchs = await Match.find({});
		res.locals.referees = await Referee.find({});

		res.render("public/home");
	},
	getLeague: async (req, res, next) => {
		const { league } = req.params;
		if (league.length !== 24) return next();

		const data = await League.findOne({ _id: league });

		if (!data) return next();
		res.locals = {
			...res.locals,
			league: data,
			scripts: ["/public/js/league.js"],
		};
		res.render("league");
	},
	getAllTeamPage: async (req, res) => {
		res.locals.teams = await Team.find({});
		res.render("public/teams");
	},
	getTeamPage: async (req, res) => {
		const { team } = req.params;

		if (team.length !== 24) return next();

		const data = await Team.findOne({ _id: team }).populate("stadium");

		if (!data) return next();

		res.locals = {
			...res.locals,
			team: data,
			scripts: ["/public/js/team.js"],
		};

		res.render("team");
	},
	searchPage: async (req, res) => {
		const ALL_TYPE = [
			"league",
			"match",
			"team",
			"player",
			"referee",
			"donor",
		];

		let { q, type } = req.query;
		const results = [];

		// null or all => all type
		if (type != undefined)
			type = ["all", ""].includes(type) ? ALL_TYPE : type.split(",");

		if (q) {
			const $regex = new RegExp(q, "i");
			if (type.includes("league")) {
				const leagues = await League.find(
					{
						$or: [
							{
								name: { $regex },
							},
							{ description: { $regex } },
						],
					},
					{ _id: 1, name: 1, description: 1, type: "leagues" }
				);
				results.push(...leagues);
			}
			if (type.includes("match")) {
				const matchs = await Match.find(
					{
						$or: [
							{
								name: { $regex },
							},
							{ description: { $regex } },
						],
					},
					{
						_id: 1,
						name: 1,
						description: 1,
						league: 1,
						type: "matchs",
					}
				);
				results.push(...matchs);
			}
			if (type.includes("team")) {
				const teams = await Team.find(
					{
						$or: [
							{
								name: { $regex },
							},
							{ description: { $regex } },
						],
					},
					{ _id: 1, name: 1, description: 1, type: "teams" }
				);
				results.push(...teams);
			}
			if (type.includes("player")) {
				const players = await Player.find(
					{
						$or: [
							{
								name: { $regex },
							},
						],
					},
					{ _id: 1, name: 1, team: 1, type: "players" }
				);
				results.push(...players);
			}
			if (type.includes("referee")) {
				const referees = await Referee.find(
					{
						$or: [
							{
								name: { $regex },
							},
							{ description: { $regex } },
						],
					},
					{ _id: 1, name: 1, description: 1, type: "referees" }
				);
				results.push(...referees);
			}
			if (type.includes("donor")) {
				const donors = await Donor.find(
					{
						$or: [
							{
								name: { $regex },
							},
							{ description: { $regex } },
						],
					},
					{ _id: 1, name: 1, description: 1, type: "donors" }
				);
				results.push(...donors);
			}
		}

		res.locals.isSearch = true;
		res.locals.results = results;
		res.locals.keyword = q;
		res.locals.type = type || [];

		res.render("public/search");
	},
};
