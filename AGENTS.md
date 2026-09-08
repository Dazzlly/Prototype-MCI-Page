# AGENTS.md

Static site (HTML/CSS/vanilla JS), no backend, no build step, no secrets.
Served by nginx from a read-only bind mount of the repo root on host port 3000.
Vehicle data and links live in `data.js`. Edits appear on browser refresh (no HMR — use reload_preview).

## Google Drive photo sync

Photos and site assets are pulled from a shared Google Drive folder (the ROOT folder — everything under it is synced):

- `scripts/drive-sync.js` mirrors, with priority, the other root folders into the repo — e.g. Drive "Imagens"
  → repo `images/` keeping original file names and subfolder structure (additive: files are added/updated by size,
  nothing is deleted, so repo-only files stay). A video whose name starts with "hero" at the top level of a
  mirrored folder becomes `images/hero.mp4` (hero video of the home; `index.html` tries the local copy first
  and falls back to the remote WordPress URL while the Drive copy doesn't exist).
- Motorcycle photos live under `Modelos/<Model>/`: images directly in the model folder are the model's GENERAL
  photos (manifest key `<model>`); each color subfolder holds that color's photos (key `<model>/<color>`).
  There is NO "galeria" folder anymore (a one-shot migration, `scripts/drive-migrate-galeria.js`, already moved
  those photos up in Drive).
- `modelo-detalhe.js` prefers manifest photos over the fixed lists in `data.js`. The gallery shows ALL photos of
  the model (general + all colors); selecting a color only reorders — that color's photos come first, then the
  model's general photos, then the other colors.
- Run on demand: `docker compose -f docker-compose.base44.yml --profile tools run --rm drive-sync`
- Auto-sync: the `drive-sync-auto` service runs in watch mode (`DRIVE_SYNC_INTERVAL=300`) and pulls new
  Drive photos into `modelos/` + regenerates `manifest.json` every cycle.
- MIRRORING: the Drive is the source of truth for sync-managed photos. Each cycle also deletes local
  files matching the sync naming pattern (`<model>-<color>-<n>.<ext>`) that are no longer in
  `manifest.json` — so deleting or moving a photo between color folders in Drive removes/moves it on
  the site at the next cycle (renames in Drive only change gallery order). Project-only images that
  don't follow the pattern (e.g. `*-maringa-*.jpg`, `extra-*.webp`) are never touched.
- Secrets needed (via `/run/base44/app.env`): `GOOGLE_DRIVE_API_KEY` (Google Cloud, Drive API enabled) and
  `GOOGLE_DRIVE_FOLDER_ID` (root folder shared as "anyone with the link can view"; full URL also accepted).
- REVERSE sync (manual only, on user request) `scripts/drive-push.js` uploads repo photos from
  `modelos/<model>/<color>/` into Drive, creating missing `Modelos/<Model>/<Color>/` folders (names translated
  back: branco→White, jet-max→JetMax...). Uses user OAuth (secrets GOOGLE_OAUTH_CLIENT_ID/SECRET/REFRESH_TOKEN)
  — service accounts can't write to regular folders anymore (Google 2025 policy). First run guides the OAuth
  flow (auth link → code secret → refresh token secret).
  Run: `docker compose -f docker-compose.base44.yml --profile tools run --rm drive-push`
- The Drive root folder must contain: one "Imagens" folder (site assets + hero video) and one "Modelos" folder
  with one folder per model; inside each model folder the general photos and one subfolder per color.
  English folder names are translated by `scripts/drive-sync.js` (JetMax→jet-max, SuperJoy→joy-super,
  White→branco, Black→preto, Cobalt-Blue→azul-cobalto, Volcanic-Red→vermelho-vulcanico, etc.); unknown
  names fall back to their slug.
