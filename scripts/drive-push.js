#!/usr/bin/env node
/*
 * drive-push.js — Sincronização INVERSA (manual, sob demanda):
 * envia as fotos que existem em modelos/ do site para as pastas do Google Drive,
 * criando as pastas que faltarem no mesmo padrão já usado:
 *   <raiz>/Modelos/<Modelo>/<Cor>/  (ex.: Modelos/X12/White/)
 *
 * Nomes são traduzidos de volta: branco→White, preto→Black, jet-max→JetMax etc.
 * Arquivos que já existem na pasta do Drive (mesmo nome) não são enviados de novo.
 *
 * Requer uma CONTA DE SERVIÇO do Google (chave de API não pode escrever):
 *   1. Google Cloud Console → IAM e Administrador → Contas de serviço → Criar
 *   2. Chaves → Adicionar chave → JSON (baixa um arquivo)
 *   3. Compartilhar a pasta raiz do Drive com o e-mail da conta de serviço
 *      como "Editor" (ou "Gerente de conteúdo")
 *   4. Colar o CONTEÚDO do JSON no segredo GOOGLE_SERVICE_ACCOUNT_JSON
 *
 * Execução (manual): docker compose -f docker-compose.base44.yml --profile tools run --rm drive-push
 */

const fs = require("fs");
const path = require("path");
const { createSign } = require("crypto");

const API = "https://www.googleapis.com/drive/v3";
const ROOT_DIR = path.join(__dirname, "..", "modelos");
const FOLDER_MIME = "application/vnd.google-apps.folder";
const IMG_RE = /\.(jpe?g|png|webp|gif)$/i;
const MIME_BY_EXT = { jpg: "image/jpeg", jpeg: "image/jpeg", png: "image/png", webp: "image/webp", gif: "image/gif" };

// slugs do site → nomes de pastas no Drive (inverso das traduções do drive-sync.js)
const MODEL_DRIVE_NAMES = { "jet-max": "JetMax", "joy-super": "SuperJoy" };
const COLOR_DRIVE_NAMES = {
  "branco": "White",
  "preto": "Black",
  "vermelho": "Red",
  "azul": "Blue",
  "cinza": "Grey",
  "cinza-claro": "Light-Grey",
  "azul-cobalto": "Cobalt-Blue",
  "vermelho-vulcanico": "Volcanic-Red",
  "azul-escuro": "Dark-Blue",
};

function fail(msg) {
  console.error("\n✖ " + msg);
  process.exit(1);
}

// --- OAuth2 com conta de serviço (JWT assinado, sem dependências) ---
let cachedToken = null;
async function getAccessToken() {
  if (cachedToken) return cachedToken;
  const sa = JSON.parse(process.env.GOOGLE_SERVICE_ACCOUNT_JSON);
  const b64 = o => Buffer.from(JSON.stringify(o)).toString("base64url");
  const now = Math.floor(Date.now() / 1000);
  const unsigned = b64({ alg: "RS256", typ: "JWT" }) + "." + b64({
    iss: sa.client_email,
    scope: "https://www.googleapis.com/auth/drive",
    aud: "https://oauth2.googleapis.com/token",
    exp: now + 3600,
    iat: now,
  });
  const signer = createSign("RSA-SHA256");
  signer.update(unsigned);
  const assertion = unsigned + "." + signer.sign(sa.private_key, "base64url");
  const res = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({ grant_type: "urn:ietf:params:oauth:grant-type:jwt-bearer", assertion }),
  });
  const d = await res.json();
  if (!res.ok) fail("Falha ao autenticar a conta de serviço: " + (d.error_description || res.status));
  cachedToken = d.access_token;
  return cachedToken;
}

async function apiFetch(url, opts = {}) {
  const res = await fetch(url, {
    ...opts,
    headers: { Authorization: `Bearer ${await getAccessToken()}`, ...(opts.headers || {}) },
  });
  if (!res.ok) {
    const body = await res.text().catch(() => "");
    throw new Error(`Drive API respondeu ${res.status}: ${body.slice(0, 300)}`);
  }
  return res;
}

async function findOrCreateFolder(parentId, name) {
  const q = encodeURIComponent(`name='${name.replace(/'/g, "\\'")}' and '${parentId}' in parents and mimeType='${FOLDER_MIME}' and trashed=false`);
  const res = await apiFetch(`${API}/files?q=${q}&fields=files(id,name)&pageSize=5`);
  const existing = (await res.json()).files || [];
  if (existing.length) return { id: existing[0].id, created: false };
  const res2 = await apiFetch(`${API}/files`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, mimeType: FOLDER_MIME, parents: [parentId] }),
  });
  return { id: (await res2.json()).id, created: true };
}

