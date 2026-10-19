// Landing page (plano enxuto) em /lp/: uma página só, sem catálogo de produtos.
// Fica fora do sitemap e com noindex para não concorrer com a home do site completo.
import { pagina, esc, icon, simbolo, btnWhats } from '../layout.mjs';
import { site } from '../site.mjs';
import { faqHtml, faqSchema, cardParceiro } from '../componentes.mjs';

const catalogos = [
  ['Maison Visage', 'Finalizadores, tratamento e cuidados corporais', '/catalogos/catalogo-maison-visage.pdf'],
  ['Mirra Professional', 'Tratamento, coloração e finalização', '/catalogos/catalogo-mirra-professional.pdf'],
  ['Terapia Capilar', 'Linha Spa Therapy e protocolos', '/catalogos/catalogo-terapia-capilar-spa-therapy.pdf'],
];

const faq = [
  ['A Belnic vende para consumidor final?',
    'A Belnic é distribuidora de produtos profissionais e atende salões, clínicas e profissionais da beleza. Se você é cliente final, fale com a gente pelo WhatsApp e indicamos um salão parceiro perto de você.'],
  ['Quais marcas a Belnic distribui?',
    'Somos distribuidora oficial das marcas Maison Visage e Mirra Professional, com linhas para tratamento, coloração, finalização, barbearia e terapia capilar.'],
  ['Em quais cidades a Belnic atende?',
    `Atendemos Porto Alegre, Região Metropolitana, Vale do Sinos, Vale do Paranhana e Serra Gaúcha: ${site.cidades.length} cidades no total.`],
  ['Como faço para me tornar parceiro Belnic?',
    'Chame nossa equipe pelo botão de WhatsApp desta página. Um representante da sua região entra em contato para apresentar as linhas, condições e treinamentos.'],
  ['Onde vejo os produtos e valores?',
    'Os produtos estão nos catálogos em PDF desta página. Valores e condições são passados pelo representante, de acordo com o perfil do seu negócio.'],
];

