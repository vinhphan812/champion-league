const User = require("../model/user.model");

module.exports = async (req, res, next) => {
	const userId = req.signedCookies.userId;
	if (userId) {
		const user = await User.findOne({ _id: userId });

		if (user) res.locals.user = user;
	}

	res.render("error/404");
};
