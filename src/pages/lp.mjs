// Landing page (plano enxuto): uma página só, sem catálogo de produtos.
// No modo 'landing' é a home do domínio; no modo 'completo' fica em /lp/ com noindex.
// Textos pensados para busca (Google) e para respostas de IA (GEO): frases de definição
// claras, nomes das marcas e variações ("Mirra Cosméticos"), cidades e perguntas reais.
import { pagina, esc, icon, simbolo, btnWhats } from '../layout.mjs';
import { site } from '../site.mjs';
import { faqHtml, faqSchema, cardParceiro, regioesAtendidas } from '../componentes.mjs';

const catalogos = [
  ['Maison Visage', 'Finalizadores, tratamento e cuidados corporais', '/catalogos/catalogo-maison-visage.pdf'],
  ['Mirra Professional', 'Tratamento, coloração e finalização', '/catalogos/catalogo-mirra-professional.pdf'],
  ['Terapia Capilar', 'Linha Spa Therapy e protocolos', '/catalogos/catalogo-terapia-capilar-spa-therapy.pdf'],
];

// Perguntas no formato em que as pessoas buscam no Google e perguntam às IAs.
const faq = [
  ['Onde comprar Mirra Professional e Maison Visage em Porto Alegre?',
    'Profissionais da beleza compram com a Belnic, distribuidora oficial das duas marcas no Rio Grande do Sul. O pedido é feito pelo WhatsApp com o representante da sua região, que atende ' + site.cidades.length + ' cidades, da Grande Porto Alegre e Serra Gaúcha ao Litoral Norte e à Região Sul.'],
  ['A Belnic é distribuidora oficial da Mirra e da Maison Visage?',
    'Sim. A Belnic é distribuidora oficial da Mirra Professional (também conhecida como Mirra Cosméticos) e da Maison Visage no RS, com produtos para tratamento, coloração, finalização e terapia capilar.'],
  ['Qual a diferença entre Maison Visage e Mirra Professional?',
    'A Maison Visage Cosmetique, criada em 2000, é a empresa-mãe da Mirra Professional. A Maison Visage tem os finalizadores Touch, Luxury Nanotherapy, Le Bain, Nano Force e a linha de terapia capilar Spa Therapy. A Mirra Professional tem linhas como Elements, BioRestore, Theraplex, MS Curls e a coloração Trend Colors.'],
  ['A Belnic vende para consumidor final?',
    'Não. A Belnic vende apenas para salões, estúdios, clínicas e profissionais da beleza. Se você é cliente final, chame no WhatsApp e indicamos um salão parceiro perto de você.'],
  ['Em quais cidades a Belnic atende?',
    `A Belnic atende ${site.cidades.length} cidades do Rio Grande do Sul. ${site.regioes.map((r) => `${r.nome}: ${r.cidades.join(', ')}`).join('. ')}.`],
  ['A Belnic oferece curso de terapia capilar?',
    'Sim. A Belnic promove a Imersão em Terapia Capilar, com dois dias presenciais em Novo Hamburgo (RS), além de workshops e treinamentos gravados com educadores das marcas. Pergunte no WhatsApp pelas próximas turmas.'],
  ['Como ser parceiro Belnic e comprar para o meu salão?',
    'Chame a Belnic pelo WhatsApp e conte sobre o seu negócio e a sua cidade. O representante da sua região apresenta as linhas, as condições comerciais e os treinamentos.'],
  ['Onde vejo o catálogo e os preços?',
    'Os catálogos completos da Maison Visage, da Mirra Professional e da linha Spa Therapy estão em PDF nesta página. Valores e condições são passados pelo representante, de acordo com o perfil do seu negócio.'],
];

