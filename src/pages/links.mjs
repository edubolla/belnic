// /links/ — página de links para a bio do Instagram (no lugar do antigo "linktree").
// Mesmo padrão da página de links do Leo Bikes: cards com foto, ícone, título e seta.
// Página própria (sem topo/rodapé do site), com noindex. Os cliques entram no dataLayer
// pelo main.js (WhatsApp, download de catálogo, Instagram e e-mail) e pelo data-link abaixo.
import { esc, simbolo, logoHorizontal, icon, medicaoHead, jsonld } from '../layout.mjs';
import { site, wa } from '../site.mjs';

const ic = {
  ...icon,
  estrela: '<svg aria-hidden="true" viewBox="0 0 24 24" fill="currentColor"><path d="m12 3 2.7 5.6 6.1.9-4.4 4.3 1 6.1L12 17l-5.4 2.9 1-6.1-4.4-4.3 6.1-.9L12 3Z"/></svg>',
  pdf: '<svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"><path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8l-5-5Z"/><path d="M14 3v5h5M9 13h6M9 17h6"/></svg>',
  pessoas: '<svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><circle cx="9" cy="8" r="3.2"/><path d="M3 20c.6-3.3 3-5 6-5s5.4 1.7 6 5"/><circle cx="17" cy="9" r="2.5"/><path d="M16.5 14.2c2.4.2 4 1.7 4.5 4.3"/></svg>',
  globo: '<svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c2.5 2.6 3.7 5.6 3.7 9s-1.2 6.4-3.7 9c-2.5-2.6-3.7-5.6-3.7-9S9.5 5.6 12 3Z"/></svg>',
  email: '<svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="m4 7 8 6 8-6"/></svg>',
};

const img = (p) => `/assets/img/${p}`;

// Ordem = ordem na página. `destaque` deixa o card maior e com selo.
const links = [
  {
    id: 'greenweek', destaque: 'De 5 a 9 de novembro', titulo: 'Green Week Belnic', sub: 'Cadastre-se no Grupo VIP e receba as ofertas primeiro',
    href: '/greenweek/?utm_source=instagram&utm_medium=bio&utm_campaign=greenweek', foto: img('produtos/mirra/ambiente-3.webp'), icone: ic.estrela, cor: 'areia',
  },
  {
    id: 'whatsapp', titulo: 'Se interessou? Chame aqui!', sub: 'Produtos exclusivos para o seu salão',
    href: wa('Oi, gostaria de mais informações sobre os Produtos Exclusivos.'), foto: img('produtos/mirra/ambiente-2.webp'), icone: ic.whatsapp, cor: 'whats', externo: true,
  },
  {
    id: 'cursos', titulo: 'Nossos cursos', sub: 'Imersão em Terapia Capilar e treinamentos',
    href: wa('Oi, gostaria de mais informações sobre os Cursos.'), foto: img('produtos/maison-visage/ambiente-1.webp'), icone: ic.livro, cor: 'verde', externo: true,
  },
  {
    id: 'catalogo-maison-visage', titulo: 'Catálogo Maison Visage', sub: 'Finalizadores, tratamento e Spa Therapy',
    href: '/catalogos/catalogo-maison-visage.pdf', foto: img('produtos/maison-visage/ambiente-2.webp'), icone: ic.pdf, cor: 'verde', download: true,
  },
  {
    id: 'catalogo-mirra', titulo: 'Catálogo Mirra', sub: 'Tratamento, coloração e finalização',
    href: '/catalogos/catalogo-mirra-professional.pdf', foto: img('produtos/mirra/ambiente-1.webp'), icone: ic.pdf, cor: 'verde', download: true,
  },
  {
    id: 'catalogo-terapia-capilar', titulo: 'Catálogo Terapia Capilar', sub: 'Linha Spa Therapy e protocolos',
    href: '/catalogos/catalogo-terapia-capilar-spa-therapy.pdf', foto: img('produtos/terapia-capilar/tonico-growth-factor.webp'), icone: ic.pdf, cor: 'verde', download: true,
  },
  {
    id: 'comunidade', titulo: 'Quero fazer parte da Comunidade Belnic', sub: 'Novidades, conteúdos e condições especiais',
    href: wa('Oii, quero fazer parte da Comunidade Belnic.'), foto: img('produtos/maison-visage/ambiente-3.webp'), icone: ic.pessoas, cor: 'verde', externo: true,
  },
  {
    id: 'site', titulo: 'Acesse nosso site', sub: 'Conheça a Belnic, as marcas e onde atendemos',
    href: '/?utm_source=instagram&utm_medium=bio&utm_campaign=links', foto: img('produtos/maison-visage/ambiente-4.webp'), icone: ic.globo, cor: 'claro',
  },
];

