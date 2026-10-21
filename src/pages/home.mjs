import { pagina, esc, icon, simbolo, btnWhats } from '../layout.mjs';
import { site } from '../site.mjs';
import { gradeProdutos, faixaCTA, faqHtml, faqSchema } from '../componentes.mjs';

const faq = [
  ['A Belnic vende para consumidor final?',
    'A Belnic é distribuidora de produtos profissionais e atende salões, clínicas e profissionais da beleza. Se você é cliente final, fale com a gente pelo WhatsApp e indicamos um salão parceiro perto de você.'],
  ['Quais marcas a Belnic distribui?',
    'Somos distribuidora oficial das marcas <a href="/marcas/maison-visage/">Maison Visage</a> e <a href="/marcas/mirra-professional/">Mirra Professional</a>, com linhas para pele, cabelo, coloração e <a href="/terapia-capilar/">terapia capilar</a>.'],
  ['Em quais cidades a Belnic atende?',
    `Atendemos ${site.cidades.length} cidades do RS, na Grande Porto Alegre, nos Vales, na Serra Gaúcha, no Litoral Norte e na Região Sul. Veja a lista completa em <a href="/onde-atendemos/">Onde atendemos</a>.`],
  ['Como faço para me tornar parceiro Belnic?',
    'Chame nossa equipe no WhatsApp ou veja como funciona em <a href="/seja-parceiro/">Seja parceiro</a>. Um consultor da sua região entra em contato para apresentar as linhas, condições e treinamentos.'],
  ['A Belnic oferece cursos e treinamentos?',
    'Sim. Oferecemos imersões presenciais e treinamentos com educadores das marcas, em temas como terapia capilar, colorimetria, tratamentos e estratégia de vendas. Veja em <a href="/formacao/">Formação</a>.'],
];

