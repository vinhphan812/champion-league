const { Schema, model } = require("mongoose");

const permissionSchema = new Schema({
	permission: String,
	description: String,
});

const Permission = model("Permission", permissionSchema, "Permission");

module.exports = Permission;
