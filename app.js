require("dotenv").config();
const express = require("express"),
	cookieParser = require("cookie-parser"),
	path = require("path"),
	mongoose = require("mongoose");

// console.log(process.env.URL_DB);
mongoose.connect(process.env.URL_DB);

const PORT = process.env.PORT || 3000;

const app = express();

const apiRoute = require("./api/routers/api.route"),
	userRoute = require("./routers/user.route"),
	authRoute = require("./routers/auth.route");

app.use("/public", express.static(path.join(__dirname, "public")));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser(process.env.CECRET_KEY));
app.use("/api", apiRoute);
app.use("/user", userRoute);
app.use("/", authRoute);

app.set("view engine", "pug");
app.set("views", "./views");

app.listen(PORT, function () {
	console.log("server start at port 3000");
});
