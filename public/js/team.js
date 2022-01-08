let players = [];

window.onload = () => {
	getPlayerInTeam();
};
async function getPlayerInTeam() {
	// create fetch and parse to json
	const res = await (await fetch(`/api/teams/${team}/players/`)).json();

	// check get success data player from api
	if (!res.success) Alert("Error", res.message, "OK", "error");

	// set global player list
	players = res.data;

	$("input#search-player").keyup(function (e) {
		const query = e.target.value.toLowerCase();

		const filter = players.filter((i) => {
			let {
				name,
				numberInTeam: n,
				height: h,
				width: w,
				position: p,
			} = i;

			name = name.toLowerCase();
			p = p.toLowerCase();

			if ([name, h, w, n, p].join(" ").includes(query)) return i;
		});
		renderPlayers(filter);
	});

	// call render players
	renderPlayers(players);
}

function renderPlayers(data) {
	const html = data.map((player, index) => {
		return `<tr id="${player._id}" class="align-middle">
			<td>${index + 1}</td>
			<td>
				<a href="/teams/${team}/players/${player._id}">${player.name}</a>
			</td>
			<td>${player.numberInTeam}</td>
			<td>${player.height}</td>
			<td>${player.weight}</td>
			<td>${player.position}</td>
			<td class="d-none d-lg-table-cell">${moment(player.birthday).format(
				"DD/MM/YYYY"
			)}</td>
		</tr>`;
	});
	$("#players-table > tbody").html(html);
}
