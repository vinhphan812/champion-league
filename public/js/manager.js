window.onload = async () => {
	$(".league .delete").click(deleteLeague);
	$(".donors .delete").click(deleteDonor);
	$("#teams .delete").click(deleteTeam);
	$("#referees .delete").click(deleteReferees);

	$("#add-rule").click(addRule);
	$("#rules .delete").click(deleteRule);
	$("#rules .edit").click(editRule);
};

function deleteLeague() {
	const parent = this.parentNode;
	const { id } = parent;
	const name = parent.querySelector(".card-title").innerText;

	confirmDelete("giải " + name, async () => {
		const { success, message } = await (
			await fetch("/api/leagues/" + id, { method: "DELETE" })
		).json();
		if (success) {
			Alert("Success", message, "OK", "success");
		}
		parent.remove();
	});
}

function deleteTeam() {
	const parent = this.parentNode.parentNode;
	const { id } = parent;
	const name = parent.querySelector(":nth-child(2)").innerText;

	confirmDelete("đội " + name, async () => {
		const { success, message } = await (
			await fetch("/api/teams/" + id, { method: "DELETE" })
		).json();
		if (success) {
			Alert("Success", message, "OK", "success");
		}
		parent.remove();
	});
}

function deleteDonor() {
	const parent = this.parentNode;
	const { id } = parent;
	const name = parent.querySelector(".card-title").innerText;

	confirmDelete("Nhà tài trợ " + name, async () => {
		const { success, message } = await (
			await fetch("/api/donors/" + id, { method: "DELETE" })
		).json();
		if (success) {
			Alert("Success", message, "OK", "success");
		}
		parent.remove();
	});
}

function deleteReferees() {
	const parent = this.parentNode.parentNode;
	const { id } = parent;
	const name = parent.querySelector(":nth-child(2)").innerText;

	confirmDelete("Trọng tài " + name, async () => {
		const { success, message } = await (
			await fetch("/api/referees/" + id, { method: "DELETE" })
		).json();
		if (success) {
			Alert("Success", message, "OK", "success");
		}
		parent.remove();
	});
}

function deleteRule() {
	const parent = this.parentNode.parentNode;
	const { id } = parent;
	const name = parent.querySelector(":nth-child(1)").innerText;

	confirmDelete(`Quy Định "${name}"`, async () => {
		const { success, message } = await (
			await fetch("/api/rules/" + id, { method: "DELETE" })
		).json();
		if (success) {
			Alert("Success", message, "OK", "success");
		}
		parent.remove();
	});
}
function editRule() {
	const parent = this.parentNode.parentNode;
	const { id } = parent;
	const name = $("td:nth-child(1)", parent);
	const description = $("td:nth-child(2)", parent);

	formRule(
		"Thêm Quy Định",
		{ name: name.text(), description: description.text() },
		async () => {
			const nameEditor = $("#name").val();
			const descriptionEditor = $("#description-editor").val();

			console.log(descriptionEditor);

			const { success, message } = await (
				await fetch(`/api/rules/` + id, {
					method: "PUT",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify({
						name: nameEditor,
						description: descriptionEditor,
					}),
				})
			).json();
			Alert(
				success ? "Thành Công" : "Xảy Ra Lỗi",
				message,
				"OK",
				success ? "success" : "error"
			);
			if (!success) return;

			name.text(nameEditor);
			description.text(descriptionEditor);
		}
	);
}
function addRule() {
	formRule("Thêm Quy Định", {}, async () => {
		const name = $("#name").val();
		const description = $("#description").val();
	});
}

function formRule(title, { name = "", description = "" }, cb) {
	Swal.fire({
		title,
		html: `
			<div class="my-2">
                    <label for="name" class="form-label text-start w-100">Quy Định</label>
                    <input type="text" class="form-control" id="name" name="name" placeholder="quy định" value="${name}">
               </div>
			
			<div class="my-2">
				<label class="form-label text-start w-100" for="description-editor">Thông tin đội bóng</label>
				<textarea class="form-control" placeholder="Nhập thông tin mô tả đội bóng" id="description-editor">${description}</textarea>
			</div>
		`,
		showCancelButton: true,
		confirmButtonText: "Lưu",
		showLoaderOnConfirm: true,
		reverseButtons: true,
		preConfirm: cb,
		allowOutsideClick: () => !Swal.isLoading(),
	});
}
