const md5 = require("md5"),
	{ sendMail } = require("../modules/mailer.js");
const User = require("../model/user.model");

module.exports = {
	loginPage: (req, res, next) => {
		res.render("auth/login", { isLogin: true });
	},
	postLogin: async (req, res, next) => {
		const { username, pass } = req.body;
		const user = await User.findOne({
			$and: [
				{
					$or: [
						{ username },
						{ email: username },
						{ phone: username },
					],
				},
				{ password: md5(pass) },
			],
		});

		if (!user) {
			return res.render("auth/login", {
				username,
				pass,
				errors: ["username or password is incorrect"],
			});
		}

		res.cookie("userId", user._id.toString(), {
			signed: true,
			// maxAge: 60 * 60 * 1000,
		});
		if (user.permission == "admin") res.redirect("/admin");
		else res.redirect("/manager");
	},
	forgotPage: (req, res, next) => {
		res.render("auth/forgot");
	},
	postForgot: async (req, res, next) => {
		const { email } = req.body;

		const user = await User.findOne({ email });

		if (user) {
			sendMail(email);
			res.redirect("/login");
		} else res.render("auth/forgot", { errors: ["Account Not Found."] });
	},
};
