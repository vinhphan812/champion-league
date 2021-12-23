const Referee = require("../../model/referee.model");

module.exports = async (req, res, next) => {
	const { referee } = req.params;

	if (referee.length !== 24)
		return res.status(404).json({
			success: false,
			code: 400,
			message: "length must be 24 characters",
		});

	const data = await Referee.findOne({ _id: referee }, { __v: 0 });

	if (!data)
		return res
			.status(404)
			.json({
				success: false,
				code: 404,
				message: "referee not found",
			});

	res.locals.referee = data;
	next();
};
