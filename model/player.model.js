const { Schema, model } = require("mongoose");

const PlayerSchema = new Schema(
	{
		name: String,
		teamId: { type: Schema.Types.ObjectId, ref: "Team" },
		weight: Number,
		height: Number,
		avatar: { type: String, default: "/public/images/player_st.png" },
		numberInTeam: { type: Number, min: 0, max: 100 },
		birthday: Date,
		position: { type: String, enum: [] },
		leagueId: { type: Schema.Types.ObjectId, ref: "Leagues" },
		createAt: { type: Date, default: new Date() },
		updateAt: { type: Date, default: new Date() },
	},
	{ versionKey: false }
);

const Player = model("Player", PlayerSchema, "Players");

module.exports = Player;
