const Rule = require("../../model/rule.model");

module.exports = {
	getRules: async (req, res) => {
		const rules = await Rule.find({});
		res.status(200).json({
			succes: true,
			code: 200,
			message: "OK",
			data: rules,
		});
	},
	// CURD rule
	createRule: async (req, res) => {
		const { body } = res.locals;

		const rule = await Rule.create(body);

		res.json({ success: true, code: 200, message: "OK", data: rule });
	},
	updateRule: async (req, res) => {
		const { _id, createAt } = res.locals.rule,
			{ body } = req;

		body.createAt = createAt;
		body.updateAt = new Date();

		console.log(body);

		await Rule.updateOne({ _id }, body);

		const rule = await Rule.find({ _id });

		res.json({ success: true, code: 200, message: "OK", data: rule });
	},
	getRule: async (req, res) => {
		const { rule } = res.locals;

		res.json({ success: true, code: 200, message: "OK", data: rule });
	},
	removeRule: async (req, res) => {
		const { rule } = req.params;

		await Rule.deleteOne({ _id: rule });

		res.json({
			success: true,
			code: 200,
			message: "deleted Rule successful",
		});
	},
};
