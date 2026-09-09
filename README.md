# Prototype-MCI-Page

Protótipo de apresentação de página com foco em informação, vendas e contato.

Uma versão estática em HTML/CSS/JS puro pensada para demonstrar layouts, catálogo de modelos e fluxo de contato via WhatsApp.

---

## Resumo (English)

Static prototype for a product/showcase page focused on information, sales and contact. Built with plain HTML, CSS and JavaScript (no backend). Data for the vehicle listings is embedded in `data.js`.

---

## Estrutura do projeto

Estrutura principal dentro da pasta `static-site/`:

- `index.html`      — Home (hero, categorias, destaques, localização, CTA)
- `modelos.html`    — Catálogo completo com busca e filtros
- `contato.html`    — Formulário (envia para WhatsApp) + mapa e contatos
- `styles.css`      — Estilos (replica o design system do app)
- `data.js`         — Dados dos veículos e links (EDITE AQUI para atualizar)
- `app.js`          — Header, menu mobile, animações gerais
- `modelos.js`      — Renderização e filtros do catálogo
- `contato.js`      — Lógica do formulário -> WhatsApp
- `README.md`       — Este arquivo

> Observação: o protótipo é um site estático; todo o conteúdo está embarcado em `data.js`.

## Como usar / Pré-visualizar localmente

Como é um site estático, basta abrir `index.html` no navegador ou executar um servidor HTTP simples para evitar problemas com caminhos e CORS.

Exemplo rápido (Python 3):

1. Navegue até a pasta `static-site/`:

   cd static-site/

2. Rode um servidor local:

   python -m http.server 8000

3. Abra http://localhost:8000 no navegador

(Alternativas: usar extensões de Live Server no VS Code ou servidores estáticos como `http-server` via npm.)

## Atualizando dados (veículos e links)

Os dados do catálogo estão em `static-site/data.js`. Para atualizar modelos, preços, imagens ou links, edite esse arquivo seguindo o formato já presente.

Dicas:
- Substitua URLs de imagens por links públicos (ex.: Google Drive com compartilhamento público ou um CDN).
- Mantenha a estrutura de objetos/arrays para que `modelos.js` consiga renderizar corretamente.

## Contato / Formulário

O formulário em `contato.html` constrói uma mensagem e redireciona para o WhatsApp com os dados preenchidos. Verifique `contato.js` para ajustar o número de telefone destino ou o formato da mensagem.

## Deploy (opcional)

Sugestão rápida para publicar via GitHub Pages:
1. Vá em Settings > Pages e selecione a branch `main` e a pasta `/static-site` (ou root, se preferir).
2. Aguarde o deploy automático e abra a URL fornecida pelo GitHub Pages.

## Contribuições

Pull requests são bem-vindos. Para pequenas edições (texto, dados), você pode abrir um PR diretamente com a alteração no `data.js` ou no `README.md`.

Sugestões de fluxo:
1. Crie uma branch a partir da `main` com um nome descritivo.
2. Faça suas alterações e rode o servidor local para ver o resultado.
3. Abra um pull request descrevendo as mudanças.

## Licença

Coloque aqui a licença do projeto, se houver (ex.: MIT). Se preferir, posso adicionar um arquivo `LICENSE` com MIT como padrão.

## Agradecimentos

Protótipo inspirado no design system do app principal; usado para demonstração e vendas.

---

Se quiser, eu posso:
- adicionar instruções para deployment em GitHub Pages;
- criar um arquivo LICENSE (MIT) e commitar junto;
- ou criar uma branch alternativa em vez de commitar direto na `main`.

Diga qual dessas opções prefere.