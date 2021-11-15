module.exports = function (req, res, next) {
	const userId = req.signedCookies.userId;
	if (!userId) return res.redirect("/login");

     // get user from db 
     const user;
     if(!user) res.redirect("/login");
	res.locals.user = user;
	next();
};
