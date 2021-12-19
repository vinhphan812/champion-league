const Stadium = require("../../model/stadium.model"),
	Team = require("../../model/team.model");

module.exports = {
	checkStadium: async (req, res, next) => {
		const { stadium } = req.params,
			{ body } = req;

		if (stadium.length !== 24)
			return res.status(403).json({
				success: false,
				message: "Stadium id invalid",
				code: 403,
			});

		res.locals.stadium = await Stadium.findOne({ _id: stadium });
		res.locals.body = body;
		next();
	},
	createStadium: async (req, res) => {
		const { team } = req.params;
		const { name, address, capacity } = req.body;

		if (!name || !address || !capacity)
			res.status(403).json({
				success: false,
				message: "Invalid name, address or capacity",
				code: 403,
			});

		const stadium = await Stadium.create({ ...req.body, team });

		await Team.updateOne(
			{ _id: team },
			{ $set: { stadium: stadium.id } }
		);
		await res.json({
			success: true,
			message: "create stadium successful",
			data: stadium,
		});
	},
	updateStadium: async (req, res) => {
		const { stadium } = req.params,
			{ body } = req;
		await Stadium.updateOne({ _id: stadium }, { $set: body });
		res.json({ success: true, message: "update Stadium successful" });
	},
	removeStadium: async (req, res) => {
		const { stadium } = req.params;
		await Team.updateOne({ stadium }, { $unset: { stadium: 1 } });

		await Stadium.deleteOne({ _id: stadium });
		res.json({ success: true, message: `delete ${stadium} successful` });
	},
};
