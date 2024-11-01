key = input("Passphrase: ")

from crypto import encrypt, decrypt

salt = "63479ad69a090b258277ec8fba6f99419a2ffb248981510657c944ccd1148e97"

if not encrypt(salt, key) == open("pepper.js").read()[14:-2]:
    print("Wrong passphrase")
    exit(1)

f = open("secret-content.html", "w")

first = True

for line in open("content.js"):
    if line.startswith('\''):
        if not first:
            f.write("<!-- next -->")
        first = False
        f.write(decrypt(line[1:-3], key))

f.close()
