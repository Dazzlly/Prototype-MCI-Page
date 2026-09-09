#!/usr/bin/env python3
"""Reconstrói os arrays `colors` de cada modelo em data.js / model-data-extra.js,
adicionando as imagens de cada cor (variantes baixadas do site de Maringá).

- Cores com variante ganham { name, hex, images: [...] }
- Entradas shield (edições especiais Vasco/Palmeiras) são preservadas
- Cores existentes sem variante correspondente são mantidas no fim (sem imagens)
"""
import csv
import re
import unicodedata
import glob
import json

# slug -> arquivo onde o modelo vive
FILE_OF = {}
TARGETS = {
    "model-data-extra.js": [
        "mia", "jet-max", "jet", "bob", "sofia", "joy-super", "ret", "soma",
        "joyzinha", "joy-tri", "big-tri", "mia-tri", "ved", "x15", "x11",
        "20", "roma", "style",
    ],
    "data.js": ["giga", "x12", "pitica", "r10"],
}
for fname, slugs in TARGETS.items():
    for s in slugs:
        FILE_OF[s] = fname

# manifesto: slug -> [(nome, vslug, [paths])]
variants = {}
with open("scripts/variant-manifest.tsv", encoding="utf-8") as f:
    for slug, nome, vslug, vid, path in csv.reader(f, delimiter="\t"):
        variants.setdefault(slug, {}).setdefault(nome, {"slug": vslug, "images": []})
        if path not in variants[slug][nome]["images"]:
            variants[slug][nome]["images"].append(path)


def norm(s):
    s = unicodedata.normalize("NFKD", s).encode("ascii", "ignore").decode()
    return re.sub(r"\s+", " ", s).strip().lower()


DEFAULT_HEX = [
    ("azul", "#1e5b94"), ("preto", "#1a1a1a"), ("preta", "#1a1a1a"),
    ("branco", "#e8e8e8"), ("creme", "#f2ead9"), ("cinza", "#6b6b6b"),
    ("vermelho", "#a01d1d"), ("violeta", "#7a3aa8"), ("roxo", "#7a3aa8"),
    ("verde", "#0a6847"), ("amarelo", "#e6b800"), ("rosa", "#f5a9c3"),
    ("laranja", "#e8722a"), ("prata", "#c0c0c0"),
]


def hex_for(nome, existing):
    nn = norm(nome)
    # herda hex de cor existente com nome compatível
    for c in existing:
        en = norm(c["name"])
        if en == nn or en in nn or nn in en:
            if "hex" in c:
                return c["hex"]
    for key, hx in DEFAULT_HEX:
        if key in nn:
            return hx
    return "#888888"


for fname in TARGETS:
    with open(fname, encoding="utf-8") as f:
        src = f.read()

    for slug in TARGETS[fname]:
        if slug not in variants:
            continue
        # localiza o bloco do modelo
        bm = re.search(r'(?m)^\s*(?:"%s"|%s): \{' % (re.escape(slug), re.escape(slug)), src)
        if not bm:
            print(f"{fname}: bloco {slug} não encontrado")
            continue
        # localiza colors: [ ... ] dentro do bloco
        cm = re.compile(r"colors: \[([\s\S]*?)\n    \]").search(src, bm.start())
        if not cm:
            # bloco sem colors: será criado logo após a abertura do bloco
            insert_at = src.index("{", bm.start()) + 1
            existing = []
        else:
            insert_at = cm.start()
            body = cm.group(1)

        # parse das entradas existentes
        existing = []
        if cm:
            for em in re.finditer(r"\{[^}]+\}", body):
                txt = em.group(0)
                name = re.search(r'name:\s*"([^"]*)"', txt)
                if not name:
                    continue
                entry = {"name": name.group(1)}
                hx = re.search(r'hex:\s*"([^"]*)"', txt)
                if hx:
                    entry["hex"] = hx.group(1)
                if "shield" in txt:
                    entry["shield"] = True
                    entry["raw"] = txt
                existing.append(entry)

        shield_txt = [e["raw"] for e in existing if e.get("shield")]
        vnorms = [norm(n) for n in variants[slug]]

        lines = ["colors: ["]
        for nome, info in variants[slug].items():
            hx = hex_for(nome, existing)
            lines.append(f'      {{ name: "{nome}", hex: "{hx}", images: [')
            for p in info["images"]:
                lines.append(f'        "{p}",')
            lines.append("      ] },")
        for e in existing:
            if e.get("shield"):
                continue
            en = norm(e["name"])
            # descarta cores existantes que já correspondem (fuzzy) a uma variante
            if any(en == vn or en in vn or vn in en for vn in vnorms):
                continue
            hx = f', hex: "{e["hex"]}"' if "hex" in e else ""
            lines.append(f'      {{ name: "{e["name"]}"{hx} }},')
        for raw in shield_txt:
            lines.append(f"      {raw},")
        lines.append("    ]")
        new_block = "\n".join(lines)
        if cm:
            src = src[: cm.start()] + new_block + src[cm.end():]
        else:
            src = src[:insert_at] + "\n    " + new_block + "," + src[insert_at:]
        print(f"{fname}: {slug} cores atualizadas ({len(variants[slug])} variantes)")

    with open(fname, "w", encoding="utf-8") as f:
        f.write(src)

print("concluído")
