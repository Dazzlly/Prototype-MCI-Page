#!/usr/bin/env node
/*
 * drive-migrate-galeria.js — MIGRAÇÃO ÚNICA (one-shot, manual):
 * move as fotos das pastas "galeria" de cada modelo para a PASTA MÃE do modelo
 * no Drive (nova organização: as fotos gerais do modelo ficam direto na pasta
 * dele, junto das subpastas de cor) e exclui as pastas "galeria" que ficarem
 * vazias.
 *
 * Depois disso o drive-sync passa a reconhecê-las como fotos gerais
 * (chave `<modelo>` no manifest.json) e o site mostra a galeria completa.
 *
 * Uso (OAuth do drive-push já autorizado):
 *   docker compose -f docker-compose.base44.yml --profile tools run --rm drive-push node scripts/drive-migrate-galeria.js
 */

const API = "https://www.googleapis.com/drive/v3";
const FOLDER_MIME = "application/vnd.google-apps.folder";

function fail(msg) {
  console.error("\n✖ " + msg);
  process.exit(1);
}

let cachedToken = null;
async function getAccessToken() {
  if (cachedToken) return cachedToken;
  const clientId = process.env.GOOGLE_OAUTH_CLIENT_ID;
  const clientSecret = process.env.GOOGLE_OAUTH_CLIENT_SECRET;
  const refreshToken = process.env.GOOGLE_OAUTH_REFRESH_TOKEN;
  if (!clientId || !clientSecret || !refreshToken) {
    fail("OAuth incompleto: cadastre GOOGLE_OAUTH_CLIENT_ID, GOOGLE_OAUTH_CLIENT_SECRET e GOOGLE_OAUTH_REFRESH_TOKEN (mesmos segredos do drive-push).");
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
    if (res.status === 429) { // teto de requisições: espera e tenta de novo
      await new Promise(r => setTimeout(r, 30000));
      return apiFetch(url, opts);
    }
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
    const url = `${API}/files?q=${q}&fields=files(id,name,mimeType),nextPageToken&pageSize=200${pageToken ? `&pageToken=${pageToken}` : ""}`;
    const data = await (await apiFetch(url)).json();
    (data.files || []).forEach(f => items.push(f));
    pageToken = data.nextPageToken;
  } while (pageToken);
  return items;
}

// Encontra todas as pastas chamadas "galeria" em qualquer nível da árvore
async function findGaleriaFolders(folderId, folderPath, out) {
  for (const e of await listChildren(folderId)) {
    if (e.mimeType !== FOLDER_MIME) continue;
    const p = `${folderPath}/${e.name}`;
    if (/^galeria$/i.test(e.name)) out.push({ id: e.id, parentId: folderId, path: p });
    else await findGaleriaFolders(e.id, p, out);
  }
}

async function main() {
  let root = process.env.GOOGLE_DRIVE_FOLDER_ID;
  if (!root) fail("GOOGLE_DRIVE_FOLDER_ID ausente.");
  const m = /\/folders\/([A-Za-z0-9_-]{10,})/.exec(root);
  if (m) root = m[1];
  await getAccessToken();

  console.log("🔎 Procurando pastas \"galeria\"...");
  const galerias = [];
  await findGaleriaFolders(root, "", galerias);
  if (!galerias.length) { console.log("✅ Nenhuma pasta \"galeria\" encontrada — nada a fazer."); return; }

  console.log(`⬆ Movendo as fotos de ${galerias.length} pasta(s) \"galeria\" para as pastas dos modelos...\n`);
  let moved = 0, removed = 0, kept = 0, blocked = 0;
  for (const g of galerias) {
    const children = await listChildren(g.id);
    const images = children.filter(c => (c.mimeType || "").startsWith("image/"));
    const others = children.filter(c => !(c.mimeType || "").startsWith("image/"));
    const unmovable = [];
    for (const img of images) {
      try {
        await apiFetch(`${API}/files/${img.id}?addParents=${encodeURIComponent(g.parentId)}&removeParents=${encodeURIComponent(g.id)}`, { method: "PATCH" });
        moved++;
      } catch {
        blocked++;
        unmovable.push(img.name);
      }
    }
    if (!others.length && !unmovable.length) {
      try {
        await apiFetch(`${API}/files/${g.id}`, { method: "DELETE" });
        removed++;
      } catch {
        kept++;
        console.log(`  ⚠ ${g.path}: fotos movidas, mas a pasta não pôde ser excluída — exclua-a manualmente no Drive`);
      }
    } else {
      kept++;
      console.log(`  ⚠ ${g.path}: pasta mantida (${others.length} item(ns) não-imagem, ${unmovable.length} foto(s) sem permissão p/ mover)`);
      if (unmovable.length) console.log(`      sem permissão: ${unmovable.join(", ")}`);
    }
    console.log(`  ✔ ${g.path}: ${images.length - unmovable.length} de ${images.length} foto(s) movida(s)`);
  }
  console.log(`\n✅ Concluído: ${moved} foto(s) movida(s) para as pastas dos modelos, ${removed} pasta(s) "galeria" removida(s), ${blocked} bloqueada(s) por permissão.`);
  if (blocked) console.log("   As fotos bloqueadas precisam ser movidas manualmente no Drive (arraste para a pasta do modelo).");
  console.log("   A sincronização automática baixa as fotos no novo lugar no próximo ciclo (até 5 min).");
}

main().catch(e => fail(e.message));
