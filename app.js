require("dotenv").config();
const express = require("express"),
	cookieParser = require("cookie-parser"),
	path = require("path"),
	mongoose = require("mongoose");

// connect db
mongoose.connect(process.env.URL_DB);

// config port
const PORT = process.env.PORT || 3000;

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
} = require("./routers/routers");

// type content used
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// public folder
app.use("/public", express.static(path.join(__dirname, "public")));

// config signed cookie
app.use(cookieParser(process.env.CECRET_KEY));

// config routers
app.use("/api", apiRoute);
app.use("/user", userRoute);
app.use("/", authRoute);
app.use("/", publicRoute);
app.use("/admin", adminRoute);

// set up view engine
app.set("view engine", "pug");
app.set("views", "./views");

// host server
app.listen(PORT, function () {
	console.log("server start at port 3000");
});
