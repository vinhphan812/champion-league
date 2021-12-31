module.exports = {
	registerValidation: (req, res, next) => {
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

		next();
	},
	loginValidation: (req, res, next) => {
		const { username, pass } = req.body;

		if (!username || !pass)
			return res.render("auth/login", {
				username,
				pass,
				errors: ["Vui lòng điền tên đăng nhập hoặc mật khẩu!!!"],
			});

		next();
	},
};
