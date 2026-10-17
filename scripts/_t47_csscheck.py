import re

path = "src/templates/template47.css"
s = open(path, encoding="utf-8").read()
s2 = re.sub(r"/\*.*?\*/", "", s, flags=re.S)

depth = 0
err = None
for i, ch in enumerate(s2):
    if ch == "{":
        depth += 1
    elif ch == "}":
        depth -= 1
        if depth < 0:
            err = "negative brace at char %d" % i
            break
print("final depth (want 0):", depth)
print("brace error:", err)

lines = s2.split("\n")
d = 0
bad = []
for ln, line in enumerate(lines, 1):
    for ch in line:
        if ch == "{":
            d += 1
        elif ch == "}":
            d -= 1
    stripped = line.strip()
    if (
        d == 0
        and stripped
        and not stripped.startswith("@")
        and re.match(r"^[a-z-]+\s*:", stripped)
    ):
        bad.append((ln, stripped))

print("top-level orphan declaration lines (want NONE):")
if not bad:
    print("  <none>")
for ln, t in bad:
    print(" ", ln, t)
