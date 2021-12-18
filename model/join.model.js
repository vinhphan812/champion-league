const { Schema, model } = require("mongoose");

const JoinSchema = new Schema(
	{
		team: { type: Schema.Type.ObjectId, ref: "Teams" },
		league: { type: Schema.Type.ObjectId, ref: "Leagues" },
		createAt: { type: Date, default: new Date() },
		updateAt: { type: Date, default: new Date() },
	},
	{ versionKey: false }
);

const Join = model("Join", JoinSchema, "Joins");

module.exports = Join;
