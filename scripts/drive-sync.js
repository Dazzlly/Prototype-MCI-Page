#!/usr/bin/env node
/*
 * drive-sync.js — Sincroniza as fotos das motos de uma pasta compartilhada
 * do Google Drive para a pasta modelos/ do site.
 *
 * ORGANIZAÇÃO (a hierarquia pode ter níveis extras — o script percorre tudo):
 *   <pasta raiz>
 *     └── Modelos/                    → níveis intermediários são ignorados
 *           └── X12/                  → pasta do modelo
 *                 └── White/          → pasta da cor (contém as fotos)
 *                       └── foto1.jpg, foto2.jpg ...
 * Quando uma pasta contém imagens: a pasta mãe é o MODELO e ela mesma é a COR.
 *
 * TRADUÇÃO DE NOMES (para casar com os slugs do site):
 *   Modelos: JetMax → jet-max, SuperJoy → joy-super (demais nomes: slug direto)
 *   Cores:   White → branco, Black → preto, Cobalt-Blue → azul-cobalto,
 *            Volcanic-Red → vermelho-vulcanico, Grey/Gray → cinza etc.
 *
 * Cada ciclo:
 *   1. Baixa as imagens para modelos/<modelo>/<cor>/<modelo>-<cor>-<n>.<ext>
 *      (renomeadas automaticamente, em ordem alfabética do Drive)
 *   2. Gera modelos/manifest.json — o site exibe essas fotos em vez das listas
 *      fixas do data.js
 *
 * Modos:
 *   - Execução única (padrão):
 *     docker compose -f docker-compose.base44.yml --profile tools run --rm drive-sync
 *   - Modo automático (serviço drive-sync-auto, com DRIVE_SYNC_INTERVAL em segundos):
 *     verifica a pasta em ciclos e sincroniza o que aparecer de novo
 *
 * Ambiente necessário (entregue via /run/base44/app.env):
 *   GOOGLE_DRIVE_API_KEY  — chave de API do Google Cloud com a "Google Drive API" ativada
 *   GOOGLE_DRIVE_FOLDER_ID — ID da pasta raiz (ou o link completo dela; deve estar
 *                            compartilhada como "Qualquer pessoa com o link: Leitor")
 */

const fs = require("fs");
const path = require("path");

const API = "https://www.googleapis.com/drive/v3";
const ROOT_DIR = path.join(__dirname, "..", "modelos");
const MANIFEST = path.join(ROOT_DIR, "manifest.json");
const FOLDER_MIME = "application/vnd.google-apps.folder";

const EXT_BY_MIME = {
  "image/jpeg": "jpg",
  "image/png": "png",
  "image/webp": "webp",
  "image/gif": "gif",
};

// Nomes de pastas no Drive → slugs usados pelo site
const MODEL_ALIASES = {
  "jetmax": "jet-max",
  "superjoy": "joy-super",
};
const COLOR_TRANSLATIONS = {
  "white": "branco",
  "black": "preto",
  "red": "vermelho",
  "blue": "azul",
  "grey": "cinza",
  "gray": "cinza",
  "light-grey": "cinza-claro",
  "light-gray": "cinza-claro",
  "cobalt-blue": "azul-cobalto",
  "volcanic-red": "vermelho-vulcanico",
  "dark-red": "vermelho-vulcanico",
  "dark-blue": "azul-escuro",
};

// Mesma normalização usada pelo site (data.js slugify + remoção de acentos)
const slugify = (name) =>
  name.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "")
    .replace(/^mc\s+/, "").replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "");

const modelSlug = (folderName) => MODEL_ALIASES[slugify(folderName)] || slugify(folderName);
const colorSlug = (folderName) => COLOR_TRANSLATIONS[slugify(folderName)] || slugify(folderName);

function fail(msg) {
  console.error("\n✖ " + msg);
  process.exit(1);
}

async function driveFetch(url) {
  const res = await fetch(url);
  if (!res.ok) {
    const body = await res.text().catch(() => "");
    throw new Error(`Google Drive API respondeu ${res.status}: ${body.slice(0, 300)}`);
  }
  return res;
}

