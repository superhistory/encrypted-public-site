import base64 
from Crypto.Cipher import AES
from Crypto.Util.Padding import pad,unpad

def raw_encrypt(raw, k):
    key = k.ljust(16, '0')
    raw = pad(raw.encode(),16)
    cipher = AES.new(key.encode('utf-8'), AES.MODE_ECB)
    return base64.b64encode(cipher.encrypt(raw)).decode("utf-8", "ignore")

def raw_decrypt(enc, k):
    key = k.ljust(16, '0')
    enc = base64.b64decode(enc)
    cipher = AES.new(key.encode('utf-8'), AES.MODE_ECB)
    return unpad(cipher.decrypt(enc),16).decode("utf-8", "ignore")

def splay(s, base, idx):
    res = ""

    for i in range(idx, len(s), base):
        res += s[i]

    return res

def weave(s, base):
    res = ""

    idx, pos = 0, 0
    while pos < len(s[idx]):
        res += s[idx][pos]
        idx += 1
        if idx == base:
            idx = 0
            pos += 1

    return res

def encrypt(plaintext, key):
    keys = 1 + (len(key)-1) // 16
    encrypted = []

    for i in range(keys):
        encrypted.append(raw_encrypt(splay(plaintext, keys, i), splay(key, keys, i)))

    return weave(encrypted, keys)

def decrypt(ciphertext, key):
    keys = 1 + (len(key)-1) // 16
    decrypted = []

    for i in range(keys):
        decrypted.append(raw_decrypt(splay(ciphertext, keys, i), splay(key, keys, i)))

    return weave(decrypted, keys)
