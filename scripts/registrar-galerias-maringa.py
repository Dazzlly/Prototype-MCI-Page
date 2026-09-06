#!/usr/bin/env python3
"""Adiciona as imagens baixadas do site de Maringá às galerias
dos modelos em data.js e model-data-extra.js."""
import re
import glob

TARGETS = {
    "model-data-extra.js": [
        "mia", "jet-max", "jet", "bob", "sofia", "joy-super", "ret", "soma",
        "joyzinha", "joy-tri", "big-tri", "mia-tri", "ved", "x15", "x11",
        "20", "roma", "style",
    ],
    "data.js": ["giga", "x12", "pitica"],
}

for fname, slugs in TARGETS.items():
    with open(fname, encoding="utf-8") as f:
        src = f.read()
    for slug in slugs:
        files = sorted(glob.glob(f"modelos/{slug}/galeria/{slug}-maringa-*"))
        if not files:
            print(f"{fname}: {slug} sem imagens novas, pulado")
            continue
        pattern = re.compile(
            r'((?:"%s"|%s): \{[\s\S]*?gallery: \[)([\s\S]*?)(\])' % (re.escape(slug), re.escape(slug))
        )
        m = pattern.search(src)
        if not m:
            print(f"{fname}: bloco/galeria de {slug} NÃO encontrado")
            continue
        entries = "".join(f'\n      "{p}",' for p in files)
        body = m.group(2).rstrip()
        if body and not body.endswith(","):
            body += ","
        new = m.group(1) + body + entries + "\n    " + m.group(3)
        src = src[: m.start()] + new + src[m.end():]
        print(f"{fname}: {slug} +{len(files)} imagens")
    with open(fname, "w", encoding="utf-8") as f:
        f.write(src)
print("concluído")
