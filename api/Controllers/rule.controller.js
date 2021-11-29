const Rule = require("../../model/rule.model");

module.exports = {
	getRules: async (req, res) => {
		const rules = await Rule.find({});
		res.json({ succes: true, code: 200, message: "OK", data: rules });
	},
	// CURD rule
	addRule: async (req, res) => {},
	updateRule: async (req, res) => {},
	getRule: async (req, res) => {},
	removeRule: async (req, res) => {},
};
