const { Schema, model } = require("mongoose");

const TitleSchema = new Schema(
	{
		name: String,
		createAt: { type: Date, default: new Date() },
		updateAt: { type: Date, default: new Date() },
		tagFor: { type: Schema.Types.ObjectId },
	},
	{ versionKey: false }
);

const Title = model("Title", TitleSchema, "Titles");

module.exports = Title;
