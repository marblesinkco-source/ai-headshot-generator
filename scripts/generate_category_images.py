#!/usr/bin/env python3
"""Generate 6 placeholder category images (800x600 JPEG, q90) with PIL.
Drawn at 2x and downsampled for anti-aliasing. No text. Brand palette."""
import math, os
from PIL import Image, ImageDraw, ImageFilter

OUT = "/home/claude/ai-headshot-generator/public/images/categories"
W, H, S = 800, 600, 2

BRONZE = (176, 141, 87); BLACK = (26, 26, 26); PAPER = (245, 240, 235); BEIGE = (232, 223, 208)
NAVY = (28, 34, 52); RED = (140, 36, 38); GOLD = (201, 165, 102)

def mix(a, b, t): return tuple(int(a[i] + (b[i] - a[i]) * t) for i in range(3))

def canvas(top, bottom):
    im = Image.new("RGB", (W * S, H * S))
    d = ImageDraw.Draw(im)
    for y in range(H * S):
        d.line([(0, y), (W * S, y)], fill=mix(top, bottom, y / (H * S - 1)))
    return im

def sc(pts): return [(x * S, y * S) for x, y in pts]
def bb(b): return [b[0]*S, b[1]*S, b[2]*S, b[3]*S]

def shadow(im, box, blur=14, alpha=70, color=BLACK, ellipse=True):
    layer = Image.new("L", im.size, 0)
    d = ImageDraw.Draw(layer)
    (d.ellipse if ellipse else d.rectangle)(bb(box), fill=alpha)
    layer = layer.filter(ImageFilter.GaussianBlur(blur * S))
    im.paste(Image.new("RGB", im.size, color), (0, 0), layer)

def glow(im, cx, cy, r, color, alpha=120):
    layer = Image.new("L", im.size, 0)
    ImageDraw.Draw(layer).ellipse(bb((cx-r, cy-r, cx+r, cy+r)), fill=alpha)
    layer = layer.filter(ImageFilter.GaussianBlur(r * S * 0.45))
    im.paste(Image.new("RGB", im.size, color), (0, 0), layer)

def finish(im, name):
    im = im.resize((W, H), Image.LANCZOS)
    p = os.path.join(OUT, name)
    im.save(p, "JPEG", quality=90, optimize=True)
    return p

def frame(d, inset=22, color=BRONZE, w=2):
    d.rectangle(bb((inset, inset, W-inset, H-inset)), outline=color, width=w*S)

# 1 ---------------------------------------------------------------- pets
def pet_portraits():
    im = canvas(mix(PAPER, BEIGE, .3), mix(BEIGE, (214, 198, 172), .8))
    glow(im, 400, 270, 260, (255, 250, 242), 200)
    # floor sweep + shadow
    d = ImageDraw.Draw(im)
    d.rectangle(bb((0, 470, W, H)), fill=mix(BEIGE, (205, 188, 160), .6))
    shadow(im, (210, 452, 590, 495), 12, 90)
    d = ImageDraw.Draw(im)
    c = (38, 32, 28)
    # sitting dog (left-center)
    d.ellipse(bb((255, 300, 395, 480)), fill=c)            # haunch/body
    d.polygon(sc([(290, 330), (350, 330), (370, 480), (270, 480)]), fill=c)
    d.ellipse(bb((255, 420, 345, 482)), fill=c)            # paw
    d.rounded_rectangle(bb((322, 400, 372, 482)), radius=14*S, fill=c)  # front legs
    d.ellipse(bb((298, 205, 388, 290)), fill=c)            # head
    d.rounded_rectangle(bb((355, 240, 420, 285)), radius=18*S, fill=c)  # snout
    d.ellipse(bb((408, 242, 424, 258)), fill=c)            # nose
    d.polygon(sc([(308, 215), (284, 250), (292, 300), (318, 265)]), fill=c)  # floppy ear
    d.polygon(sc([(350, 212), (372, 192), (385, 232)]), fill=c)              # far ear
    d.polygon(sc([(300, 410), (250, 440), (236, 430), (262, 385)]), fill=c)  # tail
    d.rectangle(bb((335, 268, 360, 310)), fill=c)          # neck
    # collar in bronze
    d.arc(bb((318, 272, 372, 318)), 10, 170, fill=BRONZE, width=7*S)
    # sitting cat (right)
    d.ellipse(bb((440, 340, 550, 482)), fill=c)
    d.polygon(sc([(455, 380), (535, 380), (548, 482), (445, 482)]), fill=c)
    d.ellipse(bb((458, 270, 538, 345)), fill=c)
    d.polygon(sc([(462, 292), (460, 248), (492, 276)]), fill=c)
    d.polygon(sc([(534, 292), (536, 248), (504, 276)]), fill=c)
    # tail curling
    d.arc(bb((520, 400, 620, 490)), 270, 90, fill=c, width=16*S)
    d.ellipse(bb((492, 306, 502, 314)), fill=GOLD); d.ellipse(bb((518, 306, 528, 314)), fill=GOLD)
    # soft arch backdrop frame
    d.arc(bb((180, 90, 620, 530)), 190, 350, fill=BRONZE, width=3*S)
    frame(d)
    return finish(im, "pet-portraits.jpg")

