const { DEFAULT_IGNORE_FIELD } = require("../utils");

const League = require("../model/league.model"),
	Team = require("../model/team.model"),
	Match = require("../model/match.model"),
	Player = require("../model/player.model"),
	Donor = require("../model/donor.model"),
	Referee = require("../model/referee.model"),
	MatchDetail = require("../model/matchDetail.model"),
	Rule = require("../model/rule.model");

module.exports = {
	getHome: async (req, res) => {
		res.locals.teams = await Team.find({});
		res.locals.donors = await Donor.find({});
		res.locals.leagues = await League.find({});
		res.locals.matchs = await Match.find({});
		res.locals.referees = await Referee.find({});

		res.locals.scripts = ["/public/js/home.js"];

		res.render("public/home");
	},
	getRules: async (req, res) => {
		res.locals.rules = await Rule.find({});
		res.render("public/rules");
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

		const data = await Team.findOne({ _id: team }).populate([
			"stadium",
			"titles",
		]);

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
		console.log(type);
		if (type != undefined)
			type = ["all", ""].includes(type)
				? ALL_TYPE
				: typeof type == "string"
				? type.split(",")
				: type;

		if (q) {
			const $regex = new RegExp(q, "i");
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
			if (type.includes("match")) {
				const matchs = await Match.find(
					{
						$or: [
							{
								name: { $regex },
							},
						],
					},
					{
						_id: 1,
						name: 1,
						description: 1,
						league: 1,
						type: "matchs",
					}
				).populate("league");
				results.push(...matchs);
			}
		}

		res.locals.isSearch = true;
		res.locals.results = results;
		res.locals.keyword = q;
		res.locals.type = type || [];

		res.render("public/search");
	},
	getPlayer: async (req, res) => {
		const { player, team } = req.params;

		if (player.length !== 24 && team.length !== 24) return next();

		const data = await Player.findOne({ _id: player, team }).populate([
			"team",
			"titles",
		]);

		if (!data) return next();

		data.type = "player";

		const goals = await MatchDetail.find({
			player,
			type: "goal",
		})
			.populate("league")
			.populate("match");

		const mistakes = await MatchDetail.find({
			player,
			type: { $in: ["red", "yellow"] },
		});

		res.locals.person = data;
		res.locals.mistakes = mistakes;
		res.locals.goals = goals;

		res.render("person");
	},
	getReferee: async (req, res) => {
		const { referee } = req.params;

		if (referee.length !== 24) return next();

		const data = await Referee.findOne({ _id: referee });

		const matchs = await Match.find({ referees: referee });

		data.type = "referee";

		if (!data) return next();

		res.locals.person = data;
		res.locals.matchs = matchs;

		res.render("person");
	},
	getMatch: async (req, res, next) => {
		const { match, league } = req.params;
		if (match.length !== 24 || league.length !== 24) return next();

		const data = await Match.findOne({ league, _id: match })
			.populate("stadium", { ...DEFAULT_IGNORE_FIELD, team: 0 })
			.populate("teams", { _id: 1, name: 1, logo_path: 1 })
			.populate("referees", { _id: 1, name: 1, avatar: 1 });

		res.locals.league = await League.findOne({ _id: league });
		res.locals.match = data;
		res.locals.scripts = ["/public/js/match.manager.js"];
		res.render("match");
	},
};
