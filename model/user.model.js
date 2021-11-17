const { Schema, model } = require("mongoose");

const userSchema = new Schema({
	firstName: String,
	lastName: String,
	username: String,
	password: String,
	email: String,
	isVerifyEmail: Boolean,
	phone: String,
	permission: { type: String, enum: ["admin", "manager", "user"] },
});

const User = model("User", userSchema, "Users");

module.exports = User;
