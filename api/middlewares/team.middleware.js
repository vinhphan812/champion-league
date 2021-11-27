const Team = require("../../model/team.model");

const err = {
	success: false,
	message: "Not Found Team.",
	code: 404,
};

module.exports = async (req, res, next) => {
	const { team } = req.params;

	if (team.length != 24) return res.status(404).json(err);

	const data = await Team.findOne({ _id: team }, { __v: 0 });

	if (!data) return res.status(404).json(err);

	res.locals.team = data;
	next();
};
