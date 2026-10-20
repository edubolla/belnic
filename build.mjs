// Gerador estático da Belnic. Sem dependências: `node build.mjs` gera /dist
// pronto para subir na public_html da Hostinger. `node build.mjs --serve` sobe um servidor local.
import { readdirSync, readFileSync, writeFileSync, mkdirSync, rmSync, cpSync, existsSync, statSync } from 'node:fs';
import { join, dirname, extname } from 'node:path';
import { createServer } from 'node:http';
import { fileURLToPath } from 'node:url';
import { site } from './src/site.mjs';
import { carregarDados } from './src/dados.mjs';
import { definirModo } from './src/layout.mjs';

const raiz = dirname(fileURLToPath(import.meta.url));
const dist = join(raiz, 'dist');
const versao = Date.now().toString(36);
const modo = process.argv.includes('--completo') ? 'completo' : process.argv.includes('--landing') ? 'landing' : site.modo;
definirModo(modo);
// No modo landing só vão para o ar a página única, as páginas legais, o 404 e o llms.txt.
const PAGINAS_LANDING = ['lp.mjs', 'greenweek.mjs', 'links.mjs', 'privacidade.mjs', 'termos.mjs', '404.mjs', 'llms.mjs'];

rmSync(dist, { recursive: true, force: true });
mkdirSync(dist, { recursive: true });
cpSync(join(raiz, 'src/assets'), join(dist, 'assets'), { recursive: true });
cpSync(join(raiz, 'src/public'), dist, { recursive: true });

const dados = carregarDados(raiz);
const ctx = { dados, versao, modo };

const paginas = [];
const arquivos = readdirSync(join(raiz, 'src/pages')).filter((f) => f.endsWith('.mjs') && (modo === 'completo' || PAGINAS_LANDING.includes(f))).sort();
for (const arq of arquivos) {
  const mod = await import(join(raiz, 'src/pages', arq));
  const saida = await mod.default(ctx);
  paginas.push(...(Array.isArray(saida) ? saida : [saida]));
}

for (const p of paginas) {
  const destino = p.arquivo ? join(dist, p.arquivo) : join(dist, p.caminho, 'index.html');
  mkdirSync(dirname(destino), { recursive: true });
  // Links para páginas que só existem no site completo apontam para a seção da landing.
  writeFileSync(destino, modo === 'landing' ? p.html.replaceAll('href="/seja-parceiro/"', 'href="/#parceiro"') : p.html);
}

// sitemap.xml
const hoje = new Date().toISOString().slice(0, 10);
const urls = paginas.filter((p) => !p.noindex && !p.arquivo);
writeFileSync(join(dist, 'sitemap.xml'), `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map((p) => `  <url><loc>${site.url}${p.caminho}</loc><lastmod>${hoje}</lastmod></url>`).join('\n')}
</urlset>
`);

// .htaccess: no modo landing, URLs antigas e as do site completo voltam para a página única.
const ht = join(dist, '.htaccess');
let regras = readFileSync(ht, 'utf8');
if (modo === 'landing') {
  regras = regras
    .replace(/ \/(marcas|terapia-capilar|formacao)\/[^ ]* \[R=301,L\]/g, ' / [R=301,L]')
    .replace('# [landing]', 'RewriteRule ^(contato|sou-consumidor-final|terapia-capilar|sobre|formacao|seja-parceiro|onde-atendemos|lp|marcas(/.*)?|produtos(/.*)?)/?$ / [R=301,L]');
}
writeFileSync(ht, regras);

console.log(modo === 'landing'
  ? `✓ Modo landing: ${paginas.length} páginas em dist/ (página única na raiz)`
  : `✓ Modo completo: ${paginas.length} páginas em dist/ (${dados.produtos.length} produtos; landing em /lp/)`);

if (process.argv.includes('--serve')) {
  const tipos = { '.html': 'text/html; charset=utf-8', '.css': 'text/css', '.js': 'text/javascript', '.svg': 'image/svg+xml', '.webp': 'image/webp', '.png': 'image/png', '.jpg': 'image/jpeg', '.woff2': 'font/woff2', '.xml': 'application/xml', '.txt': 'text/plain; charset=utf-8', '.pdf': 'application/pdf', '.json': 'application/json' };
  const porta = Number(process.env.PORT || 4321);
  createServer((req, res) => {
    let caminho = decodeURIComponent(new URL(req.url, 'http://x').pathname);
    let arq = join(dist, caminho);
    if (existsSync(arq) && statSync(arq).isDirectory()) arq = join(arq, 'index.html');
    if (!existsSync(arq)) { res.writeHead(404, { 'content-type': tipos['.html'] }); const nf = join(dist, '404.html'); return res.end(existsSync(nf) ? readFileSync(nf) : 'Não encontrado'); }
    res.writeHead(200, { 'content-type': tipos[extname(arq)] || 'application/octet-stream' });
    res.end(readFileSync(arq));
  }).listen(porta, () => console.log(`→ http://localhost:${porta}`));
}
