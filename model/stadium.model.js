const { Schema, model } = require("mongoose");

const StadiumSchema = new Schema(
	{
		name: String,
		address: String,
		capacity: Number,
		team: { type: Schema.Types.ObjectId, ref: "Team" },
		createAt: { type: Date, default: new Date() },
		updateAt: { type: Date, default: new Date() },
	},
	{ versionKey: false }
);

const Stadium = model("Stadium", StadiumSchema, "Stadiums");

module.exports = Stadium;
