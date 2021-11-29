const Rule = require("../../model/rule.model");

module.exports = async (req, res, next) => {
	const { rule } = req.params;

	if (rule.length != 24)
		return res.status(404).json({
			success: false,
			code: 400,
			message: "Rule length must be 24 characters",
		});
	const data = await Rule.findOne({ _id: rule });

	if (!data)
		return res.status(404).json({
			success: false,
			code: 404,
			message: "Rule not found",
		});

	res.locals.rule = data;
	next();
};
