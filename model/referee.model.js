const { Schema, model } = require("mongoose");

const RefereeSchema = new Schema(
	{
		name: String,
		email: String,
		phone: String,
		description: String,
		birthday: { type: Date, default: new Date() },
		avatar: { type: String, default: "/public/images/referee.png" },
		createAt: { type: Date, default: new Date() },
		updateAt: { type: Date, default: new Date() },
	},
	{ versionKey: false }
);

const Referee = model("Referee", RefereeSchema, "Referees");

module.exports = Referee;
