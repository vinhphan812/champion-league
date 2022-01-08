let matchDetails = [];
window.onload = function () {
	getStatistics();
};

async function getStatistics() {
	const { success, message, data } = await (
		await fetch(`/api/leagues/${league}/matchs/${match}/details`)
	).json();

	if (!success) Alert("Error", message, "OK", "error");

	matchDetails = data;

	renderMatchDetail();
}

function renderMatchDetail() {
	const $table = $(".details tbody");
	let html =
		"<tr class='text-center h1 text-muted'><td colspan='9'>Hiện tại chưa có dữ liệu cho trận đấu này!!!</td></tr>";
	if (matchDetails.length)
		html = matchDetails.map(
			({ team, time, player, type }) => `
		<tr>
			<td colspan="3">${renderPlayer(teamA, team._id, player)}</td>
			<td colspan="1">${renderType(teamA, team._id, type)}</td>
			<td colspan="1" class="text-center fw-bold">${time}</td>
			<td colspan="1">${renderType(teamB, team._id, type)}</td>
			<td colspan="3">${renderPlayer(teamB, team._id, player)}</td>
		</tr>`
		);

	$table.html(html);
}

function renderPlayer(colID, curID, player) {
	return colID == curID
		? `<a href='/manager/teams/${player.team}/players/${player._id}'>[${player.numberInTeam}] ${player.name}</a>`
		: "";
}

function renderType(colID, curID, type) {
	if (colID != curID) return "";

	switch (type) {
		case "goal":
			return "Ghi Bàn";
		case "yellow":
			return "Thẻ Vàng";
		case "red":
			return "Thẻ Đỏ";
		default:
			return "Lỗi Khác";
	}
}
