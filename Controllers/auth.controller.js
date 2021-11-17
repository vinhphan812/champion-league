const { nanoid } = require("nanoid"),
	md5 = require("md5"),
	{ sendMail } = require("../modules/mailer.js");
const User = require("../model/user.model"),
	Permission = require("../model/permission.model");

module.exports = {
	loginPage: (req, res, next) => {
		res.render("auth/login");
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
			maxAge: 60 * 60 * 1000,
		});
		if (user.permission == "admin") res.redirect("/admin");
		else res.redirect("/");
	},
	registerPage: (req, res, next) => {
		res.render("auth/register");
	},
	postRegister: async (req, res, next) => {
		const { user, pass, confirm, email, phone, firstName, lastName } =
				req.body,
			errors = [];

		try {
			const correct = await User.find({
				$or: [{ email }, { phone }],
			});
			if (correct.length) {
				errors.push("Email, số điện thoại đã được đăng kí.");
				return res.render("auth/register", {
					errors,
					user,
					pass,
					confirm,
					email,
					phone,
					firstName,
					lastName,
				});
			}

			const info = new User({
				username: user,
				password: md5(pass),
				email,
				firstName,
				lastName,
				phone,
				permission: "user",
			});

			const result = await info.save();
			console.log(result);
			res.redirect("/");
		} catch (error) {
			console.log(error);
			errors.push(["Xảy ra lỗi khi tạo tài khoản"]);
			res.render("auth/register", {
				errors,
				user,
				pass,
				confirm,
				email,
				phone,
				firstName,
				lastName,
			});
		}
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
