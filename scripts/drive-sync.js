#!/usr/bin/env node
/*
 * drive-sync.js — Sincroniza as fotos das motos de uma pasta compartilhada
 * do Google Drive para a pasta modelos/ do site.
 *
 * CONVENÇÃO DE ORGANIZAÇÃO (dentro da pasta raiz compartilhada no Drive):
 *   <pasta raiz>
 *     └── x12/                  → uma pasta por modelo (nome do slug: x12, jet-max, giga...)
 *           └── palmeiras/     → uma pasta por cor (nome da cor: uk, carbono, azul-cobalto...)
 *                 └── foto1.jpg, foto2.jpg ...
 *
 * Cada execução:
 *   1. Baixa as imagens para modelos/<modelo>/<cor>/<modelo>-<cor>-<n>.<ext>
 *      (renomeadas automaticamente, em ordem alfabética do Drive)
 *   2. Gera modelos/manifest.json — o site usa esse manifesto para exibir
 *      as fotos da pasta do Drive em vez das listas fixas do data.js
 *
 * Ambiente necessário (entregue via /run/base44/app.env):
 *   GOOGLE_DRIVE_API_KEY  — chave de API do Google Cloud com a "Google Drive API" ativada
 *   GOOGLE_DRIVE_FOLDER_ID — ID da pasta raiz (ou o link completo dela; deve estar
 *                            compartilhada como "Qualquer pessoa com o link: Leitor")
 *
 * Execução: docker compose -f docker-compose.base44.yml --profile tools run --rm drive-sync
 */

const fs = require("fs");
const path = require("path");

const API = "https://www.googleapis.com/drive/v3";
const ROOT_DIR = path.join(__dirname, "..", "modelos");
const MANIFEST = path.join(ROOT_DIR, "manifest.json");

const EXT_BY_MIME = {
  "image/jpeg": "jpg",
  "image/png": "png",
  "image/webp": "webp",
  "image/gif": "gif",
};

// Mesma normalização usada pelo site (data.js slugify + remoção de acentos)
const slugify = (name) =>
  name.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "")
    .replace(/^mc\s+/, "").replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "");

function fail(msg) {
  console.error("\n✖ " + msg);
  process.exit(1);
}

async function driveFetch(url) {
  const res = await fetch(url);
  if (!res.ok) {
    const body = await res.text().catch(() => "");
    fail(`Google Drive API respondeu ${res.status}: ${body.slice(0, 300)}`);
  }
  return res;
}

async function listFolder(folderId, kind) {
  // kind: "folder" | "image"
  const mime = kind === "folder"
    ? "application/vnd.google-apps.folder"
    : "mimeType contains 'image/'";
  const items = [];
  let pageToken = null;
  do {
    const q = encodeURIComponent(`'${folderId}' in parents and trashed=false and ${kind === "folder" ? `mimeType='${mime}'` : mime}`);
    const url = `${API}/files?q=${q}&fields=files(id,name,mimeType,size),nextPageToken&pageSize=200&key=${process.env.GOOGLE_DRIVE_API_KEY}${pageToken ? `&pageToken=${pageToken}` : ""}`;
    const data = await (await driveFetch(url)).json();
    (data.files || []).forEach(f => items.push(f));
    pageToken = data.nextPageToken;
  } while (pageToken);
  return items;
}

async function download(file, destPath) {
  // Evita baixar de novo se o arquivo local já tem o mesmo tamanho
  try {
    if (fs.existsSync(destPath) && Number(fs.statSync(destPath).size) === Number(file.size)) return false;
  } catch { /* baixa por garantia */ }
  const res = await driveFetch(`${API}/files/${file.id}?alt=media&key=${process.env.GOOGLE_DRIVE_API_KEY}`);
  fs.writeFileSync(destPath, Buffer.from(await res.arrayBuffer()));
  return true;
}

async function main() {
  const key = process.env.GOOGLE_DRIVE_API_KEY;
  let root = process.env.GOOGLE_DRIVE_FOLDER_ID;
  if (!key) fail("GOOGLE_DRIVE_API_KEY ausente. Crie uma chave no Google Cloud Console (ative a Google Drive API) e cadastre-a nos segredos.");
  if (!root) fail("GOOGLE_DRIVE_FOLDER_ID ausente. Cadastre o ID (ou link) da pasta raiz compartilhada nos segredos.");
  const m = /\/folders\/([A-Za-z0-9_-]{10,})/.exec(root);
  if (m) root = m[1]; // aceita o link completo da pasta

  console.log("🔄 Sincronizando fotos do Google Drive...\n");
  const modelFolders = await listFolder(root, "folder");
  if (!modelFolders.length) fail("Nenhuma pasta de modelo encontrada na pasta raiz. Use uma pasta por modelo (x12, jet-max, ...) e dentro delas uma pasta por cor.");

  const manifest = {};
  let totalNew = 0;

  for (const mf of modelFolders) {
    const modelSlug = slugify(mf.name);
    const colorFolders = await listFolder(mf.id, "folder");
    for (const cf of colorFolders) {
      const colorSlug = slugify(cf.name);
      const images = (await listFolder(cf.id, "image")).sort((a, b) => a.name.localeCompare(b.name, undefined, { numeric: true }));
      if (!images.length) continue;

      const dir = path.join(ROOT_DIR, modelSlug, colorSlug);
      fs.mkdirSync(dir, { recursive: true });

      const paths = [];
      for (const [i, img] of images.entries()) {
        const ext = EXT_BY_MIME[img.mimeType] || (img.name.split(".").pop() || "jpg").toLowerCase();
        const dest = path.join(dir, `${modelSlug}-${colorSlug}-${i + 1}.${ext}`);
        const isNew = await download(img, dest);
        if (isNew) totalNew++;
        paths.push(`modelos/${modelSlug}/${colorSlug}/${path.basename(dest)}`);
      }
      manifest[`${modelSlug}/${colorSlug}`] = paths;
      console.log(`  ✔ ${modelSlug}/${colorSlug}: ${images.length} foto(s)`);
    }
  }

  if (!Object.keys(manifest).length) fail("Nenhuma foto encontrada. Verifique se as pastas de cor contêm imagens.");
  fs.writeFileSync(MANIFEST, JSON.stringify(manifest, null, 2) + "\n");
  console.log(`\n✅ Concluído: ${totalNew} foto(s) nova(s) baixada(s), ${Object.keys(manifest).length} cor(es) no manifesto.`);
  console.log("   O site agora exibe essas fotos (modelos/manifest.json).");
}

main().catch(e => fail(e.message));
