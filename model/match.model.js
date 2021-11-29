const { Schema, model } = require("mongoose");

const MatchSchema = new Schema(
	{
		name: String,
		description: String,
		teams: [{ type: Schema.Types.ObjectId, ref: "Team" }],
		startTime: Date,
		placeIn: String,
		leagueId: { type: Schema.Types.ObjectId, ref: "Leagues" },
		createAt: { type: Date, default: new Date() },
		updateAt: { type: Date, default: new Date() },
	},
	{ versionKey: false }
);

const Match = model("Match", MatchSchema, "Matchs");

module.exports = Match;
