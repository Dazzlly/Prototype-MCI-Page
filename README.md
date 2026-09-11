# Prototype-MCI-Page

Site estático da Motochefe Itaim, construído com HTML, CSS e JavaScript puro para GitHub
Pages. Não há backend, processo de build ou dependências de runtime.

## Páginas principais

- `index.html` — página inicial, categorias, destaques e contato.
- `modelos.html` — catálogo com busca e filtros.
- `modelo.html` — detalhes de um modelo, acessados por `?m=slug`.
- `oficina.html` — página da oficina.
- `contato.html` — formulário que monta uma mensagem para o WhatsApp.

## Arquivos de dados e configuração

- `data.js` — veículos, preços, imagens e dados compartilhados.
- `model-data-extra.js` — informações complementares das páginas de modelo.
- `social-links.js` — única fonte para Instagram, Facebook e WhatsApp.
- `modelos/manifest.json` — manifesto local de imagens usado pela galeria.

Para alterar links sociais, edite somente `social-links.js`. Para alterar veículos, preços ou
imagens padrão, edite `data.js`.

## Publicação

O conteúdo público é composto pelos arquivos HTML, CSS, JavaScript, imagens e JSON deste
repositório. O GitHub Pages publica diretamente esses arquivos. Scripts de sincronização,
Docker, credenciais e ferramentas de geração não fazem parte do site.

Para testar localmente, abra `index.html` no navegador ou use qualquer servidor HTTP estático.
Não é necessário instalar Node.js, Python, Docker ou outra ferramenta de desenvolvimento.

## Segurança

Não coloque tokens, chaves privadas, arquivos `.env`, credenciais ou dados pessoais neste
repositório. Consulte [SECURITY.md](./SECURITY.md) para o procedimento de comunicação.
