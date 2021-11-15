const { nanoid } = require("nanoid"),
	md5 = require("md5"),
	mongoose = require("mongoose"),
	User = require("../model/user.modal");

module.exports = {
	loginPage: (req, res, next) => {
		res.send("Login page");
	},
	postLogin: (req, res, next) => {
		res.send("post login");
	},
	registerPage: (req, res, next) => {
		res.render("auth/register");
	},
	postRegister: async (req, res, next) => {
		const { user, pass, confirm, email, phone, firstName, lastName } =
				req.body,
			errors = [];
		if (
			!user ||
			!pass ||
			!confirm ||
			!email ||
			!phone ||
			!firstName ||
			!lastName
		)
			errors.push("Vui lòng điền đầy đủ thông tin để đăng kí.");

		if (errors.length)
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
		try {
			console.log(email, phone);
			const correct = await User.find({
				$or: [{ email }, { phone }],
			});
			if (correct.length) {
				errors.push(["Email, số điện thoại đã được đăng kí."]);
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
			});
			await info.save();
			res.redirect("/");
		} catch (error) {
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
};
