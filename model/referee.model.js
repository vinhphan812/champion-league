const { Schema, model } = require("mongoose");

const RefereeSchema = new Schema(
	{
		name: String,
		birthday: { type: Date, default: new Date() },
		phone: { type: String, maxLength: 10 },
	},
	{ versionKey: false }
);

const Referee = model("Referee", RefereeSchema, "Referees");

module.exports = Referee;
