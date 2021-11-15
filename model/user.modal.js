const { Schema, model } = require("mongoose");

const userSchema = new Schema({
	firstName: String,
	lastName: String,
	username: String,
	password: String,
	email: String,
	phone: String,
});

const User = model("User", userSchema, "Users");

module.exports = User;
