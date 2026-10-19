import { readFileSync } from 'node:fs';
import { site, nav, wa } from './site.mjs';

const svg = (f) => readFileSync(new URL(`./assets/img/${f}`, import.meta.url), 'utf8').trim();
export const simbolo = svg('simbolo.svg');
export const logoHorizontal = svg('logo-horizontal.svg');

// Modo do build ('landing' ou 'completo'), definido pelo build.mjs.
export let modo = 'completo';
export const definirModo = (m) => { modo = m; };
const baseLP = () => (modo === 'landing' ? '/' : '/lp/');

export const esc = (s = '') =>
  String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

export const icon = {
  whatsapp: `<svg aria-hidden="true" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2Zm0 18.2a8.2 8.2 0 0 1-4.2-1.2l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1 1 12 20.2Zm4.5-6.1c-.2-.1-1.5-.7-1.7-.8-.2-.1-.4-.1-.6.1l-.8 1c-.1.2-.3.2-.5.1a6.7 6.7 0 0 1-3.3-2.9c-.2-.4.3-.4.8-1.3.1-.2 0-.3 0-.4l-.8-1.8c-.2-.5-.4-.4-.6-.4h-.5a1 1 0 0 0-.7.3 3 3 0 0 0-.9 2.2 5.2 5.2 0 0 0 1.1 2.7 11.8 11.8 0 0 0 4.5 4c1.7.7 2.3.8 3.2.6.5-.1 1.5-.6 1.7-1.2.2-.6.2-1.1.2-1.2l-.6-.3Z"/></svg>`,
  instagram: `<svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/></svg>`,
  menu: `<svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M4 7h16M4 12h16M4 17h16"/></svg>`,
  close: `<svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M6 6l12 12M18 6 6 18"/></svg>`,
  arrow: `<svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M5 12h14M13 6l6 6-6 6"/></svg>`,
  download: `<svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M12 4v11M7 10l5 5 5-5M5 20h14"/></svg>`,
  livro: `<svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"><path d="M12 6.5C10.3 5.2 7.8 4.5 4 4.5v13c3.8 0 6.3.7 8 2 1.7-1.3 4.2-2 8-2v-13c-3.8 0-6.3.7-8 2Z"/><path d="M12 6.5v13"/></svg>`,
  pin: `<svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M12 21s7-6.1 7-12a7 7 0 1 0-14 0c0 5.9 7 12 7 12Z"/><circle cx="12" cy="9" r="2.5"/></svg>`,
};

// Verificação de buscadores + Google Tag Manager (ou GA4 direto). Tudo desligado enquanto
// os códigos em site.mjs estiverem vazios. Os eventos do site vão para o dataLayer (main.js).
function medicaoHead() {
  const linhas = [];
  if (site.googleVerificacao) linhas.push(`<meta name="google-site-verification" content="${esc(site.googleVerificacao)}">`);
  if (site.bingVerificacao) linhas.push(`<meta name="msvalidate.01" content="${esc(site.bingVerificacao)}">`);
  if (site.gtm) {
    linhas.push(`<script>(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','${site.gtm}');</script>`);
  } else if (site.ga4) {
    linhas.push(`<script async src="https://www.googletagmanager.com/gtag/js?id=${site.ga4}"></script>`);
    linhas.push(`<script>window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments)}gtag('js',new Date());gtag('config','${site.ga4}');</script>`);
  }
  return linhas.join('\n');
}

export const jsonld = (obj) =>
  `<script type="application/ld+json">${JSON.stringify(obj).replace(/</g, '\\u003c')}</script>`;

