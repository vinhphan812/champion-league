const authRoute = require("./auth.route"),
	publicRoute = require("./public.route"),
	adminRoute = require("./admin.route"),
	managerRoute = require("./manager/manager.route");

module.exports = {
	authRoute,
	publicRoute,
	adminRoute,
	managerRoute,
};