# 2 ----------------------------------------------------------- baby shower
def baby_shower():
    im = canvas((250, 238, 232), (240, 222, 214))
    # soft pastel blobs
    for cx, cy, r, col in [(120, 120, 150, (246, 214, 206)), (700, 480, 170, (214, 226, 224)),
                           (680, 90, 110, (240, 226, 190)), (90, 520, 120, (232, 214, 228))]:
        glow(im, cx, cy, r, col, 190)
    d = ImageDraw.Draw(im)
    # card (5x7 portrait) rotated slightly
    cw, ch = 300, 420
    card = Image.new("RGBA", (cw * S, ch * S), (0, 0, 0, 0))
    cd = ImageDraw.Draw(card)
    cd.rounded_rectangle([0, 0, cw*S-1, ch*S-1], radius=10*S, fill=(255, 252, 247))
    cd.rounded_rectangle([14*S, 14*S, (cw-14)*S, (ch-14)*S], radius=6*S, outline=BRONZE, width=2*S)
    # moon + stars
    cd.ellipse([95*S, 50*S, 205*S, 160*S], fill=(246, 226, 196))
    cd.ellipse([120*S, 44*S, 220*S, 150*S], fill=(255, 252, 247))
    for sx, sy, r in [(215, 70, 9), (80, 150, 6), (235, 135, 5)]:
        cd.polygon([(( sx + (r if i % 2 == 0 else r*.4) * math.cos(math.pi/2 + i*math.pi/4)) * S,
                     ( sy - (r if i % 2 == 0 else r*.4) * math.sin(math.pi/2 + i*math.pi/4)) * S) for i in range(8)], fill=GOLD)
    # bottle & rattle-ish shapes
    cd.rounded_rectangle([120*S, 215*S, 180*S, 305*S], radius=18*S, fill=(214, 226, 224))
    cd.rounded_rectangle([138*S, 192*S, 162*S, 218*S], radius=6*S, fill=(246, 214, 206))
    cd.ellipse([140*S, 178*S, 160*S, 198*S], fill=BRONZE)
    # bunting
    cd.line([(40*S, 330*S), (150*S, 360*S), (260*S, 330*S)], fill=BRONZE, width=2*S)
    for i, col in enumerate([(246, 214, 206), (214, 226, 224), (240, 226, 190), (232, 214, 228), (246, 214, 206)]):
        t = (i + .5) / 5
        x = 40 + 220 * t; y = 330 + 30 * math.sin(math.pi * t)
        cd.polygon([(x-18)*0 + (x-16)*S and ((x-16)*S, y*S), ((x+16)*S, y*S), (x*S, (y+34)*S)], fill=col)
    # lines suggesting text (bars, not text)
    cd.rounded_rectangle([90*S, 385*S, 210*S, 392*S], radius=3*S, fill=BEIGE)
    card = card.rotate(-4, resample=Image.BICUBIC, expand=True)
    x0 = (W*S - card.width)//2; y0 = (H*S - card.height)//2
    sh = Image.new("L", im.size, 0)
    sh.paste(card.split()[3].point(lambda v: 90 if v else 0), (x0 + 14*S, y0 + 22*S))
    sh = sh.filter(ImageFilter.GaussianBlur(16*S))
    im.paste(Image.new("RGB", im.size, (110, 80, 60)), (0, 0), sh)
    im.paste(card, (x0, y0), card)
    d = ImageDraw.Draw(im)
    # confetti shapes around
    for x, y, r, col in [(120, 300, 14, GOLD), (150, 380, 8, (232, 190, 182)), (670, 200, 12, (184, 204, 200)),
                         (640, 330, 7, GOLD), (90, 460, 10, (214, 188, 214)), (710, 400, 9, (232, 190, 182)),
                         (170, 80, 8, (184, 204, 200)), (610, 60, 11, (232, 190, 182))]:
        d.ellipse(bb((x-r, y-r, x+r, y+r)), fill=col)
    return finish(im, "baby-shower.jpg")

