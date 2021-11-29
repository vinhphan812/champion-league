const { Schema, model } = require("mongoose");

const RuleSchema = new Schema(
	{
		name: String,
		description: String,
		createAt: { type: Date, default: new Date() },
		updateAt: { type: Date, default: new Date() },
	},
	{ versionKey: false }
);

const Rule = model("Rule", RuleSchema, "Rules");

module.exports = Rule;
