const League = require("../../model/league.model");

const err = {
	success: false,
	message: "League Not Found",
	code: 404,
};

module.exports = async (req, res, next) => {
	const { league } = req.params;

	if (league.length != 24)
		return res.status(404).json({
			success: false,
			code: 400,
			message: "length must be 24 characters",
		});

	const data = await League.findOne({ _id: league }, { __v: 0 });

	if (!data) return res.status(404).json(err);

	res.locals.league = data;
	next();
};