# 3 -------------------------------------------------------------- graduation
def graduation():
    im = canvas(mix(PAPER, BEIGE, .4), mix(BEIGE, (212, 196, 168), .7))
    glow(im, 400, 290, 300, (255, 250, 242), 190)
    shadow(im, (170, 470, 640, 520), 14, 90)
    d = ImageDraw.Draw(im)
    cap = NAVY
    # diploma scroll (behind, right-bottom) -- drawn first
    d.rounded_rectangle(bb((430, 400, 640, 450)), radius=25*S, fill=(250, 244, 230))
    d.ellipse(bb((415, 400, 460, 450)), fill=(236, 224, 200), outline=BEIGE)
    d.ellipse(bb((612, 400, 657, 450)), fill=(250, 244, 230), outline=(222, 208, 180), width=2*S)
    d.ellipse(bb((622, 412, 646, 438)), outline=(222, 208, 180), width=2*S)
    d.rectangle(bb((520, 400, 548, 450)), fill=RED)       # ribbon
    d.polygon(sc([(520, 450), (548, 450), (545, 482), (534, 470), (523, 482)]), fill=RED)
    # cap base (skull part)
    d.polygon(sc([(290, 270), (510, 270), (510, 350), (480, 372), (400, 384), (320, 372), (290, 350)]), fill=mix(cap, BLACK, .3))
    d.pieslice(bb((290, 330, 510, 400)), 0, 180, fill=mix(cap, BLACK, .3))
    # mortarboard diamond
    d.polygon(sc([(400, 150), (640, 250), (400, 350), (160, 250)]), fill=cap)
    d.polygon(sc([(400, 150), (640, 250), (400, 262), (160, 250)]), fill=mix(cap, (70, 78, 104), .35))
    d.polygon(sc([(160, 250), (400, 350), (400, 362), (160, 262)]), fill=mix(cap, BLACK, .5))
    d.polygon(sc([(640, 250), (400, 350), (400, 362), (640, 262)]), fill=mix(cap, BLACK, .2))
    # button + tassel
    d.ellipse(bb((388, 244, 412, 262)), fill=GOLD)
    d.line(sc([(400, 252), (560, 262), (594, 300)]), fill=GOLD, width=4*S)
    d.line(sc([(594, 300), (596, 378)]), fill=GOLD, width=5*S)
    d.polygon(sc([(584, 372), (608, 372), (612, 412), (580, 412)]), fill=BRONZE)
    for i in range(7):
        x = 581 + i * 5
        d.line(sc([(x, 412), (x - 1 + (i % 2), 436)]), fill=GOLD, width=2*S)
    d.ellipse(bb((589, 364, 603, 378)), fill=GOLD)
    frame(d)
    return finish(im, "graduation.jpg")

