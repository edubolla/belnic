# Publicar na Hostinger (troca do WordPress pelo site novo)

O site novo é estático: só arquivos HTML, CSS, JS, imagens e PDFs. Não usa PHP nem banco de dados.
A Vercel (`belnic.vercel.app`) fica só como prévia, com `noindex` para não competir no Google.

## Gerar os pacotes

```bash
node build.mjs --zip
```

Gera, na pasta `entrega/` (fora do git):

| Arquivo | Quando usar |
|---|---|
| `belnic-hostinger-completo.zip` (~104 MB) | Primeira publicação: site + catálogos em PDF |
| `belnic-hostinger-sem-pdfs.zip` (~6 MB) | Atualizações do site, quando os catálogos não mudaram |

## Primeira publicação (troca do WordPress)

Não mexa no DNS nem nos e-mails: o domínio continua na mesma hospedagem, só trocam os arquivos.

1. **Backup do WordPress.** hPanel → Arquivos → Backups → gere um backup de arquivos e um do banco de dados e baixe os dois. Se precisar voltar, é por eles.
2. **Limpar a `public_html`.** hPanel → Gerenciador de Arquivos → `public_html`. Ative "mostrar arquivos ocultos" e apague tudo do WordPress: `wp-admin/`, `wp-content/`, `wp-includes/`, todos os `wp-*.php`, `index.php`, `xmlrpc.php`, `license.txt`, `readme.html` e o `.htaccess` antigo. Não apague `.well-known/` se existir (validação do SSL).
3. **Enviar.** Faça upload do `belnic-hostinger-completo.zip` dentro da `public_html`, clique com o botão direito → **Extrair** (na própria `public_html`, não numa subpasta) e depois apague o `.zip`.
4. **Conferir** que a `public_html` tem `index.html`, `.htaccess`, `assets/`, `catalogos/`, `greenweek/`, `links/` etc. direto na raiz.
5. **SSL:** hPanel → Segurança → SSL deve estar ativo para `belniccosmeticos.com`. O `.htaccess` já força HTTPS e tira o `www`.
6. **Cache:** se a Hostinger mostrar a página antiga, limpe o cache em hPanel → Desempenho (LiteSpeed/CDN) e no navegador.

Por FTP (FileZilla) funciona igual: dados em hPanel → Arquivos → Contas FTP; envie **o conteúdo** da pasta `dist/` para `public_html/` (ative "mostrar arquivos ocultos" para o `.htaccess` ir junto).

## Checklist depois de publicar

- [ ] `https://belniccosmeticos.com` abre a página nova; `http://` e `www.` redirecionam para ela.
- [ ] `/greenweek/`: formulário envia e mostra a confirmação (o webhook já aceita o domínio).
- [ ] `/links/` abre; `/bio` redireciona para `/links/`.
- [ ] Botões de catálogo baixam os PDFs.
- [ ] Uma URL inexistente mostra a página 404 da Belnic.
- [ ] GA4 → Relatórios → Tempo real mostra a sua visita.
- [ ] Search Console: adicionar a propriedade `belniccosmeticos.com` e enviar `https://belniccosmeticos.com/sitemap.xml` (o mesmo no Bing Webmaster Tools). Veja [MEDICAO.md](MEDICAO.md).
- [ ] Bio do Instagram: `https://belniccosmeticos.com/links/?utm_source=instagram&utm_medium=bio`.

## Atualizações depois

1. Edite, rode `node build.mjs --zip`.
2. Envie o `belnic-hostinger-sem-pdfs.zip` para a `public_html` e extraia **substituindo** os arquivos.
   Para uma mudança pequena, dá para enviar só o arquivo alterado (ex.: `links/index.html`).
3. Commit e push continuam atualizando a prévia na Vercel.
