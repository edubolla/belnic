// Gerador estático da Belnic. Sem dependências: `node build.mjs` gera /dist
// pronto para subir na public_html da Hostinger. `node build.mjs --serve` sobe um servidor local.
import { readdirSync, readFileSync, writeFileSync, mkdirSync, rmSync, cpSync, existsSync, statSync } from 'node:fs';
import { join, dirname, extname } from 'node:path';
import { createServer } from 'node:http';
import { fileURLToPath } from 'node:url';
import { site } from './src/site.mjs';
import { carregarDados } from './src/dados.mjs';

const raiz = dirname(fileURLToPath(import.meta.url));
const dist = join(raiz, 'dist');
const versao = Date.now().toString(36);

rmSync(dist, { recursive: true, force: true });
mkdirSync(dist, { recursive: true });
cpSync(join(raiz, 'src/assets'), join(dist, 'assets'), { recursive: true });
cpSync(join(raiz, 'src/public'), dist, { recursive: true });

const dados = carregarDados(raiz);
const ctx = { dados, versao };

const paginas = [];
for (const arq of readdirSync(join(raiz, 'src/pages')).filter((f) => f.endsWith('.mjs')).sort()) {
  const mod = await import(join(raiz, 'src/pages', arq));
  const saida = await mod.default(ctx);
  paginas.push(...(Array.isArray(saida) ? saida : [saida]));
}

for (const p of paginas) {
  const destino = p.arquivo ? join(dist, p.arquivo) : join(dist, p.caminho, 'index.html');
  mkdirSync(dirname(destino), { recursive: true });
  writeFileSync(destino, p.html);
}

// sitemap.xml
const hoje = new Date().toISOString().slice(0, 10);
const urls = paginas.filter((p) => !p.noindex && !p.arquivo);
writeFileSync(join(dist, 'sitemap.xml'), `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map((p) => `  <url><loc>${site.url}${p.caminho}</loc><lastmod>${hoje}</lastmod></url>`).join('\n')}
</urlset>
`);

console.log(`✓ ${paginas.length} páginas geradas em dist/ (${dados.produtos.length} produtos; landing page em /lp/)`);

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