# 4 -------------------------------------------------------------- holiday
def holiday_cards():
    im = canvas((120, 28, 32), (78, 16, 22))
    d = ImageDraw.Draw(im)
    # festive diamond pattern background
    for gx in range(-40, W + 80, 60):
        for gy in range(-40, H + 80, 60):
            r = 5
            d.polygon(sc([(gx, gy-r), (gx+r, gy), (gx, gy+r), (gx-r, gy)]), fill=mix((120, 28, 32), GOLD, .22))
    glow(im, 400, 300, 280, (176, 52, 48), 150)
    # card with fold: two panels, open view
    cx0, cy0, cx1, cy1 = 150, 120, 650, 490
    shadow(im, (cx0+10, cy1-30, cx1+10, cy1+40), 18, 140, BLACK, True)
    d = ImageDraw.Draw(im)
    d.rectangle(bb((cx0, cy0, 400, cy1)), fill=(250, 244, 232))
    d.rectangle(bb((400, cy0, cx1, cy1)), fill=(255, 250, 240))
    # fold shading
    for i in range(24):
        t = i / 24
        d.line(sc([(400 - 24 + i, cy0), (400 - 24 + i, cy1)]), fill=mix((250, 244, 232), (218, 204, 182), t**2), width=S)
        d.line(sc([(400 + i, cy0), (400 + i, cy1)]), fill=mix((226, 212, 190), (255, 250, 240), t**.5), width=S)
    # left panel: tree of triangles
    green = (38, 84, 62)
    for i, (w, y) in enumerate([(70, 190), (95, 245), (120, 305)]):
        d.polygon(sc([(275, y-50), (275+w, y+25), (275-w, y+25)]), fill=green if i % 2 == 0 else mix(green, (60, 110, 80), .5))
    d.rectangle(bb((266, 330, 284, 362)), fill=(86, 54, 36))
    d.polygon(sc([(275, 140), (281, 158), (300, 160), (285, 172), (290, 190), (275, 179), (260, 190), (265, 172), (250, 160), (269, 158)]), fill=GOLD)
    for bx, by, col in [(250, 230, RED), (300, 262, GOLD), (240, 300, GOLD), (312, 318, RED), (276, 290, RED)]:
        d.ellipse(bb((bx-7, by-7, bx+7, by+7)), fill=col)
    d.rectangle(bb((210, 392, 340, 396)), fill=BRONZE)
    # right panel: wreath
    wcx, wcy = 525, 270
    for k in range(36):
        a = k * math.pi / 18
        r = 82
        x = wcx + r * math.cos(a); y = wcy + r * math.sin(a)
        d.ellipse(bb((x-17, y-14, x+17, y+14)), fill=mix(green, (70, 124, 90), (k % 3) / 3))
    for k in range(10):
        a = k * math.pi / 5 + .3
        x = wcx + 82 * math.cos(a); y = wcy + 82 * math.sin(a)
        d.ellipse(bb((x-6, y-6, x+6, y+6)), fill=RED)
    d.ellipse(bb((wcx-52, wcy-52, wcx+52, wcy+52)), fill=(255, 250, 240))
    d.polygon(sc([(wcx-38, wcy+90), (wcx, wcy+70), (wcx-6, wcy+112)]), fill=RED)   # bow
    d.polygon(sc([(wcx+38, wcy+90), (wcx, wcy+70), (wcx+6, wcy+112)]), fill=RED)
    d.ellipse(bb((wcx-9, wcy+72, wcx+9, wcy+92)), fill=mix(RED, BLACK, .2))
    # text-line bars
    d.rounded_rectangle(bb((465, 405, 585, 411)), radius=3*S, fill=BEIGE)
    d.rounded_rectangle(bb((485, 424, 565, 429)), radius=3*S, fill=BEIGE)
    d.rectangle(bb((cx0, cy0, cx1, cy1)), outline=GOLD, width=2*S)
    d.rectangle(bb((cx0+12, cy0+12, cx1-12, cy1-12)), outline=mix(GOLD, (250, 244, 232), .5), width=S)
    # gold sparkles outside
    for x, y, r in [(80, 90, 14), (730, 520, 16), (720, 80, 10), (70, 500, 10), (95, 300, 7), (715, 290, 8)]:
        d.polygon(sc([(x, y-r), (x+r*.25, y-r*.25), (x+r, y), (x+r*.25, y+r*.25), (x, y+r), (x-r*.25, y+r*.25), (x-r, y), (x-r*.25, y-r*.25)]), fill=GOLD)
    return finish(im, "holiday-cards.jpg")

