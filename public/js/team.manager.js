let players = [];

window.onload = () => {
	onloadPage();
	addEventOptionStadium();
	getPlayerInTeam();
	$("#btn-add-player").click(addPlayer);
};

function addStadium(team) {
	stadiumForm({}, "Add", "Create", async () => {
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
		team = $(".team").attr("id"),
		stadium = $(".stadium-info").attr("id");

	stadiumForm({ name, address, capacity }, "Edit", "Save", async () => {
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
		title: title + " Stadium In " + $(".h2").text(),
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
		showLoaderOnConfirm: true,
		preConfirm: cb,
		allowOutsideClick: () => !Swal.isLoading(),
	});
}

function renderStadium({ name, address, capacity }) {
	$(".stadium-info").html(`<div class="d-flex flex-column">
	<div class="fw-bold fs-5 name">${name}</div>
	<div class="fw-bold fs-5 address">${address}</div>
	<div class="fw-bold fs-5 capacity">Sức Chứa: ${capacity} người</div>
	</div>`);
	renderOptionStadium();
}

async function deleteStadium() {
	const team = $(".team").attr("id"),
		stadium = $(".stadium-info").attr("id");
	const res = await (
		await fetch(`/api/teams/${team}/stadiums/${stadium}`, {
			method: "DELETE",
		})
	).json();
	if (!res.success) return Alert("Error", res.message, "OK", "error");

	renderAddStadium(team);
	Alert("Success", res.message, "OK", "success");
}

function renderAddStadium(team) {
	$(".option").html("");
	$(".stadium-info").html(
		`<button class="btn btn-primary" onclick="addStadium('${team}')">+Stadium</button>`
	);
}

function renderOptionStadium() {
	$(".option").html(
		`<button class="btn"><i class="bi bi-pencil-square"></i></button><button class="btn"><i class="bi bi-trash"></i></button>`
	);
	addEventOptionStadium();
}

function addEventOptionStadium() {
	$(".bi-pencil-square").click(editStadium);
	$(".bi-trash").click(deleteStadium);
}

function playerForm(
	{ name, number, height, width, position, birthday },
	title,
	btnTitle,
	cb
) {
	Swal.fire({
		title: title + " Stadium In " + $(".h2").text(),
		html: `<div>
                    <label for="name" class="form-label text-start w-100">Name</label>
                    <input type="text" class="form-control" id="name" name="name" placeholder="Player" value="${
					name || ""
				}">
               </div>
               <div>
                    <label for="number" class="form-label text-start w-100">Number</label>
                    <input type="text" class="form-control" id="number" name="number" placeholder="number" value="${
					number || ""
				}" >
               </div>
			<div>
                    <label for="height" class="form-label text-start w-100">Capactity</label>
                    <input type="text" class="form-control" id="capacity" name="capacity" placeholder="Capacity" value="${""}">
               </div>`,
		showCancelButton: true,
		confirmButtonText: btnTitle,
		showLoaderOnConfirm: true,
		preConfirm: cb,
		allowOutsideClick: () => !Swal.isLoading(),
	});
}

function addPlayer() {}

async function getPlayerInTeam() {
	// create fetch and parse to json
	const res = await (await fetch(`/api/teams/${id}/players/`)).json();

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
				<button class="btn py-0">
					<i class="bi bi-pencil-square"></i>
				</button>
				<button class="btn py-0">
					<i class="bi bi-trash"></i>
				</button>
			</td>
		</tr>`;
	});
	$("#players-table > tbody").html(html);
}
