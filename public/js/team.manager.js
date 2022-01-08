let players = [];
const positionPlayer = ["Thủ môn", "Hậu vệ", "Tiền vệ", "Tiền đạo"];

window.onload = () => {
	addEventOptionStadium();
	getPlayerInTeam();
	$(".logo .edit").click(editImageTeam);
	$(".team-editor").click(editTeam);
	$("#btn-add-player").click(addPlayer);
	$(".team-delete").click(deleteTeam);
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
                    <label for="name" class="form-label text-start w-100">Sân Vận Động</label>
                    <input type="text" class="form-control" id="name" name="name" placeholder="Tên sân vận động" value="${
					name || ""
				}">
               </div>
               <div>
                    <label for="address" class="form-label text-start w-100">Địa Chỉ</label>
                    <input type="text" class="form-control" id="address" name="address" placeholder="địa chỉ" value="${
					address || ""
				}" >
               </div><div>
                    <label for="capacity" class="form-label text-start w-100">Sức Chứa</label>
                    <input type="text" class="form-control" id="capacity" name="capacity" placeholder="sức chứa" value="${
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
	$(".stadium .edit").click(editStadium);
	$(".stadium .delete").click(deleteStadium);
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
					moment(birthday).format("YYYY-MM-DD") || ""
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
	let $player = e.target.parentNode.parentNode;

	if ($player.className == "option") $player = $player.parentNode;

	const { id } = $player;

	const player = players.find((e) => e._id == id);

	playerForm(player, "Chỉnh Sửa", "Lưu", FetchPlayer("PUT"));
}

function FetchPlayer(method = "POST") {
	return async () => {
		const name = $("#name").val(),
			height = +$("#height").val(),
			weight = +$("#weight").val(),
			numberInTeam = +$("#number").val(),
			position = $("#position").val(),
			birthday = new Date($("#birthday").val());

		const currentDate = new Date();

		if (
			!name ||
			!height ||
			!weight ||
			!numberInTeam ||
			!position ||
			!birthday
		)
			return Swal.showValidationMessage(
				"Vui lòng điền đầy đủ các trường"
			);

		if (numberInTeam == NaN)
			return Swal.showValidationMessage("Số áo phải là số!");

		if (weight == NaN)
			return Swal.showValidationMessage("Cân nặng phải là số!");

		if (height == NaN)
			return Swal.showValidationMessage("Chiều cao phải là số!");

		if (currentDate.getYear() - birthday.getYear() < 16)
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
	};
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
		return `<tr id="${player._id}" class="align-middle">
				<td>${index + 1}</td>
				<td>
					<a href="players/${player._id}">${player.name}</a>
				</td>
				<td>${player.numberInTeam}</td>
				<td class="d-none d-sm-table-cell">${player.height}</td>
				<td class="d-none d-sm-table-cell">${player.weight}</td>
				<td>${player.position}</td>
				<td class="d-none d-lg-table-cell">${moment(player.birthday).format(
					"DD/MM/YYYY"
				)}</td>
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

function editImageTeam() {
	Swal.fire({
		title: "Logo " + $(".h2").text(),
		html: `
			<img id="logo-editor" class="w-75 image-fluid" src="${$(".logo img").attr(
				"src"
			)}"/>
			<div>
                    <label for="logo" class="form-label text-start w-100">Logo Đội Bóng</label>
                    <input type="file" class="form-control" id="logo" name="logo" onchange="handleChange(event)" accept="image/*">
               </div>
			`,
		showCancelButton: true,
		confirmButtonText: "Lưu",
		showLoaderOnConfirm: true,
		reverseButtons: true,
		preConfirm: async () => {
			var input = $("#logo")[0];
			var body = new FormData();

			body.append("logo", input.files[0]);

			const { success, data, message } = await (
				await fetch(`/api/teams/${team}/logo`, {
					method: "POST",
					body: body,
				})
			).json();

			if (!success)
				return Alert("Error", "Không xác định", "OK", "error");

			$(".logo img")[0].src = data;
			Alert("Success", message, "OK", "success");
		},
		allowOutsideClick: () => !Swal.isLoading(),
	});
}

function handleChange(e) {
	const image = $("#logo-editor")[0];
	image.src = URL.createObjectURL(e.target.files[0]);
}

function editTeam() {
	const name = $(".team-name"),
		founded = $(".founded"),
		description = $(".description p"),
		coach = $(".coach");

	Swal.fire({
		title: "Chỉnh sửa thông tin đội bóng" + $(".h2").text(),
		html: `
			<div class="my-2">
                    <label for="name" class="form-label text-start w-100">Tên đội bóng</label>
                    <input type="text" class="form-control" id="name" name="name" placeholder="Tên đội bóng" value="${name.text()}">
               </div>

			<div class="my-2">
				<label for="founded" class="form-label text-start w-100">Ngày thành lập</label>
				<input type="date" class="form-control" id="founded" name="founded" value="${moment(
					founded.text()
				).format("yyyy-MM-DD")}">
			</div>
			
			<div class="my-2">
				<label class="form-label text-start w-100" for="description-editor">Thông tin đội bóng</label>
				<textarea class="form-control" placeholder="Nhập thông tin mô tả đội bóng" id="description-editor">${description.text()}</textarea>
			</div>
			<div>
                    <label for="coach" class="form-label text-start w-100">Huấn luyện viên</label>
                    <input type="text" class="form-control" id="coach" name="coach" placeholder="Huấn luyện viên" value="${coach.text()}">
               </div>
		`,
		showCancelButton: true,
		confirmButtonText: "Lưu",
		showLoaderOnConfirm: true,
		reverseButtons: true,
		preConfirm: async () => {
			const nameEditor = $("#name").val(),
				descriptionEditor = $("#description-editor").val(),
				foundedEditor = $("#founded").val(),
				coachEditor = $("#coach").val();

			const body = JSON.stringify({
				description: descriptionEditor,
				name: nameEditor,
				founded: foundedEditor,
				coach: coachEditor,
			});

			const { success, message } = await (
				await fetch(`/api/teams/${team}`, {
					method: "PUT",
					headers: { "Content-Type": "application/json" },
					body,
				})
			).json();

			if (!success) return Alert("Error", message, "OK", "error");

			Alert("Success", message, "OK", "success");

			name.text(nameEditor);
			founded.text(foundedEditor);
			description.text(descriptionEditor);
			coach.text(coachEditor);
		},
		allowOutsideClick: () => !Swal.isLoading(),
	});
}

function deleteTeam() {
	confirmDelete("đội", async () => {
		const { success, message } = await (
			await fetch("/api/teams/" + team, { method: "DELETE" })
		).json();
		if (success) {
			Alert("Success", message, "OK", "success");
		}
		parent.remove();
	});
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
