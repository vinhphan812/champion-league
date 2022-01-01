const { Schema, model } = require("mongoose");

const JoinSchema = new Schema(
	{
		team: { type: Schema.Types.ObjectId, ref: "Team" },
		league: { type: Schema.Types.ObjectId, ref: "League" },
		score: { type: Number, default: 0 },
		createAt: { type: Date, default: new Date() },
		updateAt: { type: Date, default: new Date() },
	},
	{ versionKey: false }
);

const Join = model("Join", JoinSchema, "Joins");

module.exports = Join;
