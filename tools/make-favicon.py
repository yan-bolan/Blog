from PIL import Image
import os
root = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
src = os.path.join(root, "static", "avatar.png")
im = Image.open(src).convert("RGBA")
w, h = im.size
s = min(w, h)
im = im.crop(((w - s) // 2, (h - s) // 2, (w - s) // 2 + s, (h - s) // 2 + s))
sizes = [(16, 16), (32, 32), (48, 48), (64, 64), (128, 128), (256, 256)]
out = os.path.join(root, "static", "favicon.ico")
im.save(out, sizes=sizes)
im.resize((256, 256)).save(os.path.join(root, "tools", "shots", "favicon-preview.png"))
print("src", w, h, "ico_bytes", os.path.getsize(out))
