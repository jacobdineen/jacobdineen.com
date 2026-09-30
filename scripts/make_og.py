"""Generate 1200x630 Open Graph cards for every publication.

Run from the repo root:  python3 scripts/make_og.py
Reads content/publications/*/*.md frontmatter and static/teasers/, writes static/og/<slug>.png.
"""
import glob
import os
import re

import yaml
from PIL import Image, ImageDraw, ImageFont

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
FONTS = os.path.join(ROOT, "scripts", "fonts")
W, H = 1200, 630
PAD = 64

BG = (245, 245, 247)
INK = (29, 29, 31)
MUTED = (110, 110, 115)
LINE = (220, 220, 226)
TIERS = {
    "tier-top": ((0, 88, 176), (238, 245, 253), (179, 212, 245)),
    "tier-conf": ((47, 107, 58), (241, 248, 242), (191, 220, 196)),
    "tier-ws": ((138, 90, 0), (253, 247, 236), (236, 211, 164)),
    "tier-pre": ((110, 110, 115), (245, 245, 247), (180, 180, 186)),
}


def font(name, size):
    return ImageFont.truetype(os.path.join(FONTS, name), size)


def serif(size, weight=560):
    f = font("Fraunces.ttf", size)
    f.set_variation_by_axes([96, weight, 0, 0])
    return f


def venue_tier(venue):
    v = (venue or "").lower()
    if re.search(r"preprint|pending|under review|arxiv", v):
        return "tier-pre"
    if re.search(r"workshop|@|viscon", v):
        return "tier-ws"
    if "findings" in v:
        return "tier-conf"
    if re.search(r"\b(emnlp|acl|naacl|colm|neurips|icml|iclr|cvpr|iccv|eccv|aaai|kdd)\b", v) and "aacl" not in v:
        return "tier-top"
    return "tier-conf"


def wrap(draw, text, fnt, max_w, max_lines):
    words, lines, cur = text.split(), [], ""
    for w in words:
        trial = f"{cur} {w}".strip()
        if draw.textlength(trial, font=fnt) <= max_w:
            cur = trial
        else:
            lines.append(cur)
            cur = w
    if cur:
        lines.append(cur)
    if len(lines) > max_lines:
        lines = lines[:max_lines]
        last = lines[-1]
        while draw.textlength(last + "…", font=fnt) > max_w and " " in last:
            last = last.rsplit(" ", 1)[0]
        lines[-1] = last + "…"
    return lines


def fit_title(draw, title, max_w, max_h):
    for size in (54, 50, 46, 42, 38, 34):
        f = serif(size)
        lh = int(size * 1.16)
        lines = wrap(draw, title, f, max_w, max(1, max_h // lh))
        if len(lines) * lh <= max_h and not lines[-1].endswith("…"):
            return f, lines, lh
    return f, lines, lh


def author_line(authors, max_chars=120):
    names = [a.strip() for a in authors.split(",") if a.strip()]
    out = []
    for n in names:
        if len(", ".join(out + [n])) > max_chars:
            out.append("et al.")
            break
        out.append(n)
    return out


def draw_authors(draw, names, x, y, max_w):
    reg, bold = font("Inter-Regular.otf", 23), font("Inter-SemiBold.otf", 23)
    cx, cy, lh = x, y, 34
    for i, n in enumerate(names):
        token = n + ("," if i < len(names) - 1 and n != "et al." else "")
        f = bold if re.search(r"jacob\s+dineen", n, re.I) else reg
        col = INK if f is bold else MUTED
        tw = draw.textlength(token + " ", font=f)
        if cx + tw > x + max_w and cx > x:
            cx, cy = x, cy + lh
        draw.text((cx, cy), token, font=f, fill=col)
        cx += tw
    return cy + lh


def make_card(fm, teaser_path, out_path):
    im = Image.new("RGB", (W, H), BG)
    d = ImageDraw.Draw(im)
    has_fig = teaser_path and os.path.exists(teaser_path)
    text_w = 540 if has_fig else W - 2 * PAD

    mono = font("JetBrainsMono-Regular.ttf", 20)
    d.text((PAD, PAD - 6), "JACOBDINEEN.COM", font=mono, fill=MUTED)

    title_top = PAD + 44
    tf, lines, lh = fit_title(d, fm["title"], text_w, 300)
    y = title_top
    for ln in lines:
        d.text((PAD, y), ln, font=tf, fill=INK)
        y += lh
    y += 18
    y = draw_authors(d, author_line(fm.get("authors", "")), PAD, y, text_w)

    venue = fm.get("venue")
    if venue:
        fg, bgc, border = TIERS[venue_tier(venue)]
        cf = font("JetBrainsMono-Regular.ttf", 21)
        tw = d.textlength(venue, font=cf)
        bx, by = PAD, H - PAD - 44
        d.rounded_rectangle((bx, by, bx + tw + 32, by + 44), radius=8, fill=bgc, outline=border, width=2)
        d.text((bx + 16, by + 9), venue, font=cf, fill=fg)

    if has_fig:
        fx0, fy0, fx1, fy1 = 640, PAD, W - PAD + 8, H - PAD
        frame = Image.new("RGB", (fx1 - fx0, fy1 - fy0), (255, 255, 255))
        fig = Image.open(teaser_path).convert("RGB")
        inner_w, inner_h = frame.width - 44, frame.height - 44
        fig.thumbnail((inner_w, inner_h), Image.LANCZOS)
        frame.paste(fig, ((frame.width - fig.width) // 2, (frame.height - fig.height) // 2))
        mask = Image.new("L", frame.size, 0)
        ImageDraw.Draw(mask).rounded_rectangle((0, 0, frame.width - 1, frame.height - 1), radius=18, fill=255)
        im.paste(frame, (fx0, fy0), mask)
        d.rounded_rectangle((fx0, fy0, fx1 - 1, fy1 - 1), radius=18, outline=LINE, width=2)

    im.save(out_path, "PNG", optimize=True)


def main():
    made = 0
    for md in sorted(glob.glob(os.path.join(ROOT, "content", "publications", "*", "*.md"))):
        raw = open(md, encoding="utf-8").read()
        m = re.match(r"^---\n(.*?)\n---", raw, re.S)
        if not m:
            continue
        fm = yaml.safe_load(m.group(1))
        slug = (fm.get("slug") or "").strip("/").split("/")[-1]
        if not slug or not fm.get("title"):
            continue
        teaser = os.path.join(ROOT, "static", fm["teaser"].lstrip("/")) if fm.get("teaser") else None
        make_card(fm, teaser, os.path.join(ROOT, "static", "og", f"{slug}.png"))
        made += 1
        print("og:", slug)
    print(f"{made} cards written")


if __name__ == "__main__":
    main()
