require("dotenv").config();
const express = require("express"),
	cookieParser = require("cookie-parser"),
	path = require("path"),
	mongoose = require("mongoose");

// connect db
mongoose.connect(process.env.URL_DB);

// config port
const PORT = process.env.PORT || 5000;

// init app
const app = express();

// api router
const apiRoute = require("./api/routers/api.route");

// app routers
const {
	userRoute,
	authRoute,
	publicRoute,
	adminRoute,
	managerRoute,
} = require("./routers/routers");

const {
	decentralization,
} = require("./middlewares/decentralization.middleware");

const notFoundMiddlware = require("./middlewares/error.middleware");

// type content used
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// public folder
app.use("/public", express.static(path.join(__dirname, "public")));

// config signed cookie
app.use(cookieParser(process.env.CECRET_KEY));

app.use(decentralization("user"));

// config routers
app.use("/api", apiRoute);
app.use("/user", userRoute);
app.use("/", authRoute);
app.use("/", publicRoute);
app.use("/admin", adminRoute);
app.use("/manager", managerRoute);

// set up view engine
app.set("view engine", "pug");
app.set("views", "./views");

// error 404
app.use(notFoundMiddlware);

// host server
app.listen(PORT, function () {
	console.log("server start at port 3000");
});