const card = (l, i) => `
    <a class="card${l.destaque ? ' card--destaque' : ''}" href="${esc(l.href)}" data-link="${l.id}"${l.externo ? ' target="_blank" rel="noopener"' : ''}${l.download ? ' download' : ''}${l.externo ? ' data-evento="whatsapp"' : ''} style="--i:${i}">
      <img class="card__foto" src="${l.foto}" alt="" width="800" height="600" ${i < 3 ? 'loading="eager"' : 'loading="lazy"'} decoding="async">
      <span class="card__veu"></span>
      <span class="card__conteudo">
        <span class="card__icone card__icone--${l.cor}">${l.icone}</span>
        <span class="card__texto">
          ${l.destaque ? `<span class="card__selo">${esc(l.destaque)}</span>` : ''}
          <span class="card__titulo">${esc(l.titulo)}</span>
          <span class="card__sub">${esc(l.sub)}</span>
        </span>
        <span class="card__seta">${l.download ? icon.download : icon.arrow}</span>
      </span>
    </a>`;

const css = `
*,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
@font-face{font-family:"Jost";src:url(/assets/fonts/jost.woff2) format("woff2");font-weight:300 700;font-display:swap}
:root{--verde:#667B68;--verde-escuro:#46574A;--profundo:#2F3B32;--areia:#D5CDBF;--creme:#F7F4EE}
html{-webkit-text-size-adjust:100%}
body{min-height:100svh;background:var(--profundo);color:#fff;font-family:"Jost",system-ui,sans-serif;display:flex;justify-content:center;padding:40px 18px 110px;position:relative;overflow-x:hidden}
body::before{content:"";position:fixed;inset:auto -30% -20% auto;width:520px;height:520px;border-radius:50%;background:radial-gradient(circle,rgb(102 123 104/.45),transparent 65%);pointer-events:none}
.folha{position:fixed;top:-40px;right:-70px;width:260px;color:var(--verde);opacity:.22;pointer-events:none}
.folha svg{width:100%;height:auto}
.pagina{position:relative;width:100%;max-width:520px;display:flex;flex-direction:column;align-items:center}
.logo{color:var(--areia);display:block;margin-bottom:14px}
.logo svg{width:190px;height:auto;display:block}
.tagline{font-size:12px;font-weight:500;letter-spacing:.14em;text-transform:uppercase;color:rgb(255 255 255/.55);text-align:center;line-height:1.6;margin-bottom:34px}
.links{width:100%;display:flex;flex-direction:column;gap:14px;margin-bottom:44px}
.card{position:relative;display:block;height:96px;border-radius:20px;overflow:hidden;text-decoration:none;color:#fff;box-shadow:0 6px 22px rgb(0 0 0/.35);-webkit-tap-highlight-color:transparent;transition:transform .2s ease,box-shadow .2s ease;isolation:isolate}
.card:hover{transform:translateY(-2px);box-shadow:0 10px 30px rgb(0 0 0/.45)}
.card:active{transform:scale(.98)}
.card:focus-visible{outline:2px solid var(--areia);outline-offset:3px}
.card__foto{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;object-position:center 30%;z-index:-2;transition:transform .5s ease}
.card:hover .card__foto{transform:scale(1.05)}
.card__veu{position:absolute;inset:0;z-index:-1;background:linear-gradient(90deg,rgb(30 38 32/.9) 0%,rgb(30 38 32/.68) 55%,rgb(30 38 32/.25) 100%)}
.card__conteudo{height:100%;display:flex;align-items:center;gap:16px;padding:0 18px}
.card__icone{width:50px;height:50px;border-radius:50%;flex:none;display:grid;place-items:center;box-shadow:0 2px 10px rgb(0 0 0/.35)}
.card__icone svg{width:23px;height:23px}
.card__icone--verde{background:var(--verde);color:#fff}
.card__icone--whats{background:#25D366;color:#fff}
.card__icone--areia{background:var(--areia);color:var(--profundo)}
.card__icone--claro{background:rgb(255 255 255/.12);color:#fff;border:1.5px solid rgb(255 255 255/.22)}
.card__texto{flex:1;min-width:0;display:flex;flex-direction:column;gap:3px}
.card__titulo{font-size:17px;font-weight:600;line-height:1.2}
.card__sub{font-size:13px;color:rgb(255 255 255/.72);line-height:1.35}
.card__seta{width:34px;height:34px;flex:none;border-radius:50%;display:grid;place-items:center;background:rgb(255 255 255/.1);border:1px solid rgb(255 255 255/.2)}
.card__seta svg{width:16px;height:16px}
.card--destaque{height:132px;border:1.5px solid var(--areia);box-shadow:0 10px 34px rgb(0 0 0/.45),0 0 0 4px rgb(213 205 191/.12)}
.card--destaque .card__titulo{font-size:20px}
.card--destaque .card__veu{background:linear-gradient(90deg,rgb(30 38 32/.92) 0%,rgb(30 38 32/.7) 60%,rgb(30 38 32/.2) 100%)}
.card__selo{align-self:flex-start;font-size:10.5px;font-weight:600;letter-spacing:.12em;text-transform:uppercase;color:var(--profundo);background:var(--areia);padding:4px 9px;border-radius:999px;margin-bottom:4px}
.divisor{width:40px;height:1px;background:rgb(255 255 255/.16);margin-bottom:24px}
.sociais{display:flex;gap:12px;margin-bottom:30px}
.social{width:56px;height:56px;border-radius:16px;display:grid;place-items:center;color:rgb(255 255 255/.75);background:rgb(255 255 255/.06);border:1.5px solid rgb(255 255 255/.1);text-decoration:none;transition:background .18s,color .18s,border-color .18s,transform .18s}
.social svg{width:22px;height:22px}
.social:hover{background:var(--verde);color:#fff;border-color:var(--verde)}
.social:active{transform:scale(.93)}
.rodape{font-size:11.5px;color:rgb(255 255 255/.35);text-align:center;line-height:1.7}
.rodape a{color:inherit}
.whats-flutuante{position:fixed;right:18px;bottom:22px;width:58px;height:58px;border-radius:50%;display:grid;place-items:center;background:#25D366;color:#fff;box-shadow:0 6px 22px rgb(37 211 102/.45);z-index:10;transition:transform .18s}
.whats-flutuante svg{width:28px;height:28px}
.whats-flutuante:hover{transform:translateY(-2px)}
.sr{position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0 0 0 0);white-space:nowrap}
@keyframes sobe{from{opacity:0;transform:translateY(14px)}to{opacity:1;transform:none}}
@keyframes flutua{0%,100%{transform:translateY(0) rotate(0)}50%{transform:translateY(-12px) rotate(4deg)}}
@keyframes brilho{0%,75%{transform:translateX(-120%) skewX(-20deg)}100%{transform:translateX(260%) skewX(-20deg)}}
@media (prefers-reduced-motion:no-preference){
  .logo,.tagline,.card,.divisor,.sociais,.rodape{opacity:0;animation:sobe .6s cubic-bezier(.2,.7,.2,1) forwards}
  .logo{animation-delay:.05s}.tagline{animation-delay:.12s}
  .card{animation-delay:calc(var(--i) * 70ms + .2s)}
  .divisor,.sociais{animation-delay:.85s}.rodape{animation-delay:.95s}
  .folha{animation:flutua 9s ease-in-out infinite}
  .card--destaque::after{content:"";position:absolute;inset:0 auto 0 0;width:35%;background:linear-gradient(90deg,transparent,rgb(255 255 255/.22),transparent);transform:translateX(-120%) skewX(-20deg);animation:brilho 5s ease-in-out 1.5s infinite;pointer-events:none}
}
@media (min-width:600px){body{padding-top:64px}.card{height:104px}.card--destaque{height:140px}}
`;

