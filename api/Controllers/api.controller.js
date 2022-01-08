const { DEFAULT_IGNORE_FIELD } = require("../../utils");

const moment = require("moment");

const Match = require("../../model/match.model");

module.exports = {
	infoAPI: (req, res) => {
		res.json({
			success: true,
			code: 200,
			message: "this is a api football league",
		});
	},
	notFound: (req, res, next) => {
		res.status(404).json({
			success: false,
			message: "404 not found path",
			code: 404,
		});
	},
	getMatchInWeek: async (req, res, next) => {
		const start = moment(req.query.start);
		const end = moment(req.query.end);

		const data = await Match.find(
			{
				date: {
					$gte: start,
					$lt: end,
				},
				scores: { $size: 0 },
			},
			{ ...DEFAULT_IGNORE_FIELD }
		)
			.limit(10)
			.populate("teams")
			.populate("stadium");
		res.json({
			success: true,
			data,
			date: `${start.format("DD/MM/YYYY")} - ${end.format(
				"DD/MM/YYYY"
			)}`,
		});
	},
};