export default ({ dados, versao }) => {
  const linhasDe = (m) => dados.linhas.filter((l) => l.marca === m && l.produtos.length).map((l) => l.nome);

  const corpo = `
<section class="hero">
  <span class="hero__folha" aria-hidden="true">${simbolo}</span>
  <div class="container hero__grade">
    <div class="hero__texto">
      <span class="sobretitulo">Distribuidora oficial no RS</span>
      <h1>Produtos, formação e suporte para o seu salão <em>crescer</em>.</h1>
      <p class="lead">A Belnic leva as linhas profissionais <strong>Maison Visage</strong> e <strong>Mirra Professional</strong> para salões, clínicas e profissionais da beleza de ${site.regiao}, com treinamento e acompanhamento de perto.</p>
      <div class="botoes">
        <a class="btn btn--primario" href="#parceiro">Quero ser parceiro ${icon.arrow}</a>
        ${btnWhats('Falar no WhatsApp', 'Olá! Vim pelo site e gostaria de mais informações.', 'btn btn--contorno')}
      </div>
      <div class="hero__marcas"><span>Maison Visage</span><span>Mirra Professional</span><span>Spa Therapy</span></div>
    </div>
    <div class="hero__visual">
      <img src="/assets/img/home-hero.webp" alt="Modelo com produtos Spa Therapy da Maison Visage, distribuídos pela Belnic" width="900" height="912" fetchpriority="high">
      <div class="hero__selo">${icon.pin}<span><strong>Atendemos ${site.cidades.length} cidades</strong><br>Porto Alegre, Vale do Sinos e Serra</span></div>
    </div>
  </div>
</section>

<section class="secao secao--branca" id="para-quem">
  <div class="container">
    <div class="cabeca revela">
      <span class="sobretitulo">Para quem é a Belnic</span>
      <h2>Feita para quem vive de beleza</h2>
      <p class="lead">Atendimento exclusivo para profissionais. Você escolhe as linhas, a gente ajuda a transformar produto em resultado e em faturamento.</p>
    </div>
    <div class="grade grade--3">
      <article class="cartao revela"><span class="numero">01</span><h3>Salões e cabeleireiros</h3><p>Tratamento, coloração, alisamento e finalização Mirra e Maison Visage, além de home care para revenda ao cliente.</p></article>
      <article class="cartao revela"><span class="numero">02</span><h3>Clínicas e terapeutas capilares</h3><p>A linha Spa Therapy da Maison Visage, com óleos essenciais, argilas, tônicos e protocolos prontos para couro cabeludo.</p></article>
      <article class="cartao revela"><span class="numero">03</span><h3>Barbearias</h3><p>Linha Hombre da Mirra e protocolos Barber Therapy para cuidar do cabelo, da barba e do couro cabeludo masculino.</p></article>
    </div>
  </div>
</section>

<section class="secao" id="marcas">
  <div class="container">
    <div class="cabeca revela">
      <span class="sobretitulo">Nossas marcas</span>
      <h2>Duas marcas profissionais, um só parceiro</h2>
    </div>
    <div class="grade grade--2">
      <article class="marca-card revela">
        <img src="/assets/img/marca-maison-visage.webp" alt="Finalizadores Maison Visage" loading="lazy" width="1200" height="1500">
        <span class="marca-card__tag">Desde 2000</span>
        <h3>Maison Visage</h3>
        <p>Alta performance em tratamento e finalização capilar, terapia capilar Spa Therapy e cuidados corporais.</p>
        <ul class="lp-linhas">${linhasDe('maison-visage').map((l) => `<li>${esc(l)}</li>`).join('')}</ul>
        <a class="link-seta" href="${catalogos[0][2]}" download>Baixar catálogo ${icon.download}</a>
      </article>
      <article class="marca-card revela">
        <img src="/assets/img/marca-mirra.webp" alt="Linha MS Curls da Mirra Professional" loading="lazy" width="1200" height="1500">
        <span class="marca-card__tag">Há mais de 25 anos</span>
        <h3>Mirra Professional</h3>
        <p>Tratamento, coloração, alisamento e finalização profissional para salões e barbearias.</p>
        <ul class="lp-linhas">${linhasDe('mirra-professional').map((l) => `<li>${esc(l)}</li>`).join('')}</ul>
        <a class="link-seta" href="${catalogos[1][2]}" download>Baixar catálogo ${icon.download}</a>
      </article>
    </div>
  </div>
</section>

<section class="secao secao--areia">
  <div class="container">
    <div class="cabeca cabeca--centro revela">
      <span class="sobretitulo">Por que a Belnic</span>
      <h2>Mais do que entregar produto</h2>
    </div>
    <div class="grade grade--3">
      <article class="cartao revela"><div class="cartao__icone">${simbolo}</div><h3>Produtos</h3><p>Linhas completas para cabine e home care, com catálogo atualizado e reposição ágil na sua região.</p></article>
      <article class="cartao revela"><div class="cartao__icone">${icon.livro}</div><h3>Formação</h3><p>Imersões presenciais e treinamentos com educadores das marcas: terapia capilar, colorimetria, protocolos e vendas.</p></article>
      <article class="cartao revela"><div class="cartao__icone">${icon.whatsapp}</div><h3>Suporte</h3><p>Representantes na sua região e atendimento pelo WhatsApp para tirar dúvidas de uso, protocolo e pedido.</p></article>
    </div>
  </div>
</section>

<section class="secao" id="terapia-capilar">
  <div class="container dividido">
    <div class="revela">
      <span class="sobretitulo">Terapia capilar</span>
      <h2>Protocolos completos para couro cabeludo</h2>
      <p class="lead">A linha Spa Therapy da Maison Visage reúne óleos essenciais, argilas, vitaminas e tônicos, com ${dados.protocolos.length} protocolos prontos para cabine, barbearia e home care.</p>
      <ul class="lista-check" style="margin:24px 0 28px">
        <li>Protocolos de cabine e de home care</li>
        <li>Barber Therapy para o público masculino</li>
        <li>Imersão presencial para terapeutas capilares</li>
      </ul>
      <div class="botoes">
        <a class="btn btn--primario" href="${catalogos[2][2]}" download>Baixar catálogo Spa Therapy ${icon.download}</a>
      </div>
    </div>
    <div class="hero__visual revela" style="margin-top:32px">
      <img src="/assets/img/produtos/terapia-capilar/tonico-growth-factor.webp" alt="Tônico Growth Factor da linha Spa Therapy Maison Visage" loading="lazy" width="465" height="637">
    </div>
  </div>
</section>

<section class="secao secao--branca" id="formacao">
  <div class="container">
    <div class="cabeca revela">
      <span class="sobretitulo">Formação</span>
      <h2>Capacitação para vender mais e melhor</h2>
      <p class="lead">Parceiros Belnic aprendem com educadores das marcas, na prática e no seu ritmo.</p>
    </div>
    <div class="grade grade--3">
      <article class="cartao revela"><span class="numero">01</span><h3>Imersão em Terapia Capilar</h3><p>Dois dias presenciais em Novo Hamburgo: teoria, diagnóstico e prática com modelos reais.</p></article>
      <article class="cartao revela"><span class="numero">02</span><h3>Workshops com especialistas</h3><p>Como o The Blond's Secret, com Pedro Pinheiro, especialista Mirra Professional e Maison Visage.</p></article>
      <article class="cartao revela"><span class="numero">03</span><h3>Treinamentos gravados</h3><p>Colorimetria, alisamento, cacheadas, protocolos, mega hair e estratégia de vendas.</p></article>
    </div>
    <div class="botoes revela" style="margin-top:28px;max-width:420px">
      ${btnWhats('Quero saber das próximas turmas', 'Oi, gostaria de mais informações sobre os Cursos.')}
    </div>
  </div>
</section>

<section class="secao secao--verde" id="onde-atendemos">
  <div class="container">
    <div class="cabeca revela">
      <span class="sobretitulo">Onde atendemos</span>
      <h2>Porto Alegre, Vale do Sinos e Serra Gaúcha</h2>
      <p class="lead">Representantes Belnic visitam salões e clínicas em ${site.cidades.length} cidades do Rio Grande do Sul.</p>
    </div>
    <ul class="cidades revela">${site.cidades.map((c) => `<li>${esc(c)}</li>`).join('')}</ul>
    <p style="margin-top:28px"><a class="link-seta" href="${site.mapaUrl}" target="_blank" rel="noopener">Ver no mapa ${icon.arrow}</a></p>
  </div>
</section>

<section class="secao" id="catalogos">
  <div class="container">
    <div class="cabeca revela">
      <span class="sobretitulo">Catálogos</span>
      <h2>Conheça todas as linhas</h2>
      <p class="lead">Baixe os catálogos em PDF (cerca de 35 MB cada). Valores e condições com o representante da sua região.</p>
    </div>
    <div class="lp-catalogos">
      ${catalogos.map(([nome, desc, href]) => `<a class="lp-catalogo revela" href="${href}" download><span><strong>${nome}</strong><small>${desc}</small></span>${icon.download}</a>`).join('')}
    </div>
  </div>
</section>

<section class="secao secao--branca" id="parceiro">
  <div class="container dividido">
    <div class="revela">
      <span class="sobretitulo">Seja parceiro Belnic</span>
      <h2>Leve as marcas da Belnic para o seu negócio</h2>
      <p class="lead">É só mandar uma mensagem no WhatsApp. O representante da sua região apresenta as linhas, as condições e os treinamentos.</p>
      <ul class="lista-check" style="margin-top:20px">
        <li>Produtos exclusivos para profissionais</li>
        <li>Formação com educadores das marcas</li>
        <li>Suporte de um representante da sua região</li>
        <li>Combos exclusivos para clientes VIP</li>
      </ul>
    </div>
    ${cardParceiro()}
  </div>
</section>

<section class="secao">
  <div class="container">
    <div class="cabeca revela"><span class="sobretitulo">Dúvidas frequentes</span><h2>Perguntas comuns</h2></div>
    ${faqHtml(faq)}
  </div>
</section>`;

  return {
    caminho: '/lp/',
    noindex: true,
    html: pagina({
      lp: true,
      noindex: true,
      titulo: 'Belnic Cosméticos | Distribuidora Maison Visage e Mirra Professional no RS',
      descricao: 'Distribuidora oficial Maison Visage e Mirra Professional em Porto Alegre e região. Produtos profissionais, formação e suporte para salões, clínicas e profissionais da beleza.',
      caminho: '/lp/',
      corpo,
      versao,
      schema: [
        { '@type': 'WebSite', '@id': `${site.url}/#site`, url: `${site.url}/`, name: site.nome, inLanguage: 'pt-BR', publisher: { '@id': `${site.url}/#organizacao` } },
        faqSchema(faq),
      ],
    }),
  };
};
