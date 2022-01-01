let matchs = [];

window.onload = () => {
	getMatchInLeague();
	$("#filter-matchs").change(searchChange);
	$("input#search-match").keyup(searchChange);
};

async function getMatchInLeague() {
	// create fetch and parse to json
	const res = await (await fetch(`/api/leagues/${league}/matchs/`)).json();

	// check get success data player from api
	if (!res.success) Alert("Error", res.message, "OK", "error");

	// set global player list
	matchs = res.data;

	renderMatchs(matchs);
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
