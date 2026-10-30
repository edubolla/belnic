# Publicar na HostGator (troca do WordPress pelo site novo)

O site novo é estático: só arquivos HTML, CSS, JS, imagens e PDFs. Não usa PHP nem banco de dados.
A Vercel (`belnic.vercel.app`) fica só como prévia, com `noindex` para não competir no Google.

## Gerar os pacotes

```bash
node build.mjs --zip
```

Gera, na pasta `entrega/` (fora do git):

| Arquivo | Quando usar |
|---|---|
| `belnic-hostgator-completo.zip` (~104 MB) | Primeira publicação: site + catálogos em PDF |
| `belnic-hostgator-sem-pdfs.zip` (~6 MB) | Atualizações do site, quando os catálogos não mudaram |

## Primeira publicação (troca do WordPress)

Não mexa no DNS nem nos e-mails: o domínio continua na mesma hospedagem, só trocam os arquivos.

1. **Backup do WordPress.** cPanel → Arquivos → **Backup** (ou Assistente de Backup) → baixe o backup do diretório inicial (arquivos) e o do banco de dados MySQL do WordPress. Se precisar voltar, é por eles.
2. **Limpar a `public_html`.** cPanel → Arquivos → **Gerenciador de Arquivos** → `public_html`. Em **Configurações** (canto superior direito), marque **"Mostrar arquivos ocultos (dotfiles)"**. Apague tudo do WordPress: `wp-admin/`, `wp-content/`, `wp-includes/`, todos os `wp-*.php`, `index.php`, `xmlrpc.php`, `license.txt`, `readme.html` e o `.htaccess` antigo. Não apague `.well-known/` nem `cgi-bin/` se existirem.
3. **Enviar.** No Gerenciador de Arquivos, dentro da `public_html`, clique em **Carregar** e envie o `belnic-hostgator-completo.zip`. Volte, selecione o `.zip` → **Extrair** → confirme o caminho `/public_html` (não uma subpasta) → depois apague o `.zip`.
4. **Conferir** que a `public_html` tem `index.html`, `.htaccess`, `assets/`, `catalogos/`, `greenweek/`, `links/` etc. direto na raiz.
5. **SSL:** cPanel → Segurança → **SSL/TLS Status** deve mostrar o certificado (AutoSSL) ativo para `belniccosmeticos.com` e `www.belniccosmeticos.com`. O `.htaccess` já força HTTPS e tira o `www`.
6. **Cache:** se aparecer a página antiga, limpe o cache do navegador (ou teste numa aba anônima). Se o domínio usar Cloudflare, limpe o cache lá também.

**Se o upload de 104 MB travar** no Gerenciador de Arquivos, use FTP (FileZilla): dados em cPanel → Arquivos → **Contas de FTP** (servidor `ftp.belniccosmeticos.com`, porta 21). Envie **o conteúdo** da pasta `dist/` para `public_html/`, com "Servidor → Forçar exibição de arquivos ocultos" ligado para o `.htaccess` ir junto.

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
2. Envie o `belnic-hostgator-sem-pdfs.zip` para a `public_html` e extraia **substituindo** os arquivos.
   Para uma mudança pequena, dá para enviar só o arquivo alterado (ex.: `links/index.html`).
3. Commit e push continuam atualizando a prévia na Vercel.