export const organizacao = {
  // Organization (sem LocalBusiness: não há endereço público de loja)
  '@type': 'Organization',
  '@id': `${site.url}/#organizacao`,
  name: site.nome,
  alternateName: ['Belnic', 'Belnic Hub da Beleza', 'Belnic Oficial'],
  url: `${site.url}/`,
  logo: `${site.url}/assets/img/logo-belnic.png`,
  image: `${site.url}/assets/img/og-belnic.jpg`,
  description: site.descricao,
  slogan: 'Produtos, formação e suporte para salões crescerem.',
  telephone: `+${site.whatsapp}`,
  email: site.email,
  contactPoint: {
    '@type': 'ContactPoint', contactType: 'sales', telephone: `+${site.whatsapp}`, email: site.email,
    areaServed: 'BR-RS', availableLanguage: 'pt-BR',
  },
  areaServed: site.cidades.map((c) => ({ '@type': 'City', name: `${c}, ${site.uf}` })),
  sameAs: [site.instagram, site.facebook],
  knowsAbout: ['cosméticos profissionais para salão', 'tratamento capilar', 'terapia capilar', 'tricologia', 'coloração capilar', 'finalizadores capilares', 'cuidados para barbearia'],
  brand: [
    { '@type': 'Brand', name: 'Maison Visage', alternateName: 'Maison Visage Cosmetique', url: 'https://maisonvisage.com/' },
    { '@type': 'Brand', name: 'Mirra Professional', alternateName: ['Mirra Cosméticos', 'Mirra'], url: 'https://mirracosmeticos.com/' },
  ],
};

export const breadcrumb = (itens) => ({
  '@type': 'BreadcrumbList',
  itemListElement: itens.map(([nome, url], i) => ({
    '@type': 'ListItem', position: i + 1, name: nome, item: `${site.url}${url}`,
  })),
});

export const migalhas = (itens) => `
<nav class="migalhas" aria-label="Você está em">
  <ol>${itens.map(([nome, url], i) => i === itens.length - 1
    ? `<li aria-current="page">${esc(nome)}</li>`
    : `<li><a href="${url}">${esc(nome)}</a></li>`).join('')}</ol>
</nav>`;

export const btnWhats = (texto, msg, cls = 'btn btn--primario') =>
  `<a class="${cls}" href="${wa(msg)}" target="_blank" rel="noopener" data-evento="whatsapp">${icon.whatsapp}<span>${esc(texto)}</span></a>`;

function header(atual, lp) {
  if (lp) return headerLP();
  return `
<a class="pular" href="#conteudo">Pular para o conteúdo</a>
<header class="topo" data-topo>
  <div class="topo__barra container">
    <a class="topo__logo" href="/" aria-label="Belnic Cosméticos — página inicial">${logoHorizontal}</a>
    <nav class="topo__nav" id="menu" aria-label="Principal">
      <ul>${nav.map((n) => `<li><a href="${n.href}"${atual?.startsWith(n.href) ? ' aria-current="page"' : ''}>${n.label}</a></li>`).join('')}</ul>
      <a class="btn btn--primario topo__cta" href="/seja-parceiro/">Seja parceiro</a>
    </nav>
    <button class="topo__menu" type="button" aria-controls="menu" aria-expanded="false" data-menu>
      <span class="abre">${icon.menu}</span><span class="fecha">${icon.close}</span><span class="sr">Menu</span>
    </button>
  </div>
</header>`;
}

function footer(lp) {
  if (lp) return footerLP();
  return `
<footer class="rodape">
  <div class="container rodape__grade">
    <div class="rodape__marca">
      <span class="rodape__simbolo">${simbolo}</span>
      <p>Distribuidora oficial <strong>Maison Visage</strong> e <strong>Mirra Professional</strong>. Produtos, formação e suporte para salões, clínicas e profissionais da beleza crescerem.</p>
      <p class="rodape__social">
        <a href="${site.instagram}" target="_blank" rel="noopener">${icon.instagram}<span>${site.instagramUser}</span></a>
        <a href="${wa()}" target="_blank" rel="noopener" data-evento="whatsapp">${icon.whatsapp}<span>${site.whatsappExibicao}</span></a>
      </p>
    </div>
    <div>
      <p class="rodape__titulo">Marcas</p>
      <ul>
        <li><a href="/marcas/maison-visage/">Maison Visage</a></li>
        <li><a href="/marcas/mirra-professional/">Mirra Professional</a></li>
        <li><a href="/produtos/">Todos os produtos</a></li>
        <li><a href="/terapia-capilar/">Terapia Capilar</a></li>
        <li><a href="/catalogos/">Catálogos em PDF</a></li>
      </ul>
    </div>
    <div>
      <p class="rodape__titulo">Belnic</p>
      <ul>
        <li><a href="/sobre/">Sobre a Belnic</a></li>
        <li><a href="/formacao/">Formação e cursos</a></li>
        <li><a href="/seja-parceiro/">Seja parceiro</a></li>
        <li><a href="/onde-atendemos/">Onde atendemos</a></li>
        <li><a href="/contato/">Contato</a></li>
      </ul>
    </div>
  </div>
  <div class="container rodape__base">
    <p>© ${new Date().getFullYear()} ${site.nome}. Venda exclusiva para profissionais da beleza.</p>
    <p><a href="/politicas-de-privacidade/">Privacidade</a> · <a href="/termos-de-uso/">Termos de uso</a></p>
  </div>
</footer>
<div class="barra-movel" aria-label="Atalhos">
  <a href="/catalogos/">${icon.download}<span>Catálogos</span></a>
  <a class="barra-movel__whats" href="${wa()}" target="_blank" rel="noopener" data-evento="whatsapp">${icon.whatsapp}<span>Falar no WhatsApp</span></a>
</div>`;
}

