const User = require("../model/user.model");

const lvlPerms = { admin: 3, manager: 2, user: 1 };

module.exports = {
	decentralization: (perms) => {
		return async (req, res, next) => {
			const userId = req.signedCookies.userId;

			const { permission: userPerms } = await User.findOne({
				_id: userId,
			});

			if (lvlPerms[userPerms] >= lvlPerms[perms]) return next();

			res.status(404).render("error/permission");
		};
	},
};
