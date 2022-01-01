let matchs = [];

window.onload = () => {
	getMatchInLeague();
	getRankInLeague();
	$("#filter-matchs").change(searchChange);
	$("input#search-match").keyup(searchChange);
};

function renderStatistics() {
	const canUpdate = $("tr.alert-danger").length;
	const totalDone = matchs.reduce((total, { date }) => {
		return total + checkDate(date);
	}, 0);

	$(".total-matchs").text(matchs.length);
	$(".total-done").text(totalDone);
	$(".total-updated").text(canUpdate);
}

async function getMatchInLeague() {
	// create fetch and parse to json
	const res = await (await fetch(`/api/leagues/${league}/matchs/`)).json();

	// check get success data player from api
	if (!res.success) Alert("Error", res.message, "OK", "error");

	// set global player list
	matchs = res.data;

	renderMatchs(matchs);
	renderStatistics();
}

function renderMatchs(data) {
	let html = data.map(matchItem);

	if (!html.length)
		html =
			"<tr><td colspan='8'>Không tìm thấy trận đấu nào trong giải !!!</td></tr>";

	$(".matchs > table > tbody").html(html);

	function matchItem({ _id, scores, date, round, stadium, teams }) {
		return `<tr id="${_id}" class="${round}">
		<td>${moment(date).format("HH:mm DD/MM/YYYY")}</td>
		<td>${stadium.name}</td>
		<td class="d-none d-lg-table-cell">
			<a href="/teams/${teams[0]._id}" class="text-decoration-none">${
			teams[0].name
		}</a>
		</td>
		<td>
			<a href="/teams/${teams[0]._id}" class="text-decoration-none">
				<img class="logo-image" src="${teams[0].logo_path}">
			</a>
		</td>
		<td>
			<a href="/leagues/${league}/matchs/${_id}" class="text-decoration-none">
				<pre class="my-0">${scores.join(" - ") || "x - x"}</pre>
			</a>
		</td>
		<td>
			<a href="/teams/${teams[0]._id}" class="text-decoration-none">
				<img class="logo-image" src="${teams[1].logo_path}">
			</a>
		</td>
		<td class="d-none d-lg-table-cell">
			<a href="/teams/${teams[1]._id}" class="text-decoration-none">${
			teams[1].name
		}</a>
		</td>
	</tr>`;
	}
}

function searchChange(e) {
	const filter = $("#filter-matchs").val();
	const query = $("#search-match").val().toLowerCase();

	const checkSearch = (arrData) =>
		query == "" || arrData.join(" ").includes(query);

	const checkRound = (round) => filter == "all" || filter == round;

	const data = matchs.filter((i) => {
		let { name, stadium, date, round } = i;

		name = name.toLowerCase();
		stadium = stadium.name.toLowerCase();
		date = moment(date).format("HH:mm DD/MM/YYYY");

		if (checkSearch([name, stadium, date]) && checkRound(round)) return i;
	});

	renderMatchs(data);
}

function checkDate(date) {
	const currentDate = new Date();
	return new Date(date) - currentDate.getTime() < 0;
}

async function getRankInLeague() {
	const { success, message, data } = await (
		await fetch(`/api/leagues/${league}/joins`)
	).json();

	// check get success data JOINS from api
	if (!success) Alert("Error", message, "OK", "error");

	renderRank(data);
}

async function renderRank(joins) {
	const html = joins.map(
		({ score, team }, index) => `<tr class="${onTop(index, score)}">
		<td>
			<div class=" mb-0 fw-bold">${index + 1}</div>
		</td>
		<td>
			<a class="text-decoration-none" href="/manager/teams/${team.id}">${
			team.name
		}</a>
		</td>
		<td>${score}</td>
	</tr>`
	);
	$(".rank tbody").html(html);

	function onTop(index, score) {
		if (score)
			return index == 0
				? "table-warning top-1st"
				: index == 1
				? "table-info top-2nd"
				: index == 2
				? "table-primary top-3rd"
				: "h5";
		return "h5";
	}
}
