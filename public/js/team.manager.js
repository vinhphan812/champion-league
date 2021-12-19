let players = [];
const positionPlayer = ["Thủ môn", "Hậu vệ", "Tiền vệ", "Tiền đạo"];

window.onload = () => {
	addEventOptionStadium();
	getPlayerInTeam();
	$("#btn-add-player").click(addPlayer);
};

function addStadium(team) {
	stadiumForm({}, "Thêm", "Thêm", async () => {
		const name = $("#name").val(),
			address = $("#address").val(),
			capacity = $("#capacity").val();

		if (!name || !address || !capacity)
			return Swal.showValidationMessage(
				"Please enter a name, address and capacity"
			);

		if (!parseInt(capacity))
			return Swal.showValidationMessage("Capacity invalid");
		const option = {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({
				name,
				address,
				capacity: +capacity,
			}),
		};

		const res = await (
			await fetch(`/api/teams/${team}/stadiums`, option)
		).json();

		if (!res.success)
			return Swal.showValidationMessage("Cant Add Stadium");

		renderStadium({ name, address, capacity }, res);
		Alert("Success", res.message, "OK", "success");
	});
}

function editStadium() {
	const name = $(".stadium-info .name").text(),
		address = $(".stadium-info .address").text(),
		capacity = $(".stadium-info .capacity").text().split(" ")[2],
		stadium = $(".stadium-info").attr("id");

	stadiumForm({ name, address, capacity }, "Chỉnh Sửa", "Lưu", async () => {
		const name = $("#name").val(),
			address = $("#address").val(),
			capacity = $("#capacity").val();

		if (!name || !address || !capacity)
			return Swal.showValidationMessage(
				"Please enter a name, address and capacity"
			);

		if (!parseInt(capacity))
			return Swal.showValidationMessage("Capacity invalid");
		const option = {
			method: "PUT",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({
				name,
				address,
				capacity: +capacity,
			}),
		};

		const res = await (
			await fetch(`/api/teams/${team}/stadiums/${stadium}`, option)
		).json();

		if (!res.success)
			return Swal.showValidationMessage("Cant Edit Stadium");

		renderStadium({ name, address, capacity }, team);

		Alert("Success", res.message, "OK", "success");
	});
}

function stadiumForm({ name, address, capacity }, title, btnTitle, cb) {
	Swal.fire({
		title: title + " Sân Vận Động ",
		html: `<div>
                    <label for="name" class="form-label text-start w-100">Stadium Name</label>
                    <input type="text" class="form-control" id="name" name="name" placeholder="Stadium name" value="${
					name || ""
				}">
               </div>
               <div>
                    <label for="address" class="form-label text-start w-100">Address</label>
                    <input type="text" class="form-control" id="address" name="address" placeholder="address" value="${
					address || ""
				}" >
               </div><div>
                    <label for="capacity" class="form-label text-start w-100">Capactity</label>
                    <input type="text" class="form-control" id="capacity" name="capacity" placeholder="Capacity" value="${
					capacity || ""
				}">
               </div>`,
		showCancelButton: true,
		confirmButtonText: btnTitle,
		cancelButtonText: "Quay lại",
		reverseButtons: true,
		showLoaderOnConfirm: true,
		preConfirm: cb,
		allowOutsideClick: () => !Swal.isLoading(),
	});
}

function renderStadium({ name, address, capacity }) {
	$(".stadium-info").html(`<div class="d-flex flex-column">
	<div class="fw-bold fs-5 name">${name}</div>
	<div class="fs-5 address">${address}</div>
	<div class="fw-bold fs-5 capacity">Sức Chứa: ${capacity} người</div>
	</div>`);
	renderOptionStadium();
}

function deleteStadium() {
	const stadium = $(".stadium-info").attr("id");
	confirmDelete("Sân Vận Động", async () => {
		const res = await (
			await fetch(`/api/teams/${team}/stadiums/${stadium}`, {
				method: "DELETE",
			})
		).json();
		if (!res.success) return Alert("Error", res.message, "OK", "error");

		renderAddStadium(team);
		Alert("Success", res.message, "OK", "success");
	});
}

function renderAddStadium(team) {
	$(".stadium .option").html("");
	$(".stadium-info").html(
		`<button class="btn btn-primary" onclick="addStadium('${team}')">+Stadium</button>`
	);
}

function renderOptionStadium() {
	$(".stadium .option").html(
		`<button class="btn"><i class="bi bi-pencil-square"></i></button><button class="btn"><i class="bi bi-trash"></i></button>`
	);
	addEventOptionStadium();
}

function addEventOptionStadium() {
	$(".stadium .bi-pencil-square").click(editStadium);
	$("stadium .bi-trash").click(deleteStadium);
}

