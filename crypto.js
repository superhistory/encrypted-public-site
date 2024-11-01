function raw_decrypt(ciphertext, k) {
	const key = CryptoJS.enc.Utf8.parse(k.padEnd(16, '0'));
	const decrypted = CryptoJS.AES.decrypt(ciphertext, key, {mode:CryptoJS.mode.ECB});
	return decrypted.toString(CryptoJS.enc.Utf8);
}

function raw_encrypt(plaintext, k) {
	return CryptoJS.AES.encrypt(
		plaintext,
		CryptoJS.enc.Utf8.parse(k.padEnd(16, '0')),
		{mode:CryptoJS.mode.ECB}).toString();
}

function splay(str, base, idx) {
	let res = "";

	for(let i=idx; i<str.length; i+=base) {
		res += str[i];
	}

	return res;
}

function weave(strings, base) {
	let res = "";

	for(let idx=0, pos=0; pos<strings[idx].length;) {
		res += strings[idx][pos];
		++idx;
		if(idx == base) {
			idx = 0;
			++pos;
		}
	}

	return res;
}

function decrypt(ciphertext, key) {
	let keys = Math.ceil(key.length / 16),
		decrypted = [];

	for(let i=0; i<keys; ++i) {
		decrypted.push(raw_decrypt(splay(ciphertext, keys, i), splay(key, keys, i)));
	}

	return weave(decrypted, keys);
}

let salt = "63479ad69a090b258277ec8fba6f99419a2ffb248981510657c944ccd1148e97";

function correct(key) {
	try {
		let decr = decrypt(pepper, key);
		return decr == salt;

	}catch(e){ return false; }
}
