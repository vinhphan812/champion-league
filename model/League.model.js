const { Schema, model } = require("mongoose");

const LeagueSchema = new Schema(
	{
		name: String,
		description: String,
		startTime: Date,
		logo_path: { type: String, default: "/public/images/league.png" },
		isReport: { type: Boolean, default: false },
		createAt: { type: Date, default: new Date() },
		updateAt: { type: Date, default: new Date() },
	},
	{ versionKey: false }
);

const League = model("League", LeagueSchema, "Leagues");

module.exports = League;