const navLP = [
  ['para-quem', 'Para quem'], ['marcas', 'Marcas'], ['terapia-capilar', 'Terapia capilar'],
  ['formacao', 'Formação'], ['onde-atendemos', 'Onde atendemos'],
];

function headerLP() {
  return `
<a class="pular" href="#conteudo">Pular para o conteúdo</a>
<header class="topo" data-topo>
  <div class="topo__barra container">
    <a class="topo__logo" href="${baseLP()}" aria-label="Belnic Cosméticos — início">${logoHorizontal}</a>
    <nav class="topo__nav" id="menu" aria-label="Principal">
      <ul>${navLP.map(([id, label]) => `<li><a href="${baseLP()}#${id}">${label}</a></li>`).join('')}</ul>
      <a class="btn btn--primario topo__cta" href="${baseLP()}#parceiro">Seja parceiro</a>
    </nav>
    <button class="topo__menu" type="button" aria-controls="menu" aria-expanded="false" data-menu>
      <span class="abre">${icon.menu}</span><span class="fecha">${icon.close}</span><span class="sr">Menu</span>
    </button>
  </div>
</header>`;
}

function footerLP() {
  return `
<footer class="rodape">
  <div class="container rodape__grade">
    <div class="rodape__marca">
      <span class="rodape__simbolo">${simbolo}</span>
      <p>Distribuidora oficial <strong>Maison Visage</strong> e <strong>Mirra Professional</strong>. Produtos, formação e suporte para salões, clínicas e profissionais da beleza crescerem.</p>
    </div>
    <div>
      <p class="rodape__titulo">Fale com a Belnic</p>
      <ul class="rodape__social">
        <li><a href="${wa()}" target="_blank" rel="noopener" data-evento="whatsapp">${icon.whatsapp}<span>${site.whatsappExibicao}</span></a></li>
        <li><a href="${site.instagram}" target="_blank" rel="noopener">${icon.instagram}<span>${site.instagramUser}</span></a></li>
        <li><a href="mailto:${site.email}">${site.email}</a></li>
      </ul>
    </div>
    <div>
      <p class="rodape__titulo">Catálogos</p>
      <ul>
        <li><a href="/catalogos/catalogo-maison-visage.pdf" download>Maison Visage (PDF)</a></li>
        <li><a href="/catalogos/catalogo-mirra-professional.pdf" download>Mirra Professional (PDF)</a></li>
        <li><a href="/catalogos/catalogo-terapia-capilar-spa-therapy.pdf" download>Terapia Capilar (PDF)</a></li>
      </ul>
    </div>
  </div>
  <div class="container rodape__base">
    <p>© ${new Date().getFullYear()} ${site.nome}. Venda exclusiva para profissionais da beleza.</p>
    <p><a href="/politicas-de-privacidade/">Política de privacidade</a> · <a href="/termos-de-uso/">Termos de uso</a></p>
  </div>
</footer>
<div class="barra-movel" aria-label="Atalhos">
  <a href="${baseLP()}#catalogos">${icon.download}<span>Catálogos</span></a>
  <a class="barra-movel__whats" href="${wa()}" target="_blank" rel="noopener" data-evento="whatsapp">${icon.whatsapp}<span>Falar no WhatsApp</span></a>
</div>`;
}

