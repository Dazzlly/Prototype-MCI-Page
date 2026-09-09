#!/usr/bin/env node
/*
 * drive-auth.js — Autenticação OAuth 2.0 compartilhada pelos scripts drive-push*.js.
 *
 * Requer AUTORIZAÇÃO OAuth da sua conta Google (contas de serviço não podem
 * mais gravar em pastas comuns — política do Google desde 2025):
 *   1. Google Cloud Console → APIs e Serviços → Tela de permissão OAuth:
 *      tipo Externo → preencher → PUBLICAR APLICATIVO (senão o token expira em 7 dias)
 *   2. Credenciais → Criar credenciais → ID do cliente OAuth → Aplicativo para
 *      computador → segredos GOOGLE_OAUTH_CLIENT_ID / GOOGLE_OAUTH_CLIENT_SECRET
 *   3. Primeira execução do script imprime o link de autorização → autorize com
 *      a conta dona da pasta → copie "code=..." da barra de endereço → segredo
 *      GOOGLE_OAUTH_CODE → rode de novo → imprime o refresh token → segredo
 *      GOOGLE_OAUTH_REFRESH_TOKEN (a partir daí só roda e envia)
 */

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

module.exports = { fail, getAccessToken, apiFetch };