function playerForm(
	{ name, number, height, weight, position, birthday },
	title,
	btnTitle,
	cb
) {
	Swal.fire({
		title: title + " Thành Viên " + $(".h2").text(),
		html: `<div>
                    <label for="name" class="form-label text-start w-100">Tên Thành Viên</label>
                    <input type="text" class="form-control" id="name" name="name" placeholder="Tên Thành Viên" value="${
					name || ""
				}">
               </div>
               <div>
                    <label for="number" class="form-label text-start w-100">Số Áo</label>
                    <input type="text" class="form-control" id="number" name="number" placeholder="Số Áo" value="${
					number || ""
				}" >
               </div>
			<div>
                    <label for="height" class="form-label text-start w-100">Chiều Cao</label>
                    <input type="text" class="form-control" id="height" name="height" placeholder="Chiều Cao" value="${
					height || ""
				}">
               </div>
			<div>
                    <label for="weight" class="form-label text-start w-100">Cân Nặng</label>
                    <input type="text" class="form-control" id="weight" name="weight" placeholder="Cân Nặng" value="${
					weight || ""
				}">
               </div>
			<div>
				<label for="position" class="form-label text-start w-100">Vị Trí</label>
				<select id="position" class="form-select">
					${positionPlayer.map(
						(e, i) =>
							`<option value="${i}" ${
								position == e ? "selected" : ""
							}>${e}</option>`
					)}
				</select>
			</div>
			<div>
				<label for="birthday" class="form-label text-start w-100">Ngày Sinh</label>
				<input type="date" class="form-control" id="birthday" name="birthday" placeholder="Ngày Sinh" value="${
					birthday || ""
				}">		
			</div>
			`,
		showCancelButton: true,
		confirmButtonText: btnTitle,
		showLoaderOnConfirm: true,
		reverseButtons: true,
		preConfirm: cb,
		allowOutsideClick: () => !Swal.isLoading(),
	});
}

function addPlayer() {
	playerForm({}, "Thêm", "Thêm", FetchPlayer);
}

function editPlayer(e) {
	console.log(e);
	playerForm({}, "Chỉnh Sửa", "Lưu", FetchPlayer("PUT"));
}

async function FetchPlayer(method = "POST") {
	const name = $("#name").val(),
		height = +$("#height").val(),
		weight = +$("#weight").val(),
		numberInTeam = +$("#number").val(),
		position = $("#position").val(),
		birthday = new Date($("#birthday").val());

	const currentDate = new Date();

	if (numberInTeam == NaN)
		return Swal.showValidationMessage("Số áo phải là số!");

	if (weight == NaN)
		return Swal.showValidationMessage("Cân nặng phải là số!");

	if (height == NaN)
		return Swal.showValidationMessage("Chiều cao phải là số!");

	if (currentDate.getYear() - birthdate.getYear() < 16)
		return Swal.showValidationMessage(
			"Thành viên chưa đủ tuổi tham gia thi đấu"
		);

	const player = {
		name,
		height,
		weight,
		numberInTeam,
		position: positionPlayer[position],
		birthday,
	};

	const { success, message, data } = await (
		await fetch(`/api/teams/${team}/players/`, {
			method,
			headers: { "Content-Txype": "application/json" },
			body: JSON.stringify(player),
		})
	).json();
	if (!success) return Swal.showValidationMessage(message);
	players.push(player);
	Alert("Success", "Thêm Thành Viên Thành Công", "OK", "success");
}

function deletePlayer(e) {
	const { id } = e.target.parentNode.parentNode.parentNode;
	confirmDelete("cầu thủ", async () => {
		const { success, data, message } = await await fetch(
			`/api/teams/${team}/players/${id}`,
			{ method: "DELETE" }
		);

		if (!success) return Swal.showValidationMessage(message);

		Alert("Success", "Xóa Cầu Thủ Thành Công", "OK", "success");
	});
}

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
		return `<tr id="${player._id}">
				<td>${index + 1}</td>
				<td>
					<a href="players/${player._id}">${player.name}</a>
				</td>
				<td>${player.numberInTeam}</td>
				<td>${player.height}</td>
				<td>${player.weight}</td>
				<td>${player.position}</td>
				<td>${new Date(player.birthday).toLocaleDateString()}</td>
				<td class="option">
					<button class="btn py-0 edit">
						<i class="bi bi-pencil-square"></i>
					</button>
					<button class="btn py-0 delete">
						<i class="bi bi-trash"></i>
					</button>
				</td>
			</tr>`;
	});
	$("#players-table > tbody").html(html);
	addEventOptionPlayer();
}

function addEventOptionPlayer() {
	$("tr > .option > .edit").click(editPlayer);
	$("tr > .option > .delete").click(deletePlayer);
}