export default ({ versao }) => {
  const caminho = '/links/';
  const html = `<!doctype html>
<html lang="pt-BR">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<title>Belnic | Links</title>
<meta name="description" content="Links da Belnic Cosméticos: Green Week, catálogos Maison Visage, Mirra e Terapia Capilar, cursos e WhatsApp.">
<meta name="robots" content="noindex, follow">
<link rel="canonical" href="${site.url}${caminho}">
<meta name="theme-color" content="#2F3B32">
<meta property="og:title" content="Belnic | Links">
<meta property="og:description" content="Green Week, catálogos, cursos e WhatsApp da Belnic.">
<meta property="og:image" content="${site.url}/assets/img/og-belnic.jpg">
<link rel="icon" href="/favicon.svg" type="image/svg+xml">
<link rel="icon" href="/favicon-32.png" sizes="32x32" type="image/png">
<link rel="apple-touch-icon" href="/apple-touch-icon.png">
<link rel="preload" href="/assets/fonts/jost.woff2" as="font" type="font/woff2" crossorigin>
${medicaoHead()}
<style>${css}</style>
${jsonld({ '@context': 'https://schema.org', '@type': 'WebPage', name: 'Links da Belnic', url: `${site.url}${caminho}`, isPartOf: { '@id': `${site.url}/#site` } })}
</head>
<body>
${site.gtm ? `<noscript><iframe src="https://www.googletagmanager.com/ns.html?id=${site.gtm}" height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript>` : ''}
<span class="folha" aria-hidden="true">${simbolo}</span>
<main class="pagina">
  <h1 class="sr">Links da Belnic Cosméticos</h1>
  <a class="logo" href="/?utm_source=instagram&amp;utm_medium=bio&amp;utm_campaign=links" aria-label="Belnic Cosméticos — site">${logoHorizontal}</a>
  <p class="tagline">Distribuidora oficial<br>Maison Visage &amp; Mirra Professional</p>

  <nav class="links" aria-label="Links da Belnic">${links.map(card).join('')}
  </nav>

  <div class="divisor"></div>
  <div class="sociais">
    <a class="social" href="${site.instagram}" target="_blank" rel="noopener" aria-label="Instagram da Belnic">${ic.instagram}</a>
    <a class="social" href="${wa()}" target="_blank" rel="noopener" data-evento="whatsapp" aria-label="WhatsApp da Belnic">${ic.whatsapp}</a>
    <a class="social" href="mailto:${site.email}" aria-label="E-mail da Belnic">${ic.email}</a>
    <a class="social" href="/?utm_source=instagram&amp;utm_medium=bio&amp;utm_campaign=links" aria-label="Site da Belnic">${ic.globo}</a>
  </div>
  <p class="rodape">© ${new Date().getFullYear()} ${site.nome}<br><a href="/politicas-de-privacidade/">Política de privacidade</a></p>
</main>
<a class="whats-flutuante" href="${wa('Olá! Vim pelos links da Belnic e gostaria de atendimento.')}" target="_blank" rel="noopener" data-evento="whatsapp" aria-label="Falar no WhatsApp">${ic.whatsapp}</a>
<script src="/assets/js/main.js?v=${versao}" defer></script>
<script>
  // Clique em cada card da página de links (nome do card no parâmetro "link")
  document.addEventListener('click', function (e) {
    var a = e.target.closest('[data-link]');
    if (!a) return;
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({ event: 'clique_link_bio', link: a.dataset.link });
    if (typeof window.gtag === 'function') window.gtag('event', 'clique_link_bio', { link: a.dataset.link });
  });
</script>
</body>
</html>`;
  return { caminho, noindex: true, html };
};
