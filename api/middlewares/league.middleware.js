const League = require("../../model/league.model");

const err = {
	success: false,
	message: "Not Found League.",
	code: 404,
};

module.exports = async (req, res, next) => {
	const { league } = req.params;

	if (league.length != 24) return res.status(404).json(err);

	const data = await League.findOne({ _id: league }, { __v: 0 });

	if (!data) return res.status(404).json(err);

	res.locals.league = data;
	next();
};
