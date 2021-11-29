const User = require("../model/user.model");

module.exports = {
	authMiddleware: async (req, res, next) => {
		const userId = req.signedCookies.userId;

		if (!userId) return res.redirect("/login");

		const user = await User.findOne({ _id: userId });

		if (!user) res.redirect("/login");

		res.locals.user = user;

		next();
	},
};
