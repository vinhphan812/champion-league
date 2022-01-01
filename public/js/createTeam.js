const players = [];
let $players;

const optionsPosition = {
	1: "Tiền đạo",
	2: "Tiền vệ",
	3: "Hậu vệ",
	4: "Thủ môn",
};

window.onload = () => {
	$players = $("#players");
	$("form:nth(1)").submit(checkData);
};

function playerForm(
	{ name, number, height, weight, position, birthday },
	title,
	btnTitle = "Thêm",
	cb = addPlayer
) {
	const date = new Date();
	Swal.fire({
		title: title,
		html: `<div class="mb-2">
                    <label for="name" class="form-label text-start w-100">Tên Cầu Thủ</label>
                    <input type="text" class="form-control" id="name" name="name" placeholder="Tên Cầu Thủ" value="${
					name || ""
				}">
               </div>
               <div class="mb-2">
                    <label for="number" class="form-label text-start w-100">Số Áo</label>
                    <input type="text" class="form-control" id="number" name="number" placeholder="Số Áo" value="${
					number || ""
				}" >
               </div>
			<div class="mb-2">
                    <label for="height" class="form-label text-start w-100">Chiều Cao</label>
                    <input type="text" class="form-control" id="height" name="height" placeholder="Chiều Cao" value="${
					height || ""
				}">
               </div>
               <div class="mb-2">
                    <label for="weight" class="form-label text-start w-100">Cân Nặng</label>
                    <input type="text" class="form-control" id="weight" name="weight" placeholder="Cân Nặng" value="${
					weight || ""
				}">
               </div>
               <div class="mb-2">
                    <label for="position" class="form-label text-start w-100">Vị Trí</label>
				<select class="form-select" id="position" name="position">
					<option value="1">Tiền Đạo</option>
					<option value="2">Tiền Vệ</option>
					<option value="3">Hậu Vệ</option>
					<option value="4">Thủ Môn</option>
				</select>
               </div>
               <div class="mb-2">
                    <label class="form-label text-start w-100" for="birthday">Ngày Sinh</label>
                    <input class="form-control" type="date" name="birthday" id="birthday" value="${
					birthday ||
					`${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`
				}">
               </div>
               `,
		showCancelButton: true,
		confirmButtonText: btnTitle,
		cancelButtonText: "Quay Lại",
		backdrop: true,
		showLoaderOnConfirm: true,
		reverseButtons: true,
		preConfirm: cb,
		customClass: {
			confirmButton: "btn btn-primary mx-2",
			cancelButton: "btn btn-danger mx-2",
		},
		buttonsStyling: false,
		allowOutsideClick: () => !Swal.isLoading(),
	});
}

function addPlayer() {
	let error = "";

	const name = $("#name").val(),
		number = +$("#number").val(),
		height = +$("#height").val(),
		weight = +$("#weight").val(),
		position = +$("#position").val(),
		birthday = $("#birthday").val();

	if (!name || !number || !height || !weight || !position || !birthday)
		error = "Vui lòng điền đầy đủ thông tin cầu thủ";

	if (number < 0 || number > 100)
		error = "Số áo chỉ có thế nằm trong khoảng [1-99]";

	if (new Date().getYear() - new Date(birthday).getYear() < 18)
		error = "Chưa đủ tuổi để tham gia vào đội bóng";

	if (players.find((e) => e.name == name || e.numberInTeam == number))
		error = "Cầu thủ đã tồn tại";

	if (error) return Swal.showValidationMessage(error);

	players.push({
		name,
		numberInTeam: number,
		height,
		weight,
		position: optionsPosition[position],
		birthday,
	});

	$players.val(JSON.stringify(players));

	renderPlayers();
}

function checkData() {
	const { name, manager, coach, founded } = document.forms["create"];

	if (!name.value || !manager.value || !coach.value || !founded.value) {
		Alert("Error", "Vui lòng điền đầy đủ thông tin", "OK");
		return false;
	}

	return true;
}

function renderPlayers() {
	const html = players.map((player, index) => {
		return `<tr>
			<td>${index + 1}</td>
			<td>${player.name}</td>
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
