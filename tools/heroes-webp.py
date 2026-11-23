from PIL import Image
import os
base = os.path.join(os.path.dirname(__file__), "..", "static", "images", "heroes")
for name in ["inukai-saito", "togo-mimori"]:
    src = os.path.join(base, name + ".png")
    dst = os.path.join(base, name + ".webp")
    im = Image.open(src).convert("RGB")
    im.thumbnail((640, 640))
    im.save(dst, "WEBP", quality=82)
    os.remove(src)
    print(name, os.path.getsize(dst))
