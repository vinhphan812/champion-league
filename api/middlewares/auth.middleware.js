const User = require("../../model/user.model");

module.exports = {
	authMiddleware: async (req, res, next) => {
		if (req.method == "GET") return next();
		const userId = req.signedCookies.userId;

		const error = {
			code: 401,
			success: false,
			message: "Unauthorized, you need login to continue",
		};
		if (!userId) return res.json(error);
		const user = await User.findOne({ _id: userId });

		if (!user) res.json(error);

		// res.locals.user = user;
		next();
	},
};
