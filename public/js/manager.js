window.onload = async () => {
	onloadPage();
	$(".league .delete").click(deleteLeague);
	$("#teams .delete").click(deleteTeam);
};

async function deleteLeague() {
	const parent = this.parentNode;
	const { id } = parent;

	const { success, message } = await (
		await fetch("/api/leagues/" + id, { method: "DELETE" })
	).json();
	if (success) {
		Alert("Success", message, "OK", "success");
	}
	parent.remove();
}

async function deleteTeam() {
	const parent = this.parentNode.parentNode;
	const { id } = parent;

	const { success, message } = await (
		await fetch("/api/teams/" + id, { method: "DELETE" })
	).json();
	if (success) {
		Alert("Success", message, "OK", "success");
	}
	parent.remove();
}