export default ({ dados, versao }) => {
  const destaque = dados.produtos.filter((p) => p.img);
  const vitrine = [...destaque.filter((p) => p.marca === 'mirra-professional').slice(0, 4), ...destaque.filter((p) => p.marca === 'maison-visage').slice(0, 4)].slice(0, 8);
  const heroImg = '/assets/img/home-hero.webp';
  const imgMV = '/assets/img/marca-maison-visage.webp';
  const imgMirra = '/assets/img/marca-mirra.webp';

  const corpo = `
<section class="hero">
  <span class="hero__folha" aria-hidden="true">${simbolo}</span>
  <div class="container hero__grade">
    <div class="hero__texto">
      <span class="sobretitulo">Distribuidora oficial no RS</span>
      <h1>Produtos, formação e suporte para o seu salão <em>crescer</em>.</h1>
      <p class="lead">A Belnic leva as linhas profissionais <strong>Maison Visage</strong> e <strong>Mirra Professional</strong> para salões, clínicas estéticas e profissionais da beleza de todo o Rio Grande do Sul, com treinamento e acompanhamento de perto.</p>
      <div class="botoes">
        ${btnWhats('Quero ser parceiro', 'Olá! Vim pelo site e quero ser parceiro(a) Belnic.')}
        <a class="btn btn--contorno" href="/produtos/">Ver produtos ${icon.arrow}</a>
      </div>
      <div class="hero__marcas"><span>Maison Visage</span><span>Mirra Professional</span><span>Spa Therapy</span></div>
    </div>
    <div class="hero__visual">
      <img src="${heroImg}" alt="Modelo com produtos Spa Therapy da Maison Visage, distribuídos pela Belnic" width="900" height="912" fetchpriority="high">
      <div class="hero__selo">${icon.pin}<span><strong>Atendemos ${site.cidades.length} cidades</strong><br>Da Serra ao Litoral e ao Sul do RS</span></div>
    </div>
  </div>
</section>

<section class="secao secao--branca">
  <div class="container">
    <div class="cabeca revela">
      <span class="sobretitulo">Para quem é a Belnic</span>
      <h2>Feita para quem vive de beleza</h2>
      <p class="lead">Atendimento exclusivo para profissionais. Você escolhe as linhas, a gente ajuda a transformar produto em resultado e em faturamento.</p>
    </div>
    <div class="grade grade--3">
      <article class="cartao revela"><span class="numero">01</span><h3>Salões e cabeleireiros</h3><p>Tratamento, coloração, alisamento e finalização Mirra e Maison Visage, além de home care para revenda ao cliente.</p></article>
      <article class="cartao revela"><span class="numero">02</span><h3>Clínicas e terapeutas capilares</h3><p>A linha Spa Therapy da Maison Visage, com óleos essenciais, argilas, tônicos e protocolos prontos para couro cabeludo.</p></article>
      <article class="cartao revela"><span class="numero">03</span><h3>Estúdios e profissionais autônomos</h3><p>Tratamento, finalização e home care para revender às suas clientes, com o suporte de um representante da sua região.</p></article>
    </div>
  </div>
</section>

<section class="secao">
  <div class="container">
    <div class="cabeca revela">
      <span class="sobretitulo">Nossas marcas</span>
      <h2>Duas marcas profissionais, um só parceiro</h2>
    </div>
    <div class="grade grade--2">
      <a class="marca-card revela" href="/marcas/maison-visage/">
        <img src="${imgMV}" alt="Linha Maison Visage" loading="lazy" width="1200" height="1500">
        <span class="marca-card__tag">Tratamento · Finalização · Spa capilar</span>
        <h3>Maison Visage</h3>
        <p>Alta performance desde 2000: finalizadores Touch, Luxury Nanotherapy, Le Bain, Nano Force e a linha Spa Therapy.</p>
        <span class="link-seta">Conhecer a marca ${icon.arrow}</span>
      </a>
      <a class="marca-card revela" href="/marcas/mirra-professional/">
        <img src="${imgMirra}" alt="Linha Mirra Professional" loading="lazy" width="1200" height="1500">
        <span class="marca-card__tag">Tratamento · Cor · Finalização</span>
        <h3>Mirra Professional</h3>
        <p>Há mais de 25 anos em cuidados pessoais: Elements, BioRestore, Trend Colors, Theraplex, MS Curls e muito mais.</p>
        <span class="link-seta">Conhecer a marca ${icon.arrow}</span>
      </a>
    </div>
  </div>
</section>

${vitrine.length ? `
<section class="secao secao--branca">
  <div class="container">
    <div class="cabeca revela" style="display:flex;flex-wrap:wrap;justify-content:space-between;align-items:end;gap:16px;max-width:none">
      <div><span class="sobretitulo">Destaques</span><h2 style="margin:0">Produtos que fazem a diferença no salão</h2></div>
      <a class="link-seta" href="/produtos/">Ver todos os ${dados.produtos.length} produtos ${icon.arrow}</a>
    </div>
    ${gradeProdutos(vitrine)}
  </div>
</section>` : ''}

<section class="secao secao--areia">
  <div class="container">
    <div class="cabeca cabeca--centro revela">
      <span class="sobretitulo">Por que a Belnic</span>
      <h2>Mais do que entregar produto</h2>
    </div>
    <div class="grade grade--3">
      <article class="cartao revela"><div class="cartao__icone">${simbolo}</div><h3>Produtos</h3><p>Linhas completas de A a Z para salões de beleza e home care, com catálogo atualizado e reposição ágil na sua região.</p></article>
      <article class="cartao revela"><div class="cartao__icone">${icon.livro}</div><h3>Formação</h3><p>Imersões presenciais e treinamentos com educadores das marcas: terapia capilar, colorimetria, protocolos e vendas.</p></article>
      <article class="cartao revela"><div class="cartao__icone">${icon.whatsapp}</div><h3>Suporte</h3><p>Representantes na sua região e atendimento pelo WhatsApp para tirar dúvidas de uso, protocolo e pedido.</p></article>
    </div>
  </div>
</section>

<section class="secao">
  <div class="container dividido">
    <div class="revela">
      <span class="sobretitulo">Terapia capilar</span>
      <h2>Protocolos completos para couro cabeludo</h2>
      <p class="lead">A linha Spa Therapy da Maison Visage reúne óleos essenciais, argilas, vitaminas e tônicos com ${dados.protocolos.length || 'diversos'} protocolos prontos: queda capilar, oleosidade, caspa, sensibilidade e mais.</p>
      <ul class="lista-check" style="margin:24px 0 28px">
        <li>Protocolos de cabine e de home care</li>
        <li>Home Spa Therapy para revender às clientes</li>
        <li>Imersão presencial para terapeutas capilares</li>
      </ul>
      <a class="btn btn--primario" href="/terapia-capilar/">Ver protocolos ${icon.arrow}</a>
    </div>
    <div class="hero__visual revela" style="margin-top:32px">
      <img src="/assets/img/produtos/terapia-capilar/tonico-growth-factor.webp" alt="Tônico Growth Factor da linha Spa Therapy Maison Visage" loading="lazy" width="465" height="637">
    </div>
  </div>
</section>

<section class="secao secao--verde">
  <div class="container">
    <div class="cabeca revela">
      <span class="sobretitulo">Onde atendemos</span>
      <h2>${site.cidades.length} cidades no Rio Grande do Sul</h2>
      <p class="lead">Representantes Belnic visitam salões e clínicas em ${site.cidades.length} cidades do Rio Grande do Sul.</p>
    </div>
    <ul class="cidades revela">${site.cidades.map((c) => `<li>${esc(c)}</li>`).join('')}</ul>
    <p style="margin-top:28px"><a class="link-seta" href="/onde-atendemos/">Ver mapa de atendimento ${icon.arrow}</a></p>
  </div>
</section>

<section class="secao">
  <div class="container">
    <div class="cabeca revela"><span class="sobretitulo">Dúvidas frequentes</span><h2>Perguntas comuns</h2></div>
    ${faqHtml(faq)}
  </div>
</section>

${faixaCTA()}`;

  return {
    caminho: '/',
    html: pagina({
      titulo: 'Belnic Cosméticos | Distribuidora Maison Visage e Mirra Professional no RS',
      descricao: 'Distribuidora oficial Maison Visage e Mirra Professional em Porto Alegre e região. Produtos profissionais, formação e suporte para salões, clínicas e profissionais da beleza.',
      caminho: '/',
      corpo,
      versao,
      schema: [
        { '@type': 'WebSite', '@id': `${site.url}/#site`, url: `${site.url}/`, name: site.nome, inLanguage: 'pt-BR', publisher: { '@id': `${site.url}/#organizacao` } },
        faqSchema(faq),
      ],
    }),
  };
};
