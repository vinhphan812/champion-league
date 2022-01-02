const { DEFAULT_IGNORE_FIELD } = require("../utils");

const League = require("../model/league.model"),
	Match = require("../model/match.model"),
	MatchDetails = require("../model/matchDetail.model");
module.exports = {
	getLeaguePage: async (req, res, next) => {
		const { league } = req.params;

		if (league.length != 24) return next();

		const data = await League.findOne({ _id: league });

		if (!data) next();

		res.locals.league = data;
		res.locals.scripts = ["/public/js/league.manager.js"];

		res.render("league");
	},
	leagueMiddleware: async (req, res, next) => {
		const { league } = req.params;

		if (league.length != 24) return res.render("error/404");

		const data = await League.findOne({ _id: league });

		if (!data) return res.render("error/404");

		res.locals.league = data;
		next();
	},
	matchMiddleware: async (req, res, next) => {
		const { match } = req.params;

		if (match.length != 24) return res.render("error/404");

		const data = await Match.findOne({ _id: match });

		if (!data) return res.render("error/404");

		res.locals.match = data;
		next();
	},

	getMatch: async (req, res, next) => {
		const { match } = res.locals;

		await match.populate("stadium", { ...DEFAULT_IGNORE_FIELD, team: 0 });
		await match.populate("teams", { _id: 1, name: 1, logo_path: 1 });
		await match.populate("referees", { _id: 1, name: 1, avatar: 1 });

		res.locals.match = match;

		res.render("match");
	},
	updateMatchPage: async (req, res, next) => {
		const params = req.params.match;
		const match = await Match.findById(params).populate("teams");
		res.locals.scripts = ["/public/js/updateMatch.js"];
		res.locals.links = [
			"https://pro.fontawesome.com/releases/v5.10.0/css/all.css",
		];
		res.locals.match = match;
		res.render("manager/updateMatch");
	},
	postUpdateMatch: async (req, res, next) => {
		const { league, match } = req.params;
		const response = JSON.parse(req.body.details);
		await MatchDetails.insertMany(response);
		res.redirect(`/manager/leagues/${league}/matchs/${match}`);
	},
};
