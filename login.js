function success(key) {
	window.location.href = "secret.html?challenge="+raw_encrypt(key, "xor");
}

function tryPassword() {
	let key = document.getElementById("password").value;
	document.getElementById("password").value = "";

	if(correct(key)) {
		success(key);
	}
}

document.getElementById("password").addEventListener("keypress", (event) => {
	if(event.key == "Enter") {
		tryPassword();
	}
})

document.getElementById("confirm").addEventListener("click", tryPassword);

document.getElementById("password").focus();
