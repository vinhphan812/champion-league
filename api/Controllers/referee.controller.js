const Referee = require("../../model/referee.model");

module.exports = {
	getReferees: async (req, res, next) => {
		const data = await Referee.find({}, { _id: 1, avatar: 1, name: 1 });
		res.json({ success: true, data });
	},
	getReferee: async (req, res, next) => {
		const { referee } = res.locals;

		res.json({ success: true, data: referee });
	},
	updateReferee: async (req, res, next) => {
		try {
			const { body } = req,
				{ referee } = res.locals;

			body.updateAt = new Date();

			await Team.updateOne({ _id: referee }, body);

			res.json({
				success: true,
				code: 200,
				message: `cập nhật đội bóng ${referee.name} thành công!`,
			});
		} catch (error) {
			res.json({
				success: false,
				code: 403,
				message: error.message,
			});
		}
	},
	removeReferee: async (req, res, next) => {
		const { referee } = res.locals;

		await Referee.deleteOne({ _id: referee.id });

		res.json({
			success: true,
			message: `Xóa trọng tài ${referee.name} thành công!`,
		});
	},
};
