const { Schema, model } = require("mongoose");

const LeagueSchema = new Schema({
	title: String,
	startTime: Date,
	endTime: Date,
});

const League = model("League", LeagueSchema, "Leagues");

module.exports = League;
