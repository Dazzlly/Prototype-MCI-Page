#!/usr/bin/env node
/*
 * drive-tree.js — Inspeciona a árvore da pasta mãe do Drive (diagnóstico):
 * imprime pastas com contagem de arquivos e os nomes+tamanhos dos arquivos.
 * Uso: docker compose -f docker-compose.base44.yml --profile tools run --rm drive-sync node scripts/drive-tree.js
 */
const API = "https://www.googleapis.com/drive/v3";

function fail(msg) { console.error("✖ " + msg); process.exit(1); }

async function listChildren(folderId) {
  const items = [];
  let pageToken = null;
  do {
    const q = encodeURIComponent(`'${folderId}' in parents and trashed=false`);
    const url = `${API}/files?q=${q}&fields=files(id,name,mimeType,size,modifiedTime),nextPageToken&pageSize=200&key=${process.env.GOOGLE_DRIVE_API_KEY}${pageToken ? `&pageToken=${pageToken}` : ""}`;
    const res = await fetch(url);
    if (!res.ok) fail(`Drive API ${res.status}: ${await res.text()}`);
    const data = await res.json();
    (data.files || []).forEach(f => items.push(f));
    pageToken = data.nextPageToken;
  } while (pageToken);
  return items;
}

async function walk(id, prefix, depth) {
  const entries = await listChildren(id);
  const files = entries.filter(e => e.mimeType !== "application/vnd.google-apps.folder");
  const folders = entries.filter(e => e.mimeType === "application/vnd.google-apps.folder");
  for (const f of files) console.log(`${prefix}  ${f.name} [${f.size || "?"}b]`);
  for (const f of folders) {
    const child = await listChildren(f.id);
    const cf = child.filter(e => e.mimeType !== "application/vnd.google-apps.folder");
    console.log(`${prefix}📁 ${f.name} (${cf.length} arquivos)`);
    if (depth > 0) await walk(f.id, prefix + "    ", depth - 1);
  }
}

(async () => {
  let root = process.env.GOOGLE_DRIVE_FOLDER_ID;
  const m = /\/folders\/([A-Za-z0-9_-]{10,})/.exec(root);
  if (m) root = m[1];
  const entries = await listChildren(root);
  const files = entries.filter(e => e.mimeType !== "application/vnd.google-apps.folder");
  const folders = entries.filter(e => e.mimeType === "application/vnd.google-apps.folder");
  console.log(`== RAIZ: ${folders.length} pasta(s), ${files.length} arquivo(s) ==`);
  for (const f of files) console.log(`  ${f.name} [${f.size || "?"}b]`);
  for (const f of folders) {
    const child = await listChildren(f.id);
    const cf = child.filter(e => e.mimeType !== "application/vnd.google-apps.folder");
    console.log(`📁 ${f.name} (${cf.length} arquivos diretos)`);
    await walk(f.id, "    ", 2);
  }
})();
