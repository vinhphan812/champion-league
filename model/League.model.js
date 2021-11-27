const { Schema, model } = require("mongoose");

const LeagueSchema = new Schema(
	{
		name: String,
		description: String,
		startTime: Date,
		endTime: Date,
		logo_path: { type: String, default: "/" },
		backdrop_path: { type: String, default: "/" },
	},
	{ versionKey: false }
);

const League = model("League", LeagueSchema, "Leagues");

module.exports = League;
