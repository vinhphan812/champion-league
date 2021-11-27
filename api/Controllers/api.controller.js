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
};
