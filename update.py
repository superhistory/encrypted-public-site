key = input("Passphrase: ")

from crypto import encrypt

salt = "63479ad69a090b258277ec8fba6f99419a2ffb248981510657c944ccd1148e97"

def ench(post):
    return encrypt(post, key)

f = open("pepper.js", "w")
f.write(f"let pepper = '{encrypt(salt, key)}';")
f.close()

f = open("content.js", "w")
f.write("const posts = [\n")

for post in map(ench, open("secret-content.html").read().split("<!-- next -->")):
    f.write(f"'{post}',\n")

f.write("];")
f.close()

print("Success")