/**
 * Página completa.
 * @param {{titulo:string, descricao:string, caminho:string, corpo:string, schema?:object[], imagem?:string, tipo?:string, noindex?:boolean}} p
 */
// Páginas de campanha (ex.: /greenweek/): topo e rodapé enxutos, sem menu, com um único chamado.
// c = { cta: 'texto do botão', alvo: '#cadastro' }
function headerCampanha(c) {
  // Sem barra no topo: o logo fica dentro do hero da campanha.
  if (c.semTopo) return '<a class="pular" href="#conteudo">Pular para o conteúdo</a>';
  return `
<a class="pular" href="#conteudo">Pular para o conteúdo</a>
<header class="topo topo--campanha" data-topo>
  <div class="topo__barra container">
    <a class="topo__logo" href="/" aria-label="Belnic Cosméticos — início">${logoHorizontal}</a>
    <a class="btn btn--primario topo__cta-campanha" href="${c.alvo}">${esc(c.ctaCurto || c.cta)}</a>
  </div>
</header>`;
}

function footerCampanha(c) {
  return `
<footer class="rodape rodape--campanha">
  <div class="container rodape__base">
    <p>© ${new Date().getFullYear()} ${site.nome}. Distribuidora oficial Maison Visage e Mirra Professional no RS.</p>
    <p><a href="/">Conheça a Belnic</a> · <a href="/politicas-de-privacidade/">Política de privacidade</a></p>
  </div>
</footer>
<div class="barra-movel barra-movel--campanha" aria-label="Atalho">
  <a class="barra-movel__whats" href="${c.alvo}">${esc(c.cta)}</a>
</div>`;
}

export function pagina(p) {
  const canonical = `${site.url}${p.caminho}`;
  const titulo = p.titulo.includes('Belnic') ? p.titulo : `${p.titulo} | Belnic Cosméticos`;
  const imagem = p.imagem ? `${site.url}${p.imagem}` : `${site.url}/assets/img/og-belnic.jpg`;
  const grafo = { '@context': 'https://schema.org', '@graph': [organizacao, ...(p.schema || [])] };
  return `<!doctype html>
<html lang="pt-BR">
<head>
<meta charset="utf-8">
<script>document.documentElement.classList.add('js')</script>
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<title>${esc(titulo)}</title>
<meta name="description" content="${esc(p.descricao)}">
<link rel="canonical" href="${canonical}">
${p.noindex ? '<meta name="robots" content="noindex, follow">' : '<meta name="robots" content="index, follow, max-image-preview:large">'}
<meta name="theme-color" content="#667B68">
${medicaoHead()}
<meta property="og:type" content="${p.tipo || 'website'}">
<meta property="og:locale" content="pt_BR">
<meta property="og:site_name" content="${site.nome}">
<meta property="og:title" content="${esc(titulo)}">
<meta property="og:description" content="${esc(p.descricao)}">
<meta property="og:url" content="${canonical}">
<meta property="og:image" content="${imagem}">
<meta name="twitter:card" content="summary_large_image">
<link rel="icon" href="/favicon.svg" type="image/svg+xml">
<link rel="icon" href="/favicon-32.png" sizes="32x32" type="image/png">
<link rel="apple-touch-icon" href="/apple-touch-icon.png">
<link rel="preload" href="/assets/fonts/jost.woff2" as="font" type="font/woff2" crossorigin>
<link rel="preload" href="/assets/fonts/playfair.woff2" as="font" type="font/woff2" crossorigin>
<link rel="stylesheet" href="/assets/css/style.css?v=${p.versao}">
${jsonld(grafo)}
</head>
<body${p.classeBody ? ` class="${p.classeBody}"` : ''}>
${site.gtm ? `<noscript><iframe src="https://www.googletagmanager.com/ns.html?id=${site.gtm}" height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript>\n` : ''}${p.campanha ? headerCampanha(p.campanha) : header(p.caminho, p.lp || modo === 'landing')}
<main id="conteudo">
${p.corpo}
</main>
${p.campanha ? footerCampanha(p.campanha) : footer(p.lp || modo === 'landing')}
<script src="/assets/js/main.js?v=${p.versao}" defer></script>
</body>
</html>`;
}
