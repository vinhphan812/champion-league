const { Schema, model } = require("mongoose");

const DonorSchema = new Schema(
	{
		name: String,
		address: String,
		description: String,
		email: String,
		phone: { type: String },
		funding: Number,
		logo_path: { type: String, default: "/public/images/donate.png" },
	},
	{ versionKey: false }
);

const Donor = model("Donor", DonorSchema, "Donors");

module.exports = Donor;
