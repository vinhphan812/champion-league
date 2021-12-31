const League = require("../model/league.model"),
	Match = require("../model/match.model");

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
		res.render("match");
	},
	updateMatch: async (req, res, next) => {
		const { match } = res.locals;
	},
};
