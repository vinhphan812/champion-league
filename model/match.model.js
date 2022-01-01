const { Schema, model } = require("mongoose");

const MatchSchema = new Schema(
	{
		name: String,
		teams: [{ type: Schema.Types.ObjectId, ref: "Team" }],
		date: Date,
		round: { enum: ["go", "back"], type: String },
		scores: [Number],
		stadium: { type: Schema.Types.ObjectId, ref: "Stadium" },
		league: { type: Schema.Types.ObjectId, ref: "League" },
		referees: [{ type: Schema.Types.ObjectId, ref: "Referee" }],
		createAt: { type: Date, default: new Date() },
		updateAt: { type: Date, default: new Date() },
	},
	{ versionKey: false }
);

const Match = model("Match", MatchSchema, "Matchs");

module.exports = Match;
