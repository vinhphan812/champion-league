const { Schema, model } = require("mongoose");

const TeamSchema = new Schema(
	{
		name: String,
		founded: Date,
		description: { type: String, default: "" },
		coach: String,
		titles: [{ type: Schema.Types.ObjectId, ref: "Title" }],
		stadium: { type: Schema.Types.ObjectId, ref: "Stadium" },
		logo_path: { type: String, default: "/public/images/team.png" },
		createAt: { type: Date, default: new Date() },
		updateAt: { type: Date, default: new Date() },
	},
	{ versionKey: false }
);

const Team = model("Team", TeamSchema, "Teams");

module.exports = Team;
