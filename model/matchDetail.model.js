const { Schema, model } = require("mongoose");

const matchDetailSchema = new Schema(
	{
		match: { type: Schema.Types.ObjectId, ref: "Match" },
		player: { type: Schema.Types.ObjectId, ref: "Player" },
		team: { type: Schema.Types.ObjectId, ref: "Team" },
		type: { type: String, enum: ["goal", "yellow", "red"] },
		time: String,
	},
	{ versionKey: false }
);

const Donor = model("Donor", matchDetailSchema, "Donors");

module.exports = Donor;
