const { Schema, model } = require("mongoose");

const TeamSchema = new Schema(
	{
		name: String,
		founded: Date,
		manager: String,
		logo_path: String,
		drop_path: String,
		leagueId: { type: Schema.Types.ObjectId, ref: "Leagues" },
	},
	{ versionKey: false }
);

const Team = model("Team", TeamSchema, "Teams");

module.exports = Team;
