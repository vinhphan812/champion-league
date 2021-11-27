const { Schema, model } = require("mongoose");

const PlayerSchema = new Schema(
	{
		name: String,
		teamId: { type: Schema.Types.ObjectId, ref: "Team" },
		weight: Number,
		height: Number,
		avatar: { type: String, default: "/" },
		numberInTeam: { type: Number, min: 0, max: 100 },
		birthday: Date,
		position: { type: String, enum: [] },
		leagueId: { type: Schema.Types.ObjectId, ref: "Leagues" },
	},
	{ versionKey: false }
);

const Player = model("Player", PlayerSchema, "Players");

module.exports = Player;
