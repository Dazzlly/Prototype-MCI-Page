#!/usr/bin/env node
/*
 * drive-clean-modelos.js — Limpa a pasta "Modelos" do Drive, removando o que
 * os espelhos do site (drive-push / drive-push-site) adicionaram POR CIMA da
 * organização de fotos do usuário. Regras (tudo vai para a LIXEIRA, recuperável):
 *   1. arquivos do site (info.json, info.js, card.js, manifest.json) → lixeira
 *   2. pasta "galeria": arquivo que já existe no repositório ou na raiz do
 *      modelo → lixeira; arquivo único → MOVIDO para a raiz do modelo (nada se perde)
 *   3. pasta de cor: imagem estática que já existe no repositório → lixeira
 *      (ex.: liberty.webp junto com liberty-preto-1.webp); fotos normais ficam
 *   4. pastas que ficarem vazias → lixeira (inclusive pastas de modelo que só
 *      tinham entulho, ex.: duplicatas criadas pelo espelho)
 * Execução: docker compose -f docker-compose.base44.yml --profile tools run --rm drive-push node scripts/drive-clean-modelos.js
 */

const fs = require("fs");
const path = require("path");
const { fail, getAccessToken, apiFetch } = require("./drive-auth");

const API = "https://www.googleapis.com/drive/v3";
const FOLDER_MIME = "application/vnd.google-apps.folder";
const SITE_FILES = new Set(["info.json", "info.js", "card.js", "manifest.json"]);
const MODEL_DIR = path.join(__dirname, "..", "modelos");
const PATTERN_RE = /^(.+)-(\d+)\.(jpe?g|png|webp|gif)$/i;

const slugify = (name) => name.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "")
  .replace(/^mc\s+/, "").replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "");
const MODEL_ALIASES = { "jetmax": "jet-max", "superjoy": "joy-super" };
const modelSlug = (n) => MODEL_ALIASES[slugify(n)] || slugify(n);

// Índice do repositório: nome de arquivo → tamanhos existentes (backup local)
const repoIndex = new Map();
(function index(dir) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, e.name);
    if (e.isDirectory()) index(full);
    else if (/\.(jpe?g|png|webp|gif)$/i.test(e.name)) {
      if (!repoIndex.has(e.name)) repoIndex.set(e.name, new Set());
      try { repoIndex.get(e.name).add(fs.statSync(full).size); } catch {}
    }
  }
})(MODEL_DIR);
const inRepo = (name, size) => (repoIndex.get(name) || new Set()).has(Number(size));

const stats = { files: 0, folders: 0, moved: 0 };

async function listChildren(folderId) {
  const items = [];
  let pageToken = null;
  do {
    const q = encodeURIComponent(`'${folderId}' in parents and trashed=false`);
    const url = `${API}/files?q=${q}&fields=files(id,name,mimeType,size),nextPageToken&pageSize=200${pageToken ? `&pageToken=${pageToken}` : ""}`;
    const data = await (await apiFetch(url)).json();
    items.push(...(data.files || []));
    pageToken = data.nextPageToken;
  } while (pageToken);
  return items;
}

async function trash(entry) {
  await apiFetch(`${API}/files/${entry.id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ trashed: true }),
  });
  stats.files++;
}

async function moveTo(entry, fromId, toId) {
  await apiFetch(`${API}/files/${entry.id}?removeParents=${fromId}&addParents=${toId}`, { method: "PATCH" });
  stats.moved++;
}

// Limpa uma subpasta do modelo ("galeria" ou cor). Retorna nº de arquivos mantidos.
async function cleanSubFolder(folderId, folderName, modelRootId, rootFiles) {
  const entries = await listChildren(folderId);
  let kept = 0;
  for (const e of entries) {
    if (e.mimeType === FOLDER_MIME) { kept++; continue; } // estrutura inesperada: preserva
    if (SITE_FILES.has(e.name.toLowerCase()) || /\.(js|json)$/i.test(e.name)) { await trash(e); continue; }
    if (!(e.mimeType || "").startsWith("image/")) { kept++; continue; }

    if (/^galeria$/i.test(folderName)) {
      if (inRepo(e.name, e.size) || rootFiles.get(e.name) === Number(e.size)) await trash(e);
      else { await moveTo(e, folderId, modelRootId); kept++; }
    } else if (!PATTERN_RE.test(e.name) && inRepo(e.name, e.size) && folderName === folderName.toLowerCase()) {
      await trash(e); // estático do site solto em pasta de cor (ex.: liberty.webp)
    } else {
      kept++;
    }
  }
  if (kept === 0) {
    await trash({ id: folderId });
    stats.folders++;
    console.log(`    🗑 pasta vazia removida: ${folderName}`);
  }
  return kept;
}

async function main() {
  let root = process.env.GOOGLE_DRIVE_FOLDER_ID;
  const m = /\/folders\/([A-Za-z0-9_-]{10,})/.exec(root);
  if (m) root = m[1];
  await getAccessToken();

  const rootEntries = await listChildren(root);
  const modelos = rootEntries.find(e => e.mimeType === FOLDER_MIME && /^modelos$/i.test(e.name));
  if (!modelos) fail("Pasta \"Modelos\" não encontrada na raiz do Drive.");

  console.log("🧹 Limpando a pasta Modelos (tudo vai para a lixeira do Drive, recuperável)...\n");

  // Arquivos soltos na raiz de Modelos: só podem ser do site (manifest.json)
  for (const e of rootEntries) {} // (raiz do compartilhamento não é tocada)
  const modelosEntries = await listChildren(modelos.id);
  for (const e of modelosEntries) {
    if (e.mimeType !== FOLDER_MIME && (SITE_FILES.has(e.name.toLowerCase()) || /\.(js|json)$/i.test(e.name))) {
      await trash(e);
      console.log(`  🗑 arquivo do site removido de Modelos/: ${e.name}`);
    }
  }

  const models = modelosEntries.filter(e => e.mimeType === FOLDER_MIME);
  for (const model of models) {
    const entries = await listChildren(model.id);
    const rootFiles = new Map(entries.filter(e => e.mimeType !== FOLDER_MIME).map(e => [e.name, Number(e.size)]));
    let kept = 0;
    for (const e of entries) {
      if (e.mimeType === FOLDER_MIME) {
        kept += await cleanSubFolder(e.id, e.name, model.id, rootFiles);
      } else if (SITE_FILES.has(e.name.toLowerCase()) || /\.(js|json)$/i.test(e.name)) {
        await trash(e);
      } else {
        kept++; // fotos gerais do modelo ficam
      }
    }
    if (kept === 0) {
      await trash({ id: model.id });
      stats.folders++;
      console.log(`  🗑 "${model.name}" removida (só tinha entulho do espelho)`);
    } else {
      console.log(`  ✔ ${model.name} (${modelSlug(model.name)}): ${kept} arquivo(s) mantido(s)`);
    }
  }

  console.log(`\n✅ Concluído: ${stats.files} arquivo(s) e ${stats.folders} pasta(s) na lixeira, ${stats.moved} arquivo(s) único(s) movido(s) para a raiz do modelo.`);
  console.log("   Recuperável na lixeira do Drive por 30 dias. Rode o drive-sync para regenerar o manifesto.");
}

main().catch(e => fail(e.message));