# 5 -------------------------------------------------------------- real estate
def real_estate():
    im = Image.new("RGB", (W*S, H*S), PAPER)
    d = ImageDraw.Draw(im)
    vx, vy = 400, 285                       # vanishing point
    back = (255, 160, 545, 395) if False else (250, 175, 550, 395)
    bx0, by0, bx1, by1 = back
    # back wall
    d.rectangle(bb(back), fill=(238, 229, 214))
    # left wall, right wall, ceiling, floor (trapezoids)
    d.polygon(sc([(0, 0), (bx0, by0), (bx0, by1), (0, H)]), fill=(224, 213, 195))
    d.polygon(sc([(W, 0), (bx1, by0), (bx1, by1), (W, H)]), fill=(214, 202, 183))
    d.polygon(sc([(0, 0), (W, 0), (bx1, by0), (bx0, by0)]), fill=(250, 246, 240))
    # floor with gradient planks
    d.polygon(sc([(0, H), (bx0, by1), (bx1, by1), (W, H)]), fill=(196, 168, 130))
    for i in range(-9, 10):
        xb = vx + i * 85; 
        d.line(sc([(xb * 1.0 + (xb - vx) * 0.0, H) if False else (vx + i * 95, H), (vx + i * 95 * (bx1 - bx0) / W * 1.0 + 0, by1)]), fill=(182, 152, 114), width=S)
    # perspective lines (architectural)
    for p in [(0, 0, bx0, by0), (W, 0, bx1, by0), (0, H, bx0, by1), (W, H, bx1, by1)]:
        d.line(sc([(p[0], p[1]), (p[2], p[3])]), fill=BRONZE, width=2*S)
    d.rectangle(bb(back), outline=BRONZE, width=2*S)
    # window on back wall with light
    wx0, wy0, wx1, wy1 = 330, 205, 470, 340
    glow(im, 400, 300, 140, (255, 248, 226), 150)
    d = ImageDraw.Draw(im)
    d.rectangle(bb((wx0-6, wy0-6, wx1+6, wy1+6)), fill=(250, 246, 240))
    d.rectangle(bb((wx0, wy0, wx1, wy1)), fill=(214, 228, 236))
    for i in range(S*0 + 135):
        t = i / 135
        d.line(sc([(wx0, wy0 + i), (wx1, wy0 + i)]), fill=mix((236, 244, 248), (196, 214, 226), t), width=S)
    d.line(sc([(400, wy0), (400, wy1)]), fill=(250, 246, 240), width=5*S)
    d.line(sc([(wx0, 272), (wx1, 272)]), fill=(250, 246, 240), width=5*S)
    # light patch on floor
    layer = Image.new("L", im.size, 0)
    ImageDraw.Draw(layer).polygon(sc([(345, by1), (455, by1), (520, 520), (270, 520)]), fill=90)
    layer = layer.filter(ImageFilter.GaussianBlur(10*S))
    im.paste(Image.new("RGB", im.size, (255, 244, 214)), (0, 0), layer)
    d = ImageDraw.Draw(im)
    # skirting boards + floor line
    d.line(sc([(bx0, by1), (bx1, by1)]), fill=BRONZE, width=3*S)
    d.polygon(sc([(bx0, by1-9), (bx1, by1-9), (bx1, by1), (bx0, by1)]), fill=(250, 246, 240))
    # dimension markers (empty room, staging zone)
    for x in (80, 720):
        d.ellipse(bb((x-5, 470-5, x+5, 470+5)), fill=BRONZE)
    d.line(sc([(300, 480), (500, 480)]), fill=BRONZE, width=2*S)
    for x in (300, 500): d.line(sc([(x, 472), (x, 488)]), fill=BRONZE, width=2*S)
    # dashed staging outline for furniture on floor
    def dashed(p0, p1, n=14):
        for i in range(n):
            if i % 2 == 0:
                a = i / n; b = (i + 1) / n
                d.line(sc([(p0[0] + (p1[0]-p0[0])*a, p0[1] + (p1[1]-p0[1])*a), (p0[0] + (p1[0]-p0[0])*b, p0[1] + (p1[1]-p0[1])*b)]), fill=BRONZE, width=2*S)
    q = [(250, 440), (550, 440), (520, 405), (280, 405)]
    for i in range(4): dashed(q[i], q[(i+1) % 4])
    return finish(im, "real-estate.jpg")

