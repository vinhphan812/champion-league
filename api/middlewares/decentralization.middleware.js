const User = require("../../model/user.model");

const lvlPerms = { admin: 3, manager: 2, user: 1 };

module.exports = {
	decentralization: (perms) => {
		return async (req, res, next) => {
			if (req.method == "GET") return next();

			const userId = req.signedCookies.userId;
			let userPerms = "user";

			if (userId)
				userPerms = (
					await User.findOne({
						_id: userId,
					})
				).permission;

			if (lvlPerms[userPerms] < lvlPerms[perms])
				return res.status(404).render("error/permission");

			next();
		};
	},
};
