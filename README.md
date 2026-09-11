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

## Atualizando dados (veículos e links)

Os dados do catálogo estão em `static-site/data.js`. Para atualizar modelos, preços, imagens ou links, edite esse arquivo seguindo o formato já presente.

## Contribuições

Pull requests são bem-vindos. Para pequenas edições (texto, dados), você pode abrir um PR diretamente com a alteração no `data.js` ou no `README.md`.

Sugestões de fluxo:
1. Crie uma branch a partir da `main` com um nome descritivo.
2. Faça suas alterações e rode o servidor local para ver o resultado.
3. Abra um pull request descrevendo as mudanças.

## Agradecimentos

Protótipo inspirado no design system do app principal; usado para demonstração e vendas.