# 6 ------------------------------------------------------------- ecommerce
def ecommerce_product():
    im = canvas((252, 251, 249), (236, 232, 226))
    glow(im, 400, 250, 300, (255, 255, 255), 230)
    d = ImageDraw.Draw(im)
    horizon = 430
    d.rectangle(bb((0, horizon, W, H)), fill=(240, 236, 230))
    for y in range(horizon, H):
        t = (y - horizon) / (H - horizon)
        d.line([(0, y*S), (W*S, y*S)], fill=mix((246, 243, 238), (232, 226, 218), t), width=S)
    # shadows
    shadow(im, (170, 440, 300, 480), 9, 100)
    shadow(im, (330, 445, 520, 495), 10, 100)
    shadow(im, (565, 440, 665, 478), 9, 90)
    d = ImageDraw.Draw(im)
    # bottle (left): amber glass
    amber = (118, 76, 38)
    d.rounded_rectangle(bb((190, 270, 280, 460)), radius=22*S, fill=amber)
    d.rectangle(bb((222, 215, 248, 275)), fill=amber)
    d.polygon(sc([(190, 310), (222, 270), (248, 270), (280, 310)]), fill=amber)
    d.rounded_rectangle(bb((218, 180, 252, 220)), radius=6*S, fill=BRONZE)
    d.rounded_rectangle(bb((206, 330, 264, 410)), radius=8*S, fill=PAPER)
    d.rectangle(bb((206, 355, 264, 359)), fill=BRONZE)
    d.rounded_rectangle(bb((200, 282, 212, 450)), radius=5*S, fill=mix(amber, (220, 170, 110), .45))  # highlight
    # box (center): box with lid
    d.rounded_rectangle(bb((345, 300, 505, 462)), radius=6*S, fill=BLACK)
    d.polygon(sc([(345, 300), (370, 276), (530, 276), (505, 300)]), fill=mix(BLACK, (80, 80, 80), .35))
    d.polygon(sc([(505, 300), (530, 276), (530, 438), (505, 462)]), fill=mix(BLACK, (60, 60, 60), .2))
    d.rectangle(bb((345, 340, 505, 346)), fill=BRONZE)
    d.polygon(sc([(505, 340), (530, 318), (530, 324), (505, 346)]), fill=mix(BRONZE, BLACK, .3))
    d.rounded_rectangle(bb((402, 376, 448, 416)), radius=6*S, outline=BRONZE, width=2*S)
    # watch (right)
    wx, wy = 615, 360
    d.rounded_rectangle(bb((wx-22, wy-130, wx+22, wy-40)), radius=10*S, fill=(60, 44, 32))
    d.rounded_rectangle(bb((wx-22, wy+40, wx+22, wy+100)), radius=10*S, fill=(60, 44, 32))
    d.ellipse(bb((wx-52, wy-52, wx+52, wy+52)), fill=BRONZE)
    d.ellipse(bb((wx-44, wy-44, wx+44, wy+44)), fill=mix(BRONZE, (240, 210, 150), .5))
    d.ellipse(bb((wx-38, wy-38, wx+38, wy+38)), fill=PAPER)
    for k in range(12):
        a = k * math.pi / 6; r0, r1 = (30, 36) if k % 3 == 0 else (33, 36)
        d.line(sc([(wx + r0*math.cos(a), wy + r0*math.sin(a)), (wx + r1*math.cos(a), wy + r1*math.sin(a))]), fill=BLACK, width=2*S)
    d.line(sc([(wx, wy), (wx + 4, wy - 24)]), fill=BLACK, width=3*S)
    d.line(sc([(wx, wy), (wx + 20, wy + 8)]), fill=BLACK, width=3*S)
    d.ellipse(bb((wx-3, wy-3, wx+3, wy+3)), fill=BRONZE)
    d.rectangle(bb((wx+50, wy-5, wx+58, wy+5)), fill=BRONZE)
    return finish(im, "ecommerce-product.jpg")

if __name__ == "__main__":
    for fn in (pet_portraits, baby_shower, graduation, holiday_cards, real_estate, ecommerce_product):
        p = fn(); im = Image.open(p)
        print(f"{os.path.basename(p)}: {im.size} {im.format} {os.path.getsize(p)//1024} KB")
