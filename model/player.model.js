const { Schema, model } = require("mongoose");

const PlayerSchema = new Schema(
	{
		name: String,
		team: {
			type: Schema.Types.ObjectId,
			ref: "Team",
		},
		titles: [{ type: Schema.Types.ObjectId, ref: "Title" }],
		weight: Number,
		height: Number,
		avatar: { type: String, default: "/public/images/player_st.png" },
		numberInTeam: { type: Number, min: 0, max: 100 },
		birthday: Date,
		position: {
			type: String,
			enum: [
				"Thủ môn",
				"Hậu vệ",
				"Tiền vệ",
				"Tiền đạo",
				"Trợ lý HLV",
				"Huấn luyện viên",
				"Trung vệ",
			],
		},
		createAt: { type: Date, default: new Date() },
		updateAt: { type: Date, default: new Date() },
	},
	{ versionKey: false }
);

// localField: "team",
// foreignField: "_id",
const Player = model("Player", PlayerSchema, "Players");

module.exports = Player;
