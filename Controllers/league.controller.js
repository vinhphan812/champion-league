const { DEFAULT_IGNORE_FIELD, SCORE_WIN, SCORE_DRAW } = require("../utils");

const League = require("../model/league.model"),
	Match = require("../model/match.model"),
	MatchDetail = require("../model/matchDetail.model"),
	Join = require("../model/join.model");
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
		res.locals.scripts = ["/public/js/match.manager.js"];

		res.render("match");
	},
	updateMatchPage: async (req, res, next) => {
		const { match } = req.params;

		const data = await Match.findById(match).populate("teams");
		res.locals.scripts = ["/public/js/updateMatch.js"];
		res.locals.links = [
			"https://pro.fontawesome.com/releases/v5.10.0/css/all.css",
			"/public/css/updateMatch.css",
		];
		res.locals.match = data;
		res.render("manager/updateMatch");
	},
	postUpdateMatch: async (req, res, next) => {
		const { league, match } = req.params;
		const details = JSON.parse(req.body.details);

		const wasUpdated = await MatchDetail.find({ match });

		if (wasUpdated.length)
			return res.render("manager/updateMatch", {
				errors: ["Trận đấu đã có Tỉ số"],
			});

		await MatchDetail.insertMany(details);

		const matchData = await Match.findOne({ _id: match });

		const scores = new Array(2);

		// make score for team
		for (var i = 0; i < scores.length; i++) {
			scores[i] = makeMatchScore(details, matchData.teams[i]);
		}

		// TODO: update score in Joins Collection

		// * score teamA > score TeamB => A wins => A + SCORE_WIN in Utils.
		if (scores[0] > scores[1]) {
			await Join.updateOne(
				{ league, team: matchData.teams[0] },
				makeIncScore(SCORE_WIN)
			);
		} else if (scores[0] < scores[1]) {
			await Join.updateOne(
				{ league, team: matchData.teams[1] },
				makeIncScore(SCORE_WIN)
			);
		} else {
			await Join.updateOne(
				{ league, team: matchData.teams[0] },
				makeIncScore(SCORE_DRAW)
			);
			await Join.updateOne(
				{ league, team: matchData.teams[1] },
				makeIncScore(SCORE_DRAW)
			);
		}

		await Match.updateOne({ _id: match }, { scores });
		res.redirect(`/manager/leagues/${league}/matchs/${match}`);
	},
	getReportPage: async (req, res, next) => {
		const { league } = req.params;
		res.locals.scripts = ["/public/js/report.js"];

		res.locals.joins = await Join.find({ league })
			.populate({ path: "team", populate: { path: "titles" } })
			.sort({ score: -1 });

		const data = await MatchDetail.find({ league }).populate({
			path: "player",
			populate: { path: "titles" },
		});

		// object players => {id, name, team, goals, red, yellow}
		const players = [];

		data.forEach((e) => {
			let index = players.findIndex(
				(i) => e.player.id == i.player?.id
			);

			if (index == -1) {
				players.push({
					player: e.player,
					goals: 0,
					red: 0,
					yellow: 0,
				});
				index = players.length - 1;
			}
			switch (e.type) {
				case "goal":
					players[index].goals++;
					break;
				case "red":
					players[index].red++;
					break;
				case "yellow":
					players[index].yellow++;
					break;
			}
		});
		players.sort((a, b) => b.goals - a.goals);

		res.locals.players = players;
		res.locals.scripts = ["/public/js/report.js"];

		res.render("manager/reportLeague");
	},
	postReportPage: async (req, res, next) => {},
};

function makeMatchScore(list, team) {
	return list.reduce(
		(res, item) => res + (item.team == team && item.type == "goal"),
		0
	);
}

function makeIncScore(score) {
	return { $inc: { score } };
}

function updateScoreInRank() {}
