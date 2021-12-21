const Donor = require("../../model/donor.model");

module.exports = {
	getDonors: async (req, res, next) => {
		const donors = await Donor.find(
			{},
			{ _id: 1, name: 1, startTime: 1, logo_path: 1 }
		);
		res.json({ code: 200, data: donors, success: true });
	},
	getDonor: async (req, res, next) => {
		const { donor } = res.locals;

		res.json({
			success: true,
			data: donor,
			code: 200,
		});
	},
	updateDonor: async (req, res, next) => {
		const { _id, name } = res.locals.donor;

		// handle update

		res.json({
			success: true,
			data: league,
			message: `Updated ${name} successfully`,
			code: 200,
		});
	},
	removeDonor: async (req, res, next) => {
		const { _id, name } = res.locals.donor;

		await Donor.deleteOne({ _id });

		res.json({
			success: true,
			message: `Deleted ${name} successfully`,
			code: 200,
		});
	},
};
