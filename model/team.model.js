const { Schema, model } = require("mongoose");

const TeamSchema = new Schema(
	{
		name: String,
		founded: Date,
		manager: String,
		logo_path: { type: String, default: "/" },

		createAt: { type: Date, default: new Date() },
		updateAt: { type: Date, default: new Date() },
	},
	{ versionKey: false }
);

const Team = model("Team", TeamSchema, "Teams");

module.exports = Team;
