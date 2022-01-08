const Title = require("../../model/title.model"),
	Player = require("../../model/player.model"),
	Team = require("../../model/team.model");

module.exports = {
	getTitles: async (req, res) => {
		const data = await Title.find({}, { _id: 1, name: 1 });
		res.json({ success: true, data });
	},
	createTitle: async (req, res) => {
		const data = await Title.create(req.body);
		res.json({ success: true, data });
	},
	titleMiddlware: async (req, res, next) => {
		const { title } = req.params;

		if (title.length !== 24)
			return res.status(404).json({
				success: false,
				message: "length must be 24 characters",
			});

		const data = await Title.findOne({ _id: title });
		if (!data)
			return res
				.status(404)
				.json({ success: false, message: "Not found title" });

		res.locals.title = data;
		next();
	},
	getTitle: (req, res) => {
		res.json({ success: true, data: res.locals.title });
	},
	updateTitle: async (req, res) => {
		const { title } = res.locals;
		const { body } = req;

		body.updateAt = new Date();
		body.createAt = title.createAt;

		await Title.updateOne({ _id: title.id }, { $set: body });
		res.json({ success: true, message: "Cập nhật danh hiệu thành công" });
	},
	removeTitle: async (req, res) => {
		const { title } = req.params;
		await Title.deleteOne({ _id: title });

		await Team.updateMany({}, { $pull: { titles: title } });
		await Player.updateMany({}, { $pull: { titles: title } });

		res.json({ success: true, message: "Xóa danh hiệu thành công" });
	},
	tagFor: async (req, res) => {
		const { title } = res.locals;
		const { type, id } = req.body;
		switch (type) {
			case "team":
				await Team.updateOne(
					{ _id: id },
					{ $push: { titles: title.id } }
				);

				break;
			case "player":
				await Player.updateOne(
					{ _id: id },
					{ $push: { titles: [title.id] } }
				);
				break;
		}
		res.json({ success: true, message: "Cập nhật thành công!!!" });
	},
};
