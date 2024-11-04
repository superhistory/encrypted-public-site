function structure(post, key) {
	return `<section>
	${decrypt(post, key)}
	</section>`
}

window.onload = function() {
	let params = new URLSearchParams(window.location.search);
	let key = raw_decrypt(atob(params.get("challenge")), "xor");
	
	if(correct(key)){
		let res = "";

		for(let i=0; i<posts.length; ++i) {
			res += structure(posts[i], key);
		}

		document.getElementById("content").innerHTML += res;

	}else{
		const overlay = document.createElement('div');
		overlay.style.position = 'fixed';
		overlay.style.top = '0';
		overlay.style.left = '0';
		overlay.style.width = '100%';
		overlay.style.height = '100%';
		overlay.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';
		overlay.style.zIndex = '999';

		document.body.appendChild(overlay);

		const floatingBox = document.createElement('div');
		floatingBox.textContent = 'Incorrect password.  ';
		floatingBox.style.position = 'fixed';
		floatingBox.style.top = '50%';
		floatingBox.style.left = '50%';
		floatingBox.style.color = '#A0A0A0';
		floatingBox.style.transform = 'translate(-50%, -50%)';
		floatingBox.style.padding = '10px';
		floatingBox.style.backgroundColor = '#404040';
		floatingBox.style.zIndex = '1000';

		const ret = () => {
			window.location.href = 'index.html';
		};

		const confirmButton = document.createElement('button');
		confirmButton.textContent = 'Return';
		confirmButton.style.padding = '8px';
		confirmButton.style.border = 'none';
		confirmButton.style.backgroundColor = '#808080';
		confirmButton.style.color = 'white';
		confirmButton.style.cursor = 'pointer';
		confirmButton.addEventListener('click', ret);
		floatingBox.appendChild(confirmButton);

		document.body.appendChild(floatingBox);
	}
}
