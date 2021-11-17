module.exports = {
	infoAPI: (req, res) => {
		res.json({
			success: true,
			code: 200,
			message: "this is a api football league",
		});
	},
	getLeagues: (req, res) => {
		res.json({ success: true, code: 200, message: "Leagues" });
	},
	createLeague: (req, res, next) => {
		const {} = req.body;

		res.json({
			success: true,
			message: "League created successfully",
			code: 200,
		});
	},
	updateLeague: (req, res, next) => {},
	deleteLeague: (req, res, next) => {},
	getDetailLeague: (req, res, next) => {},
	createLeague: (req, res, next) => {},
	updateLeague: (req, res, next) => {},
	notFound: (req, res, next) => {
		res.status(404).json({
			success: false,
			message: "404 not found path",
			code: 404,
		});
	},
};
