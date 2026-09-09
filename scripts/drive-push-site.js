#!/usr/bin/env node
/*
 * drive-push-site.js — Espelha o PROJETO INTEIRO (código, imagens, dados) para
 * a raiz da PASTA MÃE do Google Drive. A raiz do compartilhamento vira a raiz
 * do site: index.html, data.js, images/, modelos/ etc.
 *
 * SEM DUPLICAR NADA:
 *   - arquivo que já existe no Drive com o mesmo nome E tamanho é pulado;
 *   - arquivo existente com tamanho diferente é atualizado (PATCH);
 *   - fotos GERADAS pela sincronização (modelos/<modelo>/<cor>/<modelo>-<cor>-<n>.ext
 *     e modelos/<modelo>/<modelo>-<n>.ext) NÃO são enviadas — os originais já
 *     estão na pasta "Modelos" do Drive, que é a fonte da verdade.
 *
 * Execução (manual): docker compose -f docker-compose.base44.yml --profile tools run --rm drive-push-site
 */

const fs = require("fs");
const path = require("path");
const { fail, getAccessToken, apiFetch } = require("./drive-auth");

const API = "https://www.googleapis.com/drive/v3";
const REPO = path.join(__dirname, "..");
const FOLDER_MIME = "application/vnd.google-apps.folder";
const SKIP_DIRS = new Set([".git", ".base44", "node_modules"]);

const MIME_BY_EXT = {
  html: "text/html", css: "text/css", js: "text/javascript", json: "application/json",
  jpg: "image/jpeg", jpeg: "image/jpeg", png: "image/png", webp: "image/webp",
  gif: "image/gif", svg: "image/svg+xml", ico: "image/x-icon",
  mp4: "video/mp4", webm: "video/webm", mov: "video/quicktime",
  md: "text/markdown", txt: "text/plain", yml: "text/yaml", yaml: "text/yaml", conf: "text/plain",
};

// Foto baixada do Drive pelo sincronizador (originais já estão em "Modelos"):
// mesmo critério do pruneLocal do drive-sync.js — <modelo>-<cor>-<n>.<ext> ou
// <modelo>-<n>.<ext>, direto na pasta do modelo ou da cor (avulsas da "galeria"
// e outros arquivos não são afetados).
function isSyncPhoto(dir, name) {
  const rel = path.relative(path.join(REPO, "modelos"), dir).split(path.sep).join("/");
  if (!rel || rel.split("/").length > 2) return false; // só modelos/<model> ou modelos/<model>/<cor>
  const prefix = rel.replace(/\//g, "-") + "-";
  return name.startsWith(prefix) && /^\d+\.[a-z0-9]+$/i.test(name.slice(prefix.length));
}

async function findOrCreateFolder(parentId, name) {
  const q = encodeURIComponent(`name='${name.replace(/'/g, "\\'")}' and '${parentId}' in parents and mimeType='${FOLDER_MIME}' and trashed=false`);
  const res = await apiFetch(`${API}/files?q=${q}&fields=files(id,name)&pageSize=5`);
  const existing = (await res.json()).files || [];
  if (existing.length) return existing[0].id;
  const res2 = await apiFetch(`${API}/files`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, mimeType: FOLDER_MIME, parents: [parentId] }),
  });
  return (await res2.json()).id;
}

async function listChildren(folderId) {
  const items = new Map();
  let pageToken = null;
  do {
    const url = `${API}/files?q=${encodeURIComponent(`'${folderId}' in parents and trashed=false`)}&fields=files(id,name,size),nextPageToken&pageSize=200${pageToken ? `&pageToken=${pageToken}` : ""}`;
    const data = await (await apiFetch(url)).json();
    (data.files || []).forEach(f => items.set(f.name, f));
    pageToken = data.nextPageToken;
  } while (pageToken);
  return items;
}

async function uploadFile(folderId, filePath, mimeType, existingId) {
  const body = fs.readFileSync(filePath);
  if (existingId) {
    await apiFetch(`https://www.googleapis.com/upload/drive/v3/files/${existingId}?uploadType=media`, {
      method: "PATCH",
      headers: { "Content-Type": mimeType },
      body,
    });
  } else {
    const res = await apiFetch(`${API}/files?fields=id`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: path.basename(filePath), parents: [folderId] }),
    });
    const { id } = await res.json();
    await apiFetch(`https://www.googleapis.com/upload/drive/v3/files/${id}?uploadType=media`, {
      method: "PATCH",
      headers: { "Content-Type": mimeType },
      body,
    });
  }
}

async function main() {
  let root = process.env.GOOGLE_DRIVE_FOLDER_ID;
  if (!root) fail("GOOGLE_DRIVE_FOLDER_ID ausente.");
  const m = /\/folders\/([A-Za-z0-9_-]{10,})/.exec(root);
  if (m) root = m[1];

  await getAccessToken();
  console.log("⬆ Espelhando o projeto para a pasta mãe do Google Drive...\n");

  let uploaded = 0, updated = 0, skipped = 0, syncSkipped = 0;

  const walk = async (dir, parentId) => {
    const children = await listChildren(parentId);
    const entries = fs.readdirSync(dir, { withFileTypes: true })
      .sort((a, b) => a.name.localeCompare(b.name, undefined, { numeric: true }));
    for (const e of entries) {
      const full = path.join(dir, e.name);
      if (e.isDirectory()) {
        if (SKIP_DIRS.has(e.name)) continue;
        const folderId = await findOrCreateFolder(parentId, e.name);
        await walk(full, folderId);
      } else if (e.isFile()) {
        if (e.name.startsWith(".env")) continue;
        if (isSyncPhoto(dir, e.name)) { syncSkipped++; continue; }
        const size = fs.statSync(full).size;
        const existing = children.get(e.name);
        if (existing && Number(existing.size) === size) { skipped++; continue; }
        const mime = MIME_BY_EXT[(e.name.split(".").pop() || "").toLowerCase()] || "application/octet-stream";
        await uploadFile(parentId, full, mime, existing && existing.id);
        existing ? updated++ : uploaded++;
      }
    }
  };

  await walk(REPO, root);
  console.log(`\n✅ Concluído: ${uploaded} enviado(s), ${updated} atualizado(s), ${skipped} já existia(m) no Drive, ${syncSkipped} foto(s) do Drive ignorada(s) (originais já em Modelos/).`);
}

main().catch(e => fail(e.message));
