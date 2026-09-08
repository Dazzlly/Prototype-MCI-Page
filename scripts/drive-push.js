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
 * Requer AUTORIZAÇÃO OAuth da sua conta Google (contas de serviço não podem
 * mais gravar em pastas comuns — política do Google desde 2025):
 *   1. Google Cloud Console → APIs e Serviços → Tela de permissão OAuth:
 *      tipo Externo → preencher → PUBLICAR APLICATIVO (senão o token expira em 7 dias)
 *   2. Credenciais → Criar credenciais → ID do cliente OAuth → Aplicativo para
 *      computador → cadastrar o ID e a chave nos segredos GOOGLE_OAUTH_CLIENT_ID /
 *      GOOGLE_OAUTH_CLIENT_SECRET
 *   3. Rodar o script: ele imprime o link de autorização → autorize com a conta
 *      dona da pasta → copie o "code=..." da barra de endereço → segredo
 *      GOOGLE_OAUTH_CODE → rode de novo → ele imprime o refresh token → segredo
 *      GOOGLE_OAUTH_REFRESH_TOKEN (a partir daí só roda e envia)
 *
 * Execução (manual): docker compose -f docker-compose.base44.yml --profile tools run --rm drive-push
 */

const fs = require("fs");
const path = require("path");

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

// --- OAuth 2.0 (conta do usuário) — sem dependências ---
let cachedToken = null;
async function getAccessToken() {
  if (cachedToken) return cachedToken;
  const clientId = process.env.GOOGLE_OAUTH_CLIENT_ID;
  const clientSecret = process.env.GOOGLE_OAUTH_CLIENT_SECRET;
  const refreshToken = process.env.GOOGLE_OAUTH_REFRESH_TOKEN;

  if (!clientId || !clientSecret) {
    fail("OAuth incompleto: cadastre GOOGLE_OAUTH_CLIENT_ID e GOOGLE_OAUTH_CLIENT_SECRET (Google Cloud → Credenciais → ID do cliente OAuth, tipo 'Aplicativo para computador').");
  }

  // Etapa 2 do primeiro uso: troca do código de autorização pelo refresh token
  if (!refreshToken && process.env.GOOGLE_OAUTH_CODE) {
    const res = await fetch("https://oauth2.googleapis.com/token", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        code: process.env.GOOGLE_OAUTH_CODE,
        client_id: clientId,
        client_secret: clientSecret,
        redirect_uri: "http://localhost:1",
        grant_type: "authorization_code",
      }),
    });
    const d = await res.json();
    if (!res.ok) fail("Falha ao trocar o código de autorização: " + (d.error_description || d.error));
    console.log("\n✅ Autorização concluída! Para finalizar, cole o valor abaixo no segredo GOOGLE_OAUTH_REFRESH_TOKEN e execute este comando novamente:\n");
    console.log(d.refresh_token + "\n");
    process.exit(0);
  }

  // Primeira execução sem código: mostra o link de autorização
  if (!refreshToken) {
    console.log("\n🔗 Acesse no navegador (com a conta DONA da pasta do Drive) e autorize:\n");
    console.log("https://accounts.google.com/o/oauth2/v2/auth?" + new URLSearchParams({
      client_id: clientId,
      redirect_uri: "http://localhost:1",
      response_type: "code",
      scope: "https://www.googleapis.com/auth/drive",
      access_type: "offline",
      prompt: "consent",
    }));
    console.log("\nDepois de autorizar, a página vai falhar a carregar (normal). Copie o valor de code=... da barra de endereço e cadastre no segredo GOOGLE_OAUTH_CODE.\n");
    process.exit(0);
  }

  const res = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      client_id: clientId,
      client_secret: clientSecret,
      refresh_token: refreshToken,
      grant_type: "refresh_token",
    }),
  });
  const d = await res.json();
  if (!res.ok) fail("Falha ao autenticar via OAuth: " + (d.error_description || d.error));
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
  // 1. cria o arquivo com nome e pasta de destino
  const res = await apiFetch(`${API}/files?fields=id`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name: path.basename(filePath), parents: [folderId] }),
  });
  const { id } = await res.json();
  // 2. envia o conteúdo binário
  await apiFetch(`https://www.googleapis.com/upload/drive/v3/files/${id}?uploadType=media`, {
    method: "PATCH",
    headers: { "Content-Type": mimeType },
    body: fs.readFileSync(filePath),
  });
}

async function main() {
  let root = process.env.GOOGLE_DRIVE_FOLDER_ID;
  if (!root) fail("GOOGLE_DRIVE_FOLDER_ID ausente.");
  const m = /\/folders\/([A-Za-z0-9_-]{10,})/.exec(root);
  if (m) root = m[1];

  // fontes locais: modelos/<modelo>/<cor>/*.jpg
  const hasImages = (dir) => fs.readdirSync(dir, { withFileTypes: true })
    .some(c => c.isDirectory() && fs.readdirSync(path.join(dir, c.name)).some(f => IMG_RE.test(f)));
  const models = fs.readdirSync(ROOT_DIR, { withFileTypes: true })
    .filter(d => d.isDirectory()).map(d => d.name).filter(mn => hasImages(path.join(ROOT_DIR, mn)));
  if (!models.length) fail("Nenhuma foto encontrada em modelos/ para enviar.");

  await getAccessToken(); // valida/guia o fluxo OAuth antes de começar
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
