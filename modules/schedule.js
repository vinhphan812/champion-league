function initFirstLeg(start, match) {
	const res = [];
	// First Leg là lượt đi
	for (let round = 0; round < match.length / 10; round++) {
		res.push(...initFridayMatch(match, round, start));
		res.push(...initWeekendMatch(match, round, start));
		start.setDate(start.getDate() + 5);
	}
	return res;
}

function initSecondLeg(start, match) {
	// Second Leg là lượt về
	const res = [];
	for (let round = 0; round < match.length / 10; round++) {
		res.push(...initFridayMatch(match, round, start));
		res.push(...initWeekendMatch(match, round, start));
		start.setDate(start.getDate() + 5);
	}
	return res;
}

function initFridayMatch(match, round, startDate) {
	const data = [];
	for (let index = 0; index < 2; index++) {
		match[round * 10 + index].date = new Date(
			startDate.getFullYear(),
			startDate.getMonth(),
			startDate.getDate(),
			startDate.getHours() + index
		);
		data.push(match[round * 10 + index]);
	}
	return data;
}

function initWeekendMatch(match, round, startDate) {
	const data = [];
	for (let i = 2; i < 7; i += 4) {
		startDate.setHours(startDate.getHours() + 24);
		for (let index = 0; index < 4; index++) {
			match[round * 10 + index + i].date = new Date(
				startDate.getFullYear(),
				startDate.getMonth(),
				startDate.getDate(),
				startDate.getHours() + index
			);
			data.push(match[round * 10 + index + i]);
		}
	}
	return data;
}

function initMatchs(teams, startLeague) {
	const matchGo = [];
	const matchBack = [];

	for (let index = 0; index < teams.length; index++) {
		let tmp = 0;
		for (let i = 1; i < teams.length / 2; i++) {
			if (index - i < 0) {
				tmp = teams.length - Math.abs(index - i);
				matchGo.push({
					teamA: teams[tmp],
					teamB: teams[index + i],
				});
				matchBack.push({
					teamA: teams[index + i],
					teamB: teams[tmp],
				});
			} else if (index + i >= teams.length) {
				tmp = index + i - teams.length;
				matchGo.push({
					teamA: teams[index - i],
					teamB: teams[tmp],
				});
				matchBack.push({
					teamA: teams[tmp],
					teamB: teams[index - i],
				});
			} else {
				matchGo.push({
					teamA: teams[index - i],
					teamB: teams[index + i],
				});
				matchBack.push({
					teamA: teams[index + i],
					teamB: teams[index - i],
				});
			}
		}
	}

	var matchs1 = initFirstLeg(startLeague, matchGo);

	var matchs2 = initSecondLeg(startLeague, matchBack);

	return {
		go: matchs1,
		back: matchs2,
	};
}

module.exports = {
	initMatchs,
};