export default ({ dados, versao, modo }) => {
  const caminho = modo === 'landing' ? '/' : '/lp/';
  const noindex = modo !== 'landing';
  // A Belnic não atende barbearias: a linha Hombre (barbearia) não aparece na landing.
  const linhasDe = (m) => dados.linhas.filter((l) => l.marca === m && l.produtos.length && l.slug !== 'hombre-barbearia').map((l) => l.nome);

  const corpo = `
<section class="hero">
  <span class="hero__folha" aria-hidden="true">${simbolo}</span>
  <div class="container hero__grade">
    <div class="hero__texto">
      <h1><span class="sobretitulo">Distribuidora Mirra e Maison Visage no RS</span> Produtos, formação e suporte para o seu salão <em>crescer</em>.</h1>
      <p class="lead">A Belnic é a distribuidora oficial da <strong>Mirra Professional</strong> e da <strong>Maison Visage</strong> no Rio Grande do Sul. Atendemos salões de beleza, estúdios, terapeutas capilares e clínicas em ${site.cidades.length} cidades gaúchas, da Grande Porto Alegre à Serra, ao Litoral Norte e à Região Sul, com produtos profissionais, cursos e suporte de perto.</p>
      <div class="botoes">
        <a class="btn btn--primario" href="#parceiro">Quero ser parceiro ${icon.arrow}</a>
        ${btnWhats('Falar no WhatsApp', 'Olá! Vim pelo site e gostaria de mais informações.', 'btn btn--contorno')}
      </div>
      <div class="hero__marcas"><span>Mirra Professional</span><span>Maison Visage</span><span>Spa Therapy</span></div>
    </div>
    <div class="hero__visual">
      <img src="/assets/img/home-hero.webp" alt="Modelo com produtos Spa Therapy da Maison Visage, distribuídos pela Belnic no RS" width="900" height="912" fetchpriority="high">
      <div class="hero__selo">${icon.pin}<span><strong>Atendemos ${site.cidades.length} cidades</strong><br>Da Serra ao Litoral e ao Sul do RS</span></div>
    </div>
  </div>
</section>

<section class="secao secao--branca" id="para-quem">
  <div class="container">
    <div class="cabeca revela">
      <span class="sobretitulo">Para quem é a Belnic</span>
      <h2>Produtos profissionais para salões, clínicas e estúdios</h2>
      <p class="lead">Venda exclusiva para profissionais da beleza. Você escolhe as linhas, a gente ajuda a transformar produto em resultado e em faturamento.</p>
    </div>
    <div class="grade grade--3">
      <article class="cartao revela"><span class="numero">01</span><h3>Salões e cabeleireiros</h3><p>Tratamento, coloração, alisamento e finalização Mirra e Maison Visage, além de home care para revenda ao cliente.</p></article>
      <article class="cartao revela"><span class="numero">02</span><h3>Clínicas e terapeutas capilares</h3><p>A linha Spa Therapy da Maison Visage, com óleos essenciais, argilas, tônicos e protocolos prontos para couro cabeludo.</p></article>
      <article class="cartao revela"><span class="numero">03</span><h3>Estúdios e profissionais autônomos</h3><p>Tratamento, finalização e home care para revender às suas clientes, com o suporte de um representante da sua região.</p></article>
    </div>
  </div>
</section>

<section class="secao" id="marcas">
  <div class="container">
    <div class="cabeca revela">
      <span class="sobretitulo">Nossas marcas</span>
      <h2>Mirra Professional e Maison Visage: duas marcas, um só distribuidor</h2>
      <p class="lead">A Maison Visage Cosmetique, criada em 2000, é a empresa-mãe da Mirra Professional. Juntas, cobrem tratamento, coloração, finalização e terapia capilar.</p>
    </div>
    <div class="grade grade--2">
      <article class="marca-card revela">
        <img src="/assets/img/marca-maison-visage.webp" alt="Finalizadores capilares Maison Visage" loading="lazy" width="1200" height="1500">
        <span class="marca-card__tag">Desde 2000</span>
        <h3>Maison Visage</h3>
        <p>Alta performance em tratamento e finalização capilar, terapia capilar Spa Therapy e cuidados corporais.</p>
        <ul class="lp-linhas">${linhasDe('maison-visage').map((l) => `<li>${esc(l)}</li>`).join('')}</ul>
        <a class="link-seta" href="${catalogos[0][2]}" download>Baixar catálogo Maison Visage ${icon.download}</a>
      </article>
      <article class="marca-card revela">
        <img src="/assets/img/marca-mirra.webp" alt="Linha MS Curls da Mirra Professional (Mirra Cosméticos)" loading="lazy" width="1200" height="1500">
        <span class="marca-card__tag">Há mais de 25 anos</span>
        <h3>Mirra Professional</h3>
        <p>Também conhecida como Mirra Cosméticos: tratamento, coloração, alisamento e finalização profissional para salões de beleza.</p>
        <ul class="lp-linhas">${linhasDe('mirra-professional').map((l) => `<li>${esc(l)}</li>`).join('')}</ul>
        <a class="link-seta" href="${catalogos[1][2]}" download>Baixar catálogo Mirra ${icon.download}</a>
      </article>
    </div>
  </div>
</section>

<section class="secao secao--areia">
  <div class="container">
    <div class="cabeca cabeca--centro revela">
      <span class="sobretitulo">Por que a Belnic</span>
      <h2>Produtos, formação e suporte em um só parceiro</h2>
    </div>
    <div class="grade grade--3">
      <article class="cartao revela"><div class="cartao__icone">${simbolo}</div><h3>Produtos</h3><p>Linhas completas de A a Z para salões de beleza e home care, com catálogo atualizado e reposição ágil na sua região.</p></article>
      <article class="cartao revela"><div class="cartao__icone">${icon.livro}</div><h3>Formação</h3><p>Imersões presenciais e treinamentos com educadores das marcas: terapia capilar, colorimetria, protocolos e vendas.</p></article>
      <article class="cartao revela"><div class="cartao__icone">${icon.whatsapp}</div><h3>Suporte</h3><p>Representantes na sua região e atendimento pelo WhatsApp para tirar dúvidas de uso, protocolo e pedido.</p></article>
    </div>
  </div>
</section>

<section class="secao" id="terapia-capilar">
  <div class="container dividido">
    <div class="revela">
      <span class="sobretitulo">Terapia capilar</span>
      <h2>Terapia capilar com a linha Spa Therapy</h2>
      <p class="lead">A linha Spa Therapy da Maison Visage reúne óleos essenciais, argilas, vitaminas e tônicos para o couro cabeludo, com ${dados.protocolos.length} protocolos prontos para cabine e home care.</p>
      <ul class="lista-check" style="margin:24px 0 28px">
        <li>Protocolos de cabine e de home care</li>
        <li>Home Spa Therapy para revender às clientes</li>
        <li>Imersão presencial para terapeutas capilares</li>
      </ul>
      <div class="botoes">
        <a class="btn btn--primario" href="${catalogos[2][2]}" download>Baixar catálogo Spa Therapy ${icon.download}</a>
      </div>
    </div>
    <div class="hero__visual revela" style="margin-top:32px">
      <img src="/assets/img/produtos/terapia-capilar/tonico-growth-factor.webp" alt="Tônico Growth Factor da linha Spa Therapy, Maison Visage" loading="lazy" width="465" height="637">
    </div>
  </div>
</section>

<section class="secao secao--branca" id="formacao">
  <div class="container">
    <div class="cabeca revela">
      <span class="sobretitulo">Formação</span>
      <h2>Cursos de terapia capilar e treinamentos para profissionais</h2>
      <p class="lead">Parceiros Belnic aprendem com educadores das marcas, na prática e no seu ritmo.</p>
    </div>
    <div class="grade grade--3">
      <article class="cartao revela"><span class="numero">01</span><h3>Imersão em Terapia Capilar</h3><p>Curso de terapia capilar com dois dias presenciais em Novo Hamburgo (RS): teoria, diagnóstico e prática com modelos reais.</p></article>
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
      <h2>Onde a Belnic atende: ${site.cidades.length} cidades no Rio Grande do Sul</h2>
      <p class="lead">Representantes Belnic visitam salões, estúdios e clínicas na Grande Porto Alegre, nos Vales, na Serra Gaúcha, no Litoral Norte e na Região Sul. Toque na região para ver as cidades.</p>
    </div>
    <div class="revela">${regioesAtendidas()}</div>
    <p style="margin-top:24px">Não encontrou a sua cidade? <a href="${'https://wa.me/' + site.whatsapp + '?text=' + encodeURIComponent('Olá! Gostaria de saber se a Belnic atende a minha cidade.')}" target="_blank" rel="noopener" data-evento="whatsapp">Fale com a gente no WhatsApp</a>.</p>
  </div>
</section>

<section class="secao" id="catalogos">
  <div class="container">
    <div class="cabeca revela">
      <span class="sobretitulo">Catálogos</span>
      <h2>Catálogos Mirra Professional, Maison Visage e Spa Therapy</h2>
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
      <h2>Seja parceiro Belnic: compre para o seu salão</h2>
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

<section class="secao" id="duvidas">
  <div class="container">
    <div class="cabeca revela"><span class="sobretitulo">Dúvidas frequentes</span><h2>Perguntas frequentes sobre a Belnic</h2></div>
    ${faqHtml(faq)}
  </div>
</section>`;

  const url = `${site.url}${caminho}`;
  return {
    caminho,
    noindex,
    html: pagina({
      lp: true,
      noindex,
      titulo: 'Belnic | Distribuidora Mirra e Maison Visage em Porto Alegre',
      descricao: 'Distribuidora oficial Mirra Professional e Maison Visage no RS: produtos para salão, terapia capilar, cursos e suporte da Grande Porto Alegre ao Litoral e Sul.',
      caminho,
      corpo,
      versao,
      schema: [
        { '@type': 'WebSite', '@id': `${site.url}/#site`, url: `${site.url}/`, name: site.nome, alternateName: 'Belnic', inLanguage: 'pt-BR', publisher: { '@id': `${site.url}/#organizacao` } },
        {
          '@type': 'WebPage', '@id': `${url}#pagina`, url, name: 'Belnic: distribuidora Mirra Professional e Maison Visage no RS',
          inLanguage: 'pt-BR', isPartOf: { '@id': `${site.url}/#site` }, about: { '@id': `${site.url}/#organizacao` },
          primaryImageOfPage: `${site.url}/assets/img/home-hero.webp`,
          mentions: [
            { '@type': 'Brand', name: 'Mirra Professional' }, { '@type': 'Brand', name: 'Maison Visage' },
            { '@type': 'Thing', name: 'Terapia capilar' },
          ],
        },
        faqSchema(faq),
      ],
    }),
  };
};
