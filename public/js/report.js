let titles = [];

window.onload = () => {
	loadTitles();
	$("#teams .add-title").click(addTitleTeamHandle);
	$("#players .add-title").click(addTitlePlayerHandle);
};

async function loadTitles() {
	const { data } = await (await fetch("/api/titles")).json();
	titles = data;
}

async function addTitle(id, titleId, type) {
	await fetch("/api/titles/" + titleId, {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify({ id, type }),
	});
}

function addTitlePlayerHandle(e) {
	const parent = this.parentNode.parentNode;
	const { id } = parent;
	const name = $(".name", parent).text();

	tagTitleForm(name, async () => {
		const titleId = $("#title").val();

		addTitle(id, titleId, "player");
	});
}
function addTitleTeamHandle(e) {
	const parent = this.parentNode;
	const { id } = parent;
	const name = $(".name", parent).text();
	tagTitleForm(name, async () => {
		const titleId = $("#title").val();
		const title = $("#title option:selected").text();
		addTitle(id, titleId, "team");
		$(".titles", parent).append(
			`<span class="badge rounded-pill text-muted mx-1">${title}</span>`
		);
	});
}

function tagTitleForm(title, cb) {
	Swal.fire({
		title: "Danh Hiệu cho " + title,
		html: `
			<div>
                    <label for="title" class="form-label text-start w-100">Danh Hiệu</label>
                    <div class="d-flex">
					<select class="form-select flex-grow-1" id="title">
						${titles.map(optionTitle)}
					</select>
					<button class="btn btn-primary ms-2" onclick="addTitleForm()">+</button>
				</div>
               </div>`,
		showCancelButton: true,
		confirmButtonText: "Lưu",
		cancelButtonText: "Quay lại",
		reverseButtons: true,
		showLoaderOnConfirm: true,
		preConfirm: cb,
		allowOutsideClick: () => !Swal.isLoading(),
	});
}

function addTitleForm() {
	Swal.fire({
		title: "Tạo Danh Hiệu Mới",
		html: `<div>
                    <label for="name" class="form-label text-start w-100">Tên Danh Hiệu</label>
                    <input type="text" class="form-control" id="name" name="name" placeholder="Danh Hiệu" value="">
               </div>`,
		showCancelButton: true,
		confirmButtonText: "Lưu",
		cancelButtonText: "Quay lại",
		reverseButtons: true,
		showLoaderOnConfirm: true,
		preConfirm: async () => {
			const name = $("#name").val();
			const { success, data } = await (
				await fetch("/api/titles", {
					method: "POST",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify({ name }),
				})
			).json();

			if (success) titles.push(data);
		},
		allowOutsideClick: () => !Swal.isLoading(),
	});
}

function optionTitle(i) {
	return `<option value="${i._id}">${i.name}</option>`;
}