async function listChildren(folderId) {
  const items = [];
  let pageToken = null;
  do {
    const q = encodeURIComponent(`'${folderId}' in parents and trashed=false`);
    const url = `${API}/files?q=${q}&fields=files(id,name,mimeType,size),nextPageToken&pageSize=200&key=${process.env.GOOGLE_DRIVE_API_KEY}${pageToken ? `&pageToken=${pageToken}` : ""}`;
    const data = await (await driveFetch(url)).json();
    (data.files || []).forEach(f => items.push(f));
    pageToken = data.nextPageToken;
  } while (pageToken);
  return items;
}

// Percorre a árvore recursivamente; quando uma pasta contém imagens,
// a pasta mãe é o modelo e ela própria é a cor.
async function collect(folderId, name, parentName, out) {
  const entries = await listChildren(folderId);
  const images = entries
    .filter(e => (e.mimeType || "").startsWith("image/"))
    .sort((a, b) => a.name.localeCompare(b.name, undefined, { numeric: true }));
  if (images.length) out.push({ model: parentName, color: name, images });
  for (const f of entries.filter(e => e.mimeType === FOLDER_MIME)) {
    await collect(f.id, f.name, name, out);
  }
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

async function runOnce() {
  console.log("🔄 Sincronizando fotos do Google Drive...");
  const found = [];
  await collect(process.env.DRIVE_ROOT_ID, "", "", found);
  if (!found.length) throw new Error("Nenhuma foto encontrada. Organize uma pasta por modelo e, dentro dela, uma pasta por cor com as fotos.");

  const manifest = {};
  let totalNew = 0;

  for (const f of found) {
    const mSlug = modelSlug(f.model);
    const cSlug = colorSlug(f.color);
    const dir = path.join(ROOT_DIR, mSlug, cSlug);
    fs.mkdirSync(dir, { recursive: true });

    const paths = [];
    for (const [i, img] of f.images.entries()) {
      const ext = EXT_BY_MIME[img.mimeType] || (img.name.split(".").pop() || "jpg").toLowerCase();
      const dest = path.join(dir, `${mSlug}-${cSlug}-${i + 1}.${ext}`);
      const isNew = await download(img, dest);
      if (isNew) totalNew++;
      paths.push(`modelos/${mSlug}/${cSlug}/${path.basename(dest)}`);
    }
    manifest[`${mSlug}/${cSlug}`] = paths;
    console.log(`  ✔ ${mSlug}/${cSlug}: ${f.images.length} foto(s)`);
  }

  fs.writeFileSync(MANIFEST, JSON.stringify(manifest, null, 2) + "\n");
  console.log(`✅ Concluído: ${totalNew} foto(s) nova(s) baixada(s), ${Object.keys(manifest).length} cor(es) no manifesto.`);
}

async function main() {
  const key = process.env.GOOGLE_DRIVE_API_KEY;
  let root = process.env.GOOGLE_DRIVE_FOLDER_ID;
  if (!key) fail("GOOGLE_DRIVE_API_KEY ausente. Crie uma chave no Google Cloud Console (ative a Google Drive API) e cadastre-a nos segredos.");
  if (!root) fail("GOOGLE_DRIVE_FOLDER_ID ausente. Cadastre o ID (ou link) da pasta raiz compartilhada nos segredos.");
  const m = /\/folders\/([A-Za-z0-9_-]{10,})/.exec(root);
  if (m) root = m[1]; // aceita o link completo da pasta
  process.env.DRIVE_ROOT_ID = root;

  const interval = parseInt(process.env.DRIVE_SYNC_INTERVAL || "0", 10);
  if (interval > 0) {
    console.log(`⏱ Modo automático: verificando a pasta a cada ${interval}s (Ctrl+C para parar).`);
    for (;;) {
      try {
        await runOnce();
      } catch (e) {
        console.error(`✖ Ciclo falhou (tenta de novo no próximo ciclo): ${e.message}`);
      }
      await new Promise(r => setTimeout(r, interval * 1000));
    }
  } else {
    runOnce().catch(e => fail(e.message));
  }
}

main().catch(e => fail(e.message));
