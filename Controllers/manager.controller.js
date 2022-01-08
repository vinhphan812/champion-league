const { initMatchs } = require("../modules/schedule");

const League = require("../model/league.model"),
	Team = require("../model/team.model"),
	Match = require("../model/match.model"),
	Player = require("../model/player.model"),
	Stadium = require("../model/stadium.model"),
	Donor = require("../model/donor.model"),
	Referee = require("../model/referee.model"),
	Join = require("../model/join.model"),
	MatchDetail = require("../model/matchDetail.model"),
	Rule = require("../model/rule.model");

module.exports = {
	getManagerPage: async (req, res, next) => {
		res.locals.leagues = await League.find({});
		res.locals.teams = await Team.find({});
		res.locals.donors = await Donor.find({});
		res.locals.referees = await Referee.find({});
		res.locals.rules = await Rule.find({});

		res.locals.scripts = ["/public/js/manager.js"];

		res.render("manager/home");
	},
	getCreateLeaguePage: (req, res, next) => {
		res.locals.body = {};
		res.render("manager/createLeague");
	},
	getCreateTeamPage: (req, res, next) => {
		res.locals.body = {};
		res.locals.scripts = ["/public/js/createTeam.js"];
		res.render("manager/createTeam");
	},
	createLeague: async (req, res, next) => {
		// get body. then validation data
		const { body } = res.locals;

		// create league
		const league = await League.create(body);

		// find all team and referee
		const teams = await Team.find({});
		const referees = await Referee.find({});

		//TODO create join data in Joins collection
		for (const { id } of teams) Join.create({ team: id, league: league });

		// init matchs => {go: [...], back: [...]}
		const matchs = initMatchs(teams, new Date(body.startTime));

		// init match list is a Array (convert match)
		const matchList = [];

		// create matchs Object
		//TODO convert match => match Object
		for (const round in matchs)
			matchs[round].forEach(({ teamA, teamB, date }) => {
				matchList.push({
					name: teamA.name + " - " + teamB.name,
					teams: [teamA, teamB],
					date,
					round,
					stadium: teamA.stadium,
					league,
					referees: randomReferee(referees),
				});
			});

		// add matchs into db
		await Match.insertMany(matchList);

		// go to league page
		return res.redirect("/manager/leagues/" + league._id);
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

		const data = await Team.findOne({ _id: team }).populate([
			"stadium",
			"titles",
		]);

		if (!data) return next();

		res.locals.scripts = ["/public/js/team.manager.js"];
		res.locals.team = data;

		res.render("team");
	},
	getDonorsPage: async (req, res, next) => {
		const { donor } = req.params;
		if (donor.length !== 24) return next();

		const data = await Donor.findOne({ _id: donor });

		if (!data) return next();

		res.locals.donor = data;

		res.render("donor");
	},
	getCreateDonor: async (req, res, next) => {
		res.locals.body = {};
		res.render("manager/createDonor");
	},
	createDonor: async (req, res, next) => {
		const data = await Donor.create(req.body);
		res.redirect("/manager");
	},
	getCreateReferee: async (req, res, next) => {
		res.locals.body = {};
		res.render("manager/createReferee");
	},
	createReferee: async (req, res, next) => {
		const data = await Referee.create(req.body);
		res.redirect("/manager");
	},
	getPlayer: async (req, res, next) => {
		const { team, player } = req.params;

		if (team.length !== 24 || player.length !== 24) return next();

		const data = await Player.findOne({ _id: player, team }).populate(
			"team"
		);

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

		console.log(data);

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
};

function random(min = 0, max) {
	return Math.floor(Math.random() * (max - min + 1) + min);
}

function randomReferee(referees) {
	const length = referees.length - 1;
	const refereeList = [];
	while (refereeList.length < 4) {
		const referee = referees[random(0, length)];
		if (!refereeList.includes(referee)) refereeList.push(referee);
	}
	return refereeList;
}
