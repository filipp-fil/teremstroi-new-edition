"""Генерация плейсхолдер-фото для проектов и работ (заменить на реальные)."""
import os
from PIL import Image, ImageDraw

ROOT = os.path.dirname(os.path.abspath(__file__))

# (подпапка, имя файла)
TARGETS = []
projects = {
    "karkasnyi-dom-100": 2, "karkasnyi-dom-120": 2, "dom-iz-brusa-80": 2,
    "karkasnyi-dom-150": 2, "dom-iz-brusa-110": 1, "karkasnyi-dom-60": 1,
    "karkasnaya-banya-24": 1, "banya-iz-brusa-36": 1,
    "karkasnaya-banya-18": 1, "banya-iz-brusa-50": 1,
}
works = {"dom-v-vyborge": 2, "banya-v-gatchine": 1, "dom-v-toksovo": 1, "banya-v-sertolovo": 1}

for slug, count in projects.items():
    for i in range(1, count + 1):
        TARGETS.append((f"images/projects/{slug}", f"{i}.jpg"))
for slug, count in works.items():
    for i in range(1, count + 1):
        TARGETS.append((f"images/works/{slug}", f"{i}.jpg"))

W, H = 1200, 900

for folder, name in TARGETS:
    path = os.path.join(ROOT, "public", folder)
    os.makedirs(path, exist_ok=True)
    img = Image.new("RGB", (W, H), (234, 245, 219))  # светло-салатовый фон
    d = ImageDraw.Draw(img)
    # «холм»
    d.rectangle([0, H - 160, W, H], fill=(140, 198, 63))
    d.polygon([(0, H - 160), (W // 2, H - 260), (W, H - 160)], fill=(107, 165, 52))
    # силуэт домика
    hx, hy, hw, hh = W // 2 - 150, H - 470, 300, 240
    d.rectangle([hx, hy, hx + hw, hy + hh], fill=(30, 58, 30))
    d.polygon([(hx - 30, hy), (hx + hw // 2, hy - 110), (hx + hw + 30, hy)], fill=(230, 57, 70))
    d.rectangle([hx + hw // 2 - 35, hy + 100, hx + hw // 2 + 35, hy + hh], fill=(140, 198, 63))
    # подпись
    label = "PHOTO PLACEHOLDER"
    d.text((W // 2 - 130, 60), label, fill=(30, 58, 30))
    d.text((W // 2 - 175, 95), "replace with real photo (see README)", fill=(107, 165, 52))
    img.save(os.path.join(path, name), "JPEG", quality=82)
    print("ok:", folder, name)

print("done")
