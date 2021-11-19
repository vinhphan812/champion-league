const { Schema, model } = require("mongoose");

const LeagueSchema = new Schema(
	{
		leagueName: String,
		description: String,
		startTime: Date,
		endTime: Date,
	},
	{ versionKey: false }
);

const League = model("League", LeagueSchema, "Leagues");

module.exports = League;
