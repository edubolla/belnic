# Site Belnic Cosméticos

Site estático, mobile first, para a Belnic (distribuidora Maison Visage e Mirra Professional no RS).
Gerado por um script Node sem dependências: o resultado é HTML, CSS e JS puros, compatíveis com a hospedagem compartilhada da Hostinger.

## Comandos

```bash
node build.mjs            # gera a pasta dist/
node build.mjs --serve    # gera e abre em http://localhost:4321
```

Precisa só do Node 18+. Não há `npm install`.

## Publicar na Hostinger

1. Rode `node build.mjs`.
2. No hPanel → Gerenciador de Arquivos (ou FTP), envie **o conteúdo** de `dist/` para `public_html/`, incluindo o arquivo oculto `.htaccess`.
3. Os catálogos em PDF (`dist/catalogos/*.pdf`, cerca de 35 MB cada) só precisam ser reenviados quando mudarem.
4. Depois de publicar: envie `https://belniccosmeticos.com/sitemap.xml` no Google Search Console e no Bing Webmaster Tools.

## Onde editar

| O quê | Arquivo |
|---|---|
| WhatsApp, e-mail, Instagram, cidades atendidas | `src/site.mjs` |
| Produtos, linhas e protocolos | `src/data/*.json` (extraídos dos catálogos em PDF) |
| Textos de cada página | `src/pages/*.mjs` |
| Cabeçalho, rodapé, SEO e schema globais | `src/layout.mjs` |
| Cores, fontes e componentes visuais | `src/assets/css/style.css` |
| Fotos de produtos | `src/assets/img/produtos/<catálogo>/<slug>.webp` |
| Redirecionamentos das URLs antigas do WordPress | `src/public/.htaccess` |

`_fonte/` guarda o material de origem (logos, catálogos, textos do site antigo) e não vai para o ar.
