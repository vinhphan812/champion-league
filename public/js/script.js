function Alert(title, text, confirmButtonText, icon = "error") {
	return Swal.fire({
		heightAuto: false,
		title,
		text,
		icon,
		confirmButtonText,
	});
}
function onloadPage() {
	$(".page-footer").removeClass("page-footer");
}
