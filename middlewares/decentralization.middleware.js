const moment = require("moment");

const User = require("../model/user.model");

const lvlPerms = { admin: 3, manager: 2, user: 1 };
const menus = {
	admin: [
		{ title: "Quản Trị", url: "/admin" },
		{ title: "Quản Lý", url: "/manager" },
	],
	manager: [{ title: "Quản Lý", url: "/manager" }],
	user: [],
};

module.exports = {
	decentralization: (perms) => {
		return async (req, res, next) => {
			const userId = req.signedCookies.userId;
			let userPerms = "user";

			res.locals.moment = moment;

			if (userId)
				userPerms = (
					await User.findOne({
						_id: userId,
					})
				).permission;

			if (lvlPerms[userPerms] < lvlPerms[perms])
				return res.status(404).render("error/permission");

			res.locals.menu = menus[userPerms];

			next();
		};
	},
};
