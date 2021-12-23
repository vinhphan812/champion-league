window.onload = async () => {
	$(".league .delete").click(deleteLeague);
	$(".donors .delete").click(deleteDonor);
	$("#teams .delete").click(deleteTeam);
	$("#referees .delete").click(deleteReferees);
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
