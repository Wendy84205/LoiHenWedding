from pathlib import Path
import re
from PIL import Image, ImageDraw, ImageFilter, ImageFont, ImageOps

ROOT = Path(__file__).resolve().parents[1]
PUBLIC = ROOT / 'public'
OUT = PUBLIC / 'social'
OUT.mkdir(parents=True, exist_ok=True)

service_source = (ROOT / 'src/studio/StudioServicePages.jsx').read_text()
path_to_image = {}
for match in re.finditer(r"image:\s*'([^']+)'[\s\S]{0,220}?path:\s*'/template/([^']+)'", service_source):
    image, slug = match.groups()
    path_to_image[slug] = image

for template in (PUBLIC / 'assets/new-templates').iterdir():
    if not template.is_dir():
        continue
    previews = sorted(template.glob('preview.*'))
    if previews:
        path_to_image.setdefault(template.name, '/' + str(previews[0].relative_to(PUBLIC)))

path_to_image.update({
    'thiep-cuoi-2': '/assets/template61/gallery-4.webp',
    'thiep-cuoi-16': '/assets/template39/couple-red-seated.webp',
    'thiep-cuoi-19': '/assets/template39/couple-red-seated.webp',
    'thiep-cuoi-36': '/assets/template61/couple-close.webp',
    'thiep-cuoi-38': '/assets/template39/couple-red-seated.webp',
    'thiep-cuoi-39': '/assets/template39/couple-red.webp',
    'thiep-cuoi-40': '/assets/template44/couple-sticker.webp',
    'thiep-cuoi-42': '/assets/template61/couple-close.webp',
    'thiep-cuoi-44': '/assets/template44/mountain-couple.webp',
    'thiep-cuoi-46': '/assets/template44/couple-sticker.webp',
    'thiep-cuoi-47': '/assets/template39/couple-red.webp',
    'thiep-cuoi-48': '/assets/template44/mountain-couple.webp',
    'thiep-cuoi-61': '/assets/template61/couple-hero.webp',
})

font_candidates = [
    Path('/System/Library/Fonts/Supplemental/Arial Unicode.ttf'),
    Path('/System/Library/Fonts/Supplemental/Arial.ttf'),
]
font_path = next((path for path in font_candidates if path.exists()), None)

def font(size, bold=False):
    if font_path:
        bold_path = Path('/System/Library/Fonts/Supplemental/Arial Bold.ttf')
        return ImageFont.truetype(str(bold_path if bold and bold_path.exists() else font_path), size)
    return ImageFont.load_default()

def draw_card(slug, source, destination):
    image = Image.open(source).convert('RGB')
    canvas = ImageOps.fit(image, (1200, 630), method=Image.Resampling.LANCZOS).filter(ImageFilter.GaussianBlur(24))
    canvas = Image.blend(canvas, Image.new('RGB', canvas.size, '#241b1b'), .58)
    foreground = ImageOps.contain(image, (500, 570), method=Image.Resampling.LANCZOS)
    mask = Image.new('L', foreground.size, 0)
    ImageDraw.Draw(mask).rounded_rectangle((0, 0, foreground.width, foreground.height), radius=24, fill=255)
    x = 1200 - foreground.width - 54
    y = (630 - foreground.height) // 2
    canvas.paste(foreground, (x, y), mask)
    draw = ImageDraw.Draw(canvas)
    number = re.search(r'(\d+)$', slug)
    display = f'MẪU {number.group(1)}' if number else ('BLACK & WHITE' if slug == 'thiep-bw-1' else 'TONE XANH')
    draw.text((62, 62), 'LỜI HẸN WEDDING STUDIO', fill='#f1cfd4', font=font(22, True))
    draw.text((62, 190), display, fill='white', font=font(62, True))
    draw.text((62, 273), 'THIỆP CƯỚI\nONLINE', fill='#f7f0eb', font=font(42), spacing=8)
    draw.line((62, 418, min(x - 36, 515), 418), fill='#d8a6ae', width=2)
    draw.text((62, 448), 'Animation · Album · RSVP · QR', fill='#efe6df', font=font(22))
    canvas.save(destination, 'JPEG', quality=86, optimize=True, progressive=True)

for slug, image_path in sorted(path_to_image.items()):
    source = PUBLIC / image_path.lstrip('/')
    if source.exists():
        draw_card(slug, source, OUT / f'{slug}.jpg')

studio_source = PUBLIC / 'assets/template39/couple-red-seated.webp'
draw_card('studio', studio_source, OUT / 'studio.jpg')
print(f'Generated {len(list(OUT.glob("*.jpg")))} social images in {OUT}')
