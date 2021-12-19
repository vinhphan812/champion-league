const matchDay = [];
const startDate = new Date("January 15, 2021 18:00:00");
function initFirstLeg(date) {
	// First Leg là lượt đi
	for (let round = 0; round < match.length / 10; round++) {
		initFridayMatch(round);
		initWeekendMatch(round);
		date.setDate(date.getDate() + 5);
	}
}

function initSecondLeg(date) {
	// Second Leg là lượt về
	match = match.sort((a, b) => 0.5 - Math.random());
	date = startDate;
	for (let round = 0; round < match.length / 10; round++) {
		initFridayMatch(date, round);
		initWeekendMatch(date, round);
		date.setDate(date.getDate() + 5);
	}
}
initFirstLeg(startDate);
initSecondLeg(startDate);

function initFridayMatch(round) {
	for (let index = 0; index < 2; index++) {
		let date = {};
		date.name = match[round * 10 + index];
		date.date = new Date(
			startDate.getFullYear(),
			startDate.getMonth(),
			startDate.getDate(),
			startDate.getHours() + index
		);
		matchDay.push(date);
	}
}

function initWeekendMatch(round) {
	for (let index = 0; index < 2; index++) {
		startDate.setHours(startDate.getHours() + 24);
		for (let index = 0; index < 4; index++) {
			let date = {};
			date.name = match[round * 10 + index + 2];
			date.date = new Date(
				startDate.getFullYear(),
				startDate.getMonth(),
				startDate.getDate(),
				startDate.getHours() + index
			);
			matchDay.push(date);
		}
	}
}
