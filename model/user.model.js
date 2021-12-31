const { Schema, model } = require("mongoose");

const userSchema = new Schema(
	{
		firstName: String,
		lastName: String,
		username: String,
		password: String,
		avatar: { type: String, default: "/public/images/user_48px.png" },
		email: String,
		phone: String,
		permission: { type: String, enum: ["admin", "manager", "user"] },
		createAt: { type: Date, default: new Date() },
		updateAt: { type: Date, default: new Date() },
	},
	{ versionKey: false }
);

const User = model("User", userSchema, "Users");

module.exports = User;
