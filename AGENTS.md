# AGENTS.md

Static site (HTML/CSS/vanilla JS), no backend, no build step, no secrets.
Served by nginx from a read-only bind mount of the repo root on host port 3000.
Vehicle data and links live in `data.js`. Edits appear on browser refresh (no HMR — use reload_preview).
