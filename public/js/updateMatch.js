const detailsRender = [];
const detailsData = [];
const players = {};
let $playerSelected;
let reUseData;
let myModal;

window.onload = () => {
	getDataTeams();
	$("#addBtn").click(addData);
	$("#sendBtn").click(sendData);
	$playerSelected = $("#playerSelected");
	myModal = new bootstrap.Modal($("#exampleModal"));
};

async function getDataTeams() {
	if (match.teamA) await loadPlayersData(match.teamA);
	if (match.teamB) await loadPlayersData(match.teamB);
	renderPlayerSelect(match.teamA);
	// random tỉ số trận đấu
	// randomAdd();
}

async function loadPlayersData(id) {
	const { success, data } = await (
		await fetch(`/api/teams/${id}/players`)
	).json();

	if (!success) return;
	players[id] = data;
}

async function renderPlayerSelect(select) {
	$playerSelected.html(`<div class="mb-3">
			<label for="player" class="form-label">Cầu thủ</label>
			<input list="players" id="player" class="form-control" autocomplete="off">
			<datalist id="players">
				${players[select.value || select]
					.map((player) => {
						return `<option value="${player.name}">`;
					})
					.join("")}
			</datalist>
		</div>
		<div class="mb-3">
			<label for="type" class="form-label">Chọn hành động</label>
			<select class="form-select" id="type">
				<option value="goal">Ghi bàn</option>
				<option value="yellow">Thẻ vàng</option>
				<option value="red">Thẻ đỏ</option>
			</select>
		</div>
		<div class="mb-3">
			<label for="player" class="form-label">Thời điểm</label>
			<input type="text" placeholder="Thời điểm" class="form-control" id="time">
		</div>`);
}

function addData() {
	let team = $("#team").val();
	let playerName = $("#player").val();
	let type = $("#type").val();
	let time = $("#time").val();

	if (!team || !playerName || !type || !time) {
		return $("#alertMessage").html(
			`<div class="alert alert-danger" role="alert">Bạn cần phải nhập đầy đủ thông tin</div>`
		);
	} else {
		$("#alertMessage > div").remove();
	}

	const player = players[team].find((e) => e.name === playerName)._id;

	const obj = {
		team: $("#team option:selected").text(),
		player: playerName,
		type,
		time,
	};

	detailsRender.push(obj);
	detailsData.push({ team, player, type, time, league, match: match.id });

	render();

	refreshInputs.call(this);
	myModal.hide();
}

function randomAdd() {
	const teams = [match.teamA, match.teamB];
	const TYPE = ["goal", "yellow", "red"];
	const length = random(10);
	let curTime = detailsData[detailsData.length - 1]?.time || 0;
	for (var i = 0; i < length; i++) {
		const iTeam = random(2);
		const iPlayer = random(teams[iTeam].length);
		const iType = random(3);
		curTime += random(15, 1);
		const data = {
			team: teams[iTeam],
			player: players[teams[iTeam]][iPlayer].name,
			type: TYPE[iType],
			time: curTime,
		};
		detailsRender.push(data);
		data.league = league;
		data.match = match.id;
		data.player = players[teams[iTeam]][iPlayer]._id;
		detailsData.push(data);
	}

	render();
}

function refreshInputs() {
	this.player = $("#player").val("");
	this.type = $("#type").val("");
	this.time = $("#time").val("");
}

function sendData() {
	$("#details").val(JSON.stringify(detailsData));
	$("#form").submit();
}

function render() {
	const table = detailsRender.map((detail, index) => {
		return `<tr>
				<td>${index}</td>
				<td>${detail.team}</td>
				<td>${detail.player}</td>
				<td>${typeCheck(detail.type)}</td>
				<td>${detail.time}</td>
				<td>
					<i class="bi bi-trash" id="${index}"></i>
				</td>
			</tr>`;
	});
	$("#table-info > tbody").html(table);
	$("#table-info i").click(onDelete);
}

function onDelete(event) {
	const i = event.target.id;
	detailsRender.splice(i, 1);
	detailsData.splice(i, 1);
	render();
}

function typeCheck(detail) {
	if (detail === "goal") {
		return `<i class="bi bi-dribbble text-success fs-3"></i>`;
	} else if (detail === "yellow") {
		return `<i class="bi bi-file-fill text-warning fs-3"></i>`;
	} else {
		return `<i class="bi bi-file-fill text-danger fs-3"></i>`;
	}
}

function random(max = 0, min = 0) {
	return Math.floor(Math.random() * (max - min) + min);
}
