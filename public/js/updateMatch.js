const details = [];
const detailsId = [];
let url = `http://localhost:5000/api/teams/`;
let $playerSelected;
let reUseData;

window.onload = () => {
	$("#addBtn").click(addData);
	$("#sendBtn").click(sendData);
	$playerSelected = $("#playerSelected");
};
async function getValTeam(sel) {
	const response = await fetch(`${url}${sel.value}/players`);
	const data = await response.json();
	reUseData = data;
	if (data.data) {
		return $playerSelected.html(`
									<div class="mb-3">
										<label for="player" class="form-label">Cầu thủ</label>
										<input list="players" id="player" class="form-control">
										<datalist id="players">
											${data.data
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
									`);
	}
}

function addData() {
	let team = $("#team option:selected").text();
	let teamId = $("#team").val();
	let player = $("#player").val();
	let type = $("#type").val();
	let time = $("#time").val();

	if (!team || !player || !type || !time) {
		return $("#alertMessage")
			.html(`<div class="alert alert-danger" role="alert">
											Bạn cần phải nhập đầy đủ thông tin
											</div>`);
	} else {
		$("#alertMessage > div").remove();
	}

	let playerId = reUseData.data.filter((thisPlayer) => {
		return thisPlayer.name === player;
	});
	const obj = { team, player, type, time };
	const objId = { team: teamId, player: playerId[0]._id, type, time };
	details.push(obj);
	detailsId.push(objId);

	render();

	refreshInputs.call(this);
}

function refreshInputs() {
	this.player = $("#player").val("");
	this.type = $("#type").val("");
	this.time = $("#time").val("");
}

function sendData() {
	$("#details").val(JSON.stringify(detailsId));
	$("#form").submit();
}

function onDelete(event) {
	const i = event.target.id;
	details.splice(i, 1);
	detailsId.splice(i, 1);
	render();
}

function render() {
	const table = details.map((detail, index) => {
		return `
						<tr>
							<td>${index}</td>
							<td>${detail.team}</td>
							<td>${detail.player}</td>
							<td>${typeCheck(detail.type)}</td>
							<td>${detail.time}</td>
							<td>
								<i class="bi bi-trash" id="${index}"></i>
							</td>
						</tr>
			`;
	});
	$("#table-info > tbody").html(table);
	$("#table-info i").click(onDelete);
}

function onDelete(event) {
	const i = event.target.id;
	details.splice(i, 1);
	detailsId.splice(i, 1);
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
