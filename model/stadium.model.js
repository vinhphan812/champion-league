const { Schema, model } = require("mongoose");

const StadiumSchema = new Schema(
	{
		name: String,
		capacity: Number,
		teamId: { type: Schema.Types.ObjectId, ref: "Team" },
		createAt: { type: Date, default: new Date() },
		updateAt: { type: Date, default: new Date() },
	},
	{ versionKey: false }
);

const Stadium = model("Player", StadiumSchema, "Players");

module.exports = Stadium;
