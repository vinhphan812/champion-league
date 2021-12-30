const League = require("../model/league.model");

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

		const data = await League.findOne({ _id: league }, { __v: 0 });

		if (!data) return res.status(404).json(err);

		res.locals.league = data;
		next();
	},
	getMatch: async (req, res, next) => {},
	updateMatch: async (req, res, next) => {},
};
