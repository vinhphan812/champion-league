const Donor = require("../../model/donor.model");

module.exports = async (req, res, next) => {
	const { donor } = req.params;

	if (donor.length !== 24)
		return res.status(404).json({
			success: false,
			code: 400,
			message: "length must be 24 characters",
		});

	const data = await Donor.findOne({ _id: donor }, { __v: 0 });

	if (!data) return res.status(404).json(err);

	res.locals.donor = data;
	next();
};
