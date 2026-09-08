#!/usr/bin/env node
/*
 * drive-sync.js — Sincroniza o Google Drive (a partir da PASTA MÃE) para o
 * repositório:
 *   1) com prioridade, espelha as demais pastas da raiz — ex.: "Imagens" é
 *      espelhada em images/ com os nomes originais dos arquivos; um vídeo com
 *      "hero" no nome no primeiro nível vira images/hero.mp4 (vídeo da home);
 *   2) sincroniza as fotos das motos (Modelos/ → modelos/ + manifest.json).
 *
 * ORGANIZAÇÃO (a hierarquia pode ter níveis extras — o script percorre tudo):
 *   <pasta raiz>
 *     ├── Imagens/                    → espelhada em images/ (nomes originais)
 *     └── Modelos/                    → níveis intermediários são ignorados
 *           └── X12/                  → pasta do modelo
 *                 └── White/          → pasta da cor (contém as fotos)
 *                       └── foto1.jpg, foto2.jpg ...
 * Classificação: pasta com imagens e SEM subpastas com imagens = COR (o pai é
 * o MODELO); pasta com imagens E COM subpastas com imagens = pasta do MODELO —
 * as próprias imagens são as fotos GERAIS do modelo, que ficam direto na pasta
 * do modelo (não existe mais a pasta "galeria").
 *
 * TRADUÇÃO DE NOMES (para casar com os slugs do site):
 *   Modelos: JetMax → jet-max, SuperJoy → joy-super (demais nomes: slug direto)
 *   Cores:   White → branco, Black → preto, Cobalt-Blue → azul-cobalto,
 *            Volcanic-Red → vermelho-vulcanico, Grey/Gray → cinza etc.
 *
 * Cada ciclo:
 *   1. Baixa as imagens para modelos/<modelo>/<cor>/<modelo>-<cor>-<n>.<ext>
 *      e as gerais para modelos/<modelo>/<modelo>-<n>.<ext> (renomeadas
 *      automaticamente, em ordem alfabética do Drive)
 *   2. Gera modelos/manifest.json — o site exibe essas fotos em vez das listas
 *      fixas do data.js (chaves: `<modelo>/<cor>` por cor e `<modelo>` p/ gerais)
 *   3. ESPELHAMENTO: o Drive é a fonte da verdade — imagens excluídas ou
 *      movidas de pasta no Drive são removidas do site no próximo ciclo
 *      (arquivos .js/.json do site nunca são tocados)
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

// Extensões de vídeo (vídeo hero da home) e pastas da raiz → pastas do repositório
const VIDEO_EXT_BY_MIME = {
  "video/mp4": "mp4",
  "video/webm": "webm",
  "video/quicktime": "mov",
};
const TOP_FOLDER_ALIASES = { "imagens": "images" };

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

// Percorre a árvore recursivamente. Classificação:
//   - pasta com imagens e SEM subpastas com imagens → COR (o pai é o MODELO)
//   - pasta com imagens E COM subpastas com imagens → pasta do MODELO; as
//     próprias imagens são as fotos GERAIS do modelo (sem cor específica)
async function collect(folderId, name, parentName, out) {
  const entries = await listChildren(folderId);
  const images = entries
    .filter(e => (e.mimeType || "").startsWith("image/"))
    .sort((a, b) => a.name.localeCompare(b.name, undefined, { numeric: true }));
  const folders = entries.filter(e => e.mimeType === FOLDER_MIME);

  // Visita as subpastas primeiro para saber se alguma delas contém imagens
  let childHasImages = false;
  for (const f of folders) {
    if (await collect(f.id, f.name, name, out)) childHasImages = true;
  }

  if (images.length) {
    // Fotos GERAIS do modelo: pasta que também tem subpastas de cor, ou modelo
    // sem pastas de cor (filho direto da pasta "Modelos", ex.: R10)
    if (childHasImages || /^modelos$/i.test(parentName)) {
      out.push({ model: name, color: null, images });
    } else {
      out.push({ model: parentName, color: name, images }); // cor
    }
  }
  return images.length > 0 || childHasImages;
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

// Espelha uma pasta da raiz do Drive para a pasta correspondente do repositório
// (ex.: "Imagens" → images/). Mantém os nomes originais dos arquivos e a
// estrutura de subpastas; só adiciona/atualiza por tamanho — nada é apagado,
// então arquivos avulsos do repositório ficam intactos. No primeiro nível, um
// vídeo com "hero" no nome vira hero.<ext> (vídeo hero da home).
async function mirrorFolder(folderId, folderName) {
  const topSlug = TOP_FOLDER_ALIASES[slugify(folderName)] || slugify(folderName);
  let newCount = 0, heroSaved = false;

  const walk = async (driveId, relParts) => {
    const destDir = path.join(__dirname, "..", topSlug, ...relParts);
    fs.mkdirSync(destDir, { recursive: true });
    const entries = await listChildren(driveId);
    entries.sort((a, b) => a.name.localeCompare(b.name, undefined, { numeric: true }));
    for (const e of entries) {
      if (e.mimeType === FOLDER_MIME) {
        await walk(e.id, [...relParts, slugify(e.name)]);
        continue;
      }
      let dest = path.join(destDir, e.name);
      const vExt = VIDEO_EXT_BY_MIME[e.mimeType];
      if (vExt && relParts.length === 0 && !heroSaved && /^hero/.test(slugify(e.name))) {
        dest = path.join(destDir, `hero.${vExt}`);
        heroSaved = true;
      }
      if (await download(e, dest)) newCount++;
    }
  };

  await walk(folderId, []);
  if (newCount) console.log(`  ✔ ${topSlug}/: ${newCount} arquivo(s) novo(s)/atualizado(s)`);
  return newCount;
}

// Espelhamento: remove imagens locais que não existem mais no Drive
// (foram excluídas ou movidas de pasta). Só toca em arquivos de imagem —
// .js/.json do site e o manifest.json nunca são afetados.
function pruneLocal(manifest) {
  const wanted = new Set();
  for (const paths of Object.values(manifest)) {
    for (const p of paths) wanted.add(path.relative(ROOT_DIR, path.join(__dirname, "..", p)));
  }
  const IMAGE_RE = /\.(jpe?g|png|webp|gif)$/i;
  let removed = 0;
  const walk = (dir) => {
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
      const full = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        walk(full);
        // Remove pastas de cor que ficaram vazias (as do site têm .js/.json)
        if (!fs.readdirSync(full).length) fs.rmdirSync(full);
      } else if (entry.isFile() && IMAGE_RE.test(entry.name) && !wanted.has(path.relative(ROOT_DIR, full))) {
        // Só remove arquivos no padrão gerado pela sincronização (<modelo>-<cor>-<n>.<ext>);
        // imagens avulsas do projeto (fora do Drive) ficam intactas.
        const rel = path.relative(ROOT_DIR, full);
        const prefix = path.dirname(rel).replace(/[\\/]/g, "-") + "-";
        if (entry.name.startsWith(prefix) && /^\d+\.[a-z0-9]+$/i.test(entry.name.slice(prefix.length))) {
          fs.unlinkSync(full);
          removed++;
        }
      }
    }
  };
  if (fs.existsSync(ROOT_DIR)) walk(ROOT_DIR);
  return removed;
}

async function runOnce() {
  console.log("🔄 Sincronizando arquivos do Google Drive...");
  const rootFolders = (await listChildren(process.env.DRIVE_ROOT_ID)).filter(e => e.mimeType === FOLDER_MIME);

  // 1) Espelho das demais pastas da raiz (prioridade: "Imagens" → images/)
  const mirrorList = rootFolders
    .filter(f => !/^modelos$/i.test(f.name))
    .sort((a, b) => Number(slugify(b.name) === "imagens") - Number(slugify(a.name) === "imagens"));
  let totalNew = 0;
  for (const f of mirrorList) totalNew += await mirrorFolder(f.id, f.name);

  // 2) Fotos das motos (Modelos/ → modelos/ + manifest.json)
  const found = [];
  const modelosFolder = rootFolders.find(f => /^modelos$/i.test(f.name));
  if (modelosFolder) await collect(modelosFolder.id, "Modelos", "", found);
  if (!found.length) throw new Error("Nenhuma foto encontrada. Organize uma pasta por modelo e, dentro dela, uma pasta por cor com as fotos.");

  const manifest = {};

  for (const f of found) {
    const mSlug = modelSlug(f.model);
    const cSlug = f.color === null ? null : colorSlug(f.color); // null = fotos gerais do modelo
    const dir = cSlug ? path.join(ROOT_DIR, mSlug, cSlug) : path.join(ROOT_DIR, mSlug);
    fs.mkdirSync(dir, { recursive: true });

    const paths = [];
    for (const [i, img] of f.images.entries()) {
      const ext = EXT_BY_MIME[img.mimeType] || (img.name.split(".").pop() || "jpg").toLowerCase();
      const base = cSlug ? `${mSlug}-${cSlug}-${i + 1}` : `${mSlug}-${i + 1}`;
      const dest = path.join(dir, `${base}.${ext}`);
      const isNew = await download(img, dest);
      if (isNew) totalNew++;
      paths.push(`modelos/${path.relative(ROOT_DIR, dest).split(path.sep).join("/")}`);
    }
    manifest[cSlug ? `${mSlug}/${cSlug}` : mSlug] = paths;
    console.log(`  ✔ ${cSlug ? `${mSlug}/${cSlug}` : mSlug}: ${f.images.length} foto(s)${cSlug ? "" : " (gerais)"}`);
  }

  fs.writeFileSync(MANIFEST, JSON.stringify(manifest, null, 2) + "\n");
  const removed = pruneLocal(manifest);
  console.log(`✅ Concluído: ${totalNew} foto(s) nova(s) baixada(s), ${removed} removida(s) (excluída/movida no Drive), ${Object.keys(manifest).length} cor(es) no manifesto.`);
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
