# AGENTS.md

Static site (HTML/CSS/vanilla JS), no backend, no build step, no secrets.
Served by nginx from a read-only bind mount of the repo root on host port 3000.
Vehicle data and links live in `data.js`. Edits appear on browser refresh (no HMR — use reload_preview).

## Google Drive photo sync

Photos can be loaded from a shared Google Drive folder (nested levels are walked recursively; a folder
that directly contains images is a COLOR folder, its parent is the MODEL folder), instead of being committed by hand:

- `scripts/drive-sync.js` downloads them into `modelos/<model>/<color>/` (auto-renamed `<model>-<color>-<n>.<ext>`)
  and writes `modelos/manifest.json`.
- `modelo-detalhe.js` prefers manifest photos over the fixed lists in `data.js` (key: `<model>/<slugKey(colorName)>`).
- Run on demand: `docker compose -f docker-compose.base44.yml --profile tools run --rm drive-sync`
- Secrets needed (via `/run/base44/app.env`): `GOOGLE_DRIVE_API_KEY` (Google Cloud, Drive API enabled) and
  `GOOGLE_DRIVE_FOLDER_ID` (root folder shared as "anyone with the link can view"; full URL also accepted).
- The Drive root folder must contain one folder per model and, inside each, one folder per color with the photos.
  English folder names are translated by `scripts/drive-sync.js` (JetMax→jet-max, SuperJoy→joy-super,
  White→branco, Black→preto, Cobalt-Blue→azul-cobalto, Volcanic-Red→vermelho-vulcanico, etc.); unknown
  names fall back to their slug.