async function listFileNames(folderId) {
  const names = new Set();
  let pageToken = null;
  do {
    const url = `${API}/files?q=${encodeURIComponent(`'${folderId}' in parents and trashed=false`)}&fields=files(name),nextPageToken&pageSize=200${pageToken ? `&pageToken=${pageToken}` : ""}`;
    const data = await (await apiFetch(url)).json();
    (data.files || []).forEach(f => names.add(f.name));
    pageToken = data.nextPageToken;
  } while (pageToken);
  return names;
}

async function uploadFile(folderId, filePath, mimeType) {
  const boundary = "motochefe-" + Date.now();
  const meta = JSON.stringify({ name: path.basename(filePath), parents: [folderId] });
  const body = Buffer.concat([
    Buffer.from(`--${boundary}\r\nContent-Type: application/json; charset=UTF-8\r\n\r\n${meta}\r\n--${boundary}\r\nContent-Type: ${mimeType}\r\n\r\n`),
    fs.readFileSync(filePath),
    Buffer.from(`\r\n--${boundary}--`),
  ]);
  await apiFetch(`${API}/files?uploadType=multipart&fields=id`, {
    method: "POST",
    headers: { "Content-Type": `multipart/related; boundary=${boundary}` },
    body,
  });
}

async function main() {
  if (!process.env.GOOGLE_SERVICE_ACCOUNT_JSON) {
    fail("GOOGLE_SERVICE_ACCOUNT_JSON ausente. Crie uma conta de serviço no Google Cloud (chave JSON) e compartilhe a pasta do Drive com o e-mail dela como 'Editor'. Cadastre o JSON no segredo.");
  }
  let root = process.env.GOOGLE_DRIVE_FOLDER_ID;
  if (!root) fail("GOOGLE_DRIVE_FOLDER_ID ausente.");
  const m = /\/folders\/([A-Za-z0-9_-]{10,})/.exec(root);
  if (m) root = m[1];

  // fontes locais: modelos/<modelo>/<cor>/*.jpg
  const models = fs.readdirSync(ROOT_DIR, { withFileTypes: true })
    .filter(d => d.isDirectory() && d.name !== ".git").map(d => d.name)
    .filter(mn => fs.existsSync(path.join(ROOT_DIR, mn)) && fs.readdirSync(path.join(ROOT_DIR, mn)).some(c =>
      fs.statSync(path.join(ROOT_DIR, mn, c)).isDirectory() && fs.readdirSync(path.join(ROOT_DIR, mn, c)).some(f => IMG_RE.test(f))));
  if (!models.length) fail("Nenhuma foto encontrada em modelos/ para enviar.");

  console.log("⬆ Sincronização invertida: enviando fotos do projeto para o Google Drive...\n");
  const modelosFolder = await findOrCreateFolder(root, "Modelos");

  let uploaded = 0, skipped = 0, foldersCreated = 0;
  for (const modelSlug of models) {
    const modelFolder = await findOrCreateFolder(modelosFolder.id, MODEL_DRIVE_NAMES[modelSlug] || modelSlug);
    if (modelFolder.created) foldersCreated++;

    const colorDirs = fs.readdirSync(path.join(ROOT_DIR, modelSlug), { withFileTypes: true })
      .filter(d => d.isDirectory() && fs.readdirSync(path.join(ROOT_DIR, modelSlug, d.name)).some(f => IMG_RE.test(f)));

    for (const cd of colorDirs) {
      const colorFolder = await findOrCreateFolder(modelFolder.id, COLOR_DRIVE_NAMES[cd.name] || cd.name);
      if (colorFolder.created) foldersCreated++;
      const existing = await listFileNames(colorFolder.id);

      const files = fs.readdirSync(path.join(ROOT_DIR, modelSlug, cd.name)).filter(f => IMG_RE.test(f)).sort();
      for (const f of files) {
        const fp = path.join(ROOT_DIR, modelSlug, cd.name, f);
        if (existing.has(f)) { skipped++; continue; }
        await uploadFile(colorFolder.id, fp, MIME_BY_EXT[f.split(".").pop().toLowerCase()] || "image/jpeg");
        uploaded++;
      }
      console.log(`  ✔ ${MODEL_DRIVE_NAMES[modelSlug] || modelSlug}/${COLOR_DRIVE_NAMES[cd.name] || cd.name}: ${files.length} foto(s) no total`);
    }
  }

  console.log(`\n✅ Concluído: ${uploaded} enviada(s), ${skipped} já existia(m), ${foldersCreated} pasta(s) criada(s).`);
}

main().catch(e => fail(e.message));
