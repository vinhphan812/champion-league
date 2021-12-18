const { Schema, model } = require("mongoose");

const DonorSchema = new Schema(
	{
		name: String,
		address: String,
		email: String,
		phone: { type: Date, maxlength: 10 },
		funding_costs: Number,
	},
	{ versionKey: false }
);

const Donor = model("Donor", DonorSchema, "Donors");

module.exports = Donor;
