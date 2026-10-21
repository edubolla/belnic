import { pagina, esc, icon, migalhas, breadcrumb, btnWhats } from '../layout.mjs';
import { site } from '../site.mjs';
import { gradeProdutos, faixaCTA } from '../componentes.mjs';

const grupoDe = (nome) => (/^barber/i.test(nome) ? 'barber' : /^home care/i.test(nome) ? 'home' : 'cabine');
const grupos = [
  ['cabine', 'Protocolos de cabine', 'Realizados pelo profissional, com avaliação do couro cabeludo e produtos Spa Therapy.'],
  ['barber', 'Barber Therapy', 'Protocolos pensados para o público masculino, para barbearias e terapeutas capilares.'],
  ['home', 'Home care', 'Rotina de manutenção em casa, orientada pelo profissional que acompanha o cliente.'],
];

export default ({ dados, versao }) => {
  const caminho = '/terapia-capilar/';
  const spa = dados.linhas.find((l) => l.slug === 'spa-therapy');
  const destaque = (spa?.produtos || []).filter((p) => p.img && !p.imgDaLinha).slice(0, 8);
  const porGrupo = Object.fromEntries(grupos.map(([g]) => [g, dados.protocolos.filter((p) => grupoDe(p.nome) === g)]));

  const protocolo = (pr) => {
    const prods = pr.produtos.map((s) => dados.porSlug.get(s)).filter(Boolean);
    return `
<details class="protocolo" id="${esc(pr.slug)}">
  <summary>${esc(pr.nome)}</summary>
  <div>
    ${pr.indicacao ? `<p class="protocolo__ind"><strong>Protocolo indicado para:</strong> ${esc(pr.indicacao)}</p>` : ''}
    ${pr.etapas?.length ? `<ol>${pr.etapas.map((e) => `<li>${esc(e)}</li>`).join('')}</ol>` : ''}
    ${prods.length ? `<p class="protocolo__prod"><strong>Produtos utilizados:</strong> ${prods.map((p) => `<a href="${p.url}">${esc(p.nome)}</a>`).join(' · ')}</p>` : ''}
  </div>
</details>`;
  };

  const corpo = `
<section class="cabecalho-pagina">
  <div class="container">
    ${migalhas([['Início', '/'], ['Terapia capilar', caminho]])}
    <div class="dividido" style="margin-top:18px">
      <div>
        <span class="sobretitulo">Maison Visage · Spa Therapy</span>
        <h1>Terapia capilar profissional</h1>
        <p class="lead">Protocolos e produtos para o cuidado do couro cabeludo e dos fios, com óleos essenciais, argilas, vitaminas e tônicos. Uma linha completa para terapeutas capilares e salões que querem oferecer um serviço de cabine diferenciado.</p>
        <div class="botoes" style="margin-top:24px">
          <a class="btn btn--primario" href="#protocolos">Ver os ${dados.protocolos.length} protocolos ${icon.arrow}</a>
          <a class="btn btn--contorno" href="/formacao/">Imersão em Terapia Capilar</a>
        </div>
      </div>
      <div class="hero__visual" style="margin-top:28px"><img src="/assets/img/produtos/terapia-capilar/ambiente-1.webp" alt="Ambiente de terapia capilar com produtos Spa Therapy Maison Visage" width="900" height="1125" fetchpriority="high"></div>
    </div>
  </div>
</section>

<section class="secao secao--branca">
  <div class="container">
    <div class="cabeca revela">
      <span class="sobretitulo">O que é</span>
      <h2>Cuidar do couro cabeludo é cuidar da base do cabelo</h2>
      <p class="lead">A terapia capilar reúne técnicas e produtos aplicados em cabine para limpar, equilibrar e cuidar do couro cabeludo e dos fios. Tudo começa com a avaliação do profissional, que escolhe o protocolo mais adequado para cada cliente.</p>
    </div>
    <div class="grade grade--3">
      <article class="cartao revela"><span class="numero">01</span><h3>Avaliação</h3><p>Análise do couro cabeludo e da queixa do cliente para definir o protocolo.</p></article>
      <article class="cartao revela"><span class="numero">02</span><h3>Aplicação em cabine</h3><p>Higienização, blends de óleos essenciais e vegetais, massagem e finalização.</p></article>
      <article class="cartao revela"><span class="numero">03</span><h3>Manutenção</h3><p>Acompanhamento e home care orientados pelo profissional.</p></article>
    </div>
    <p class="revela" style="margin-top:24px;color:var(--tinta-suave);font-size:.92rem">Os protocolos desta página são de uso profissional e não substituem avaliação individual. Em caso de lesões, dor ou condições dermatológicas, o cliente deve ser encaminhado a um profissional de saúde.</p>
  </div>
</section>

<section class="secao">
  <div class="container">
    <div class="cabeca revela">
      <span class="sobretitulo">A linha</span>
      <h2>Spa Therapy</h2>
      <p class="lead">${esc(spa?.descricao || 'Linha de terapia capilar com esfoliante, óleos essenciais e vegetais, argilas, vitaminas, tônico, espuma de limpeza, máscara de carvão e água termal.')}</p>
    </div>
    ${gradeProdutos(destaque)}
    <p style="margin-top:24px"><a class="link-seta" href="/marcas/maison-visage/#spa-therapy">Ver toda a linha Spa Therapy ${icon.arrow}</a></p>
  </div>
</section>

<section class="secao secao--areia" id="protocolos">
  <div class="container">
    <div class="cabeca revela">
      <span class="sobretitulo">${dados.protocolos.length} protocolos</span>
      <h2>Protocolos Spa Therapy</h2>
      <p class="lead">Escolha um protocolo para ver as etapas e os produtos utilizados.</p>
    </div>
    ${grupos.filter(([g]) => porGrupo[g].length).map(([g, titulo, texto]) => `
    <div class="revela" style="margin-bottom:40px" id="grupo-${g}">
      <h3 style="font-size:1.7rem">${titulo}</h3>
      <p style="color:var(--tinta-suave)">${texto}</p>
      <div class="ficha">${porGrupo[g].map(protocolo).join('')}</div>
    </div>`).join('')}
  </div>
</section>

<section class="secao secao--verde">
  <div class="container dividido">
    <div class="revela">
      <span class="sobretitulo">Formação</span>
      <h2>Imersão em Terapia Capilar</h2>
      <p class="lead">Aprenda na prática a avaliar o couro cabeludo, aplicar os protocolos e apresentar o serviço aos seus clientes.</p>
    </div>
    <div class="botoes revela" style="margin-top:20px">
      <a class="btn btn--claro" href="/formacao/">Conhecer a imersão ${icon.arrow}</a>
      ${btnWhats('Falar no WhatsApp', 'Olá! Quero saber mais sobre a linha Spa Therapy e a Imersão em Terapia Capilar.', 'btn btn--contorno" style="color:#fff')}
    </div>
  </div>
</section>

<section class="secao">
  <div class="container dividido">
    <div class="revela">
      <span class="sobretitulo">Catálogo</span>
      <h2>Catálogo Terapia Capilar Spa Therapy</h2>
      <p class="lead">Todos os protocolos e produtos reunidos em um só arquivo.</p>
    </div>
    <div class="botoes revela" style="margin-top:20px"><a class="btn btn--primario" href="/catalogos/">${icon.download}<span>Ver catálogos em PDF</span></a></div>
  </div>
</section>

${faixaCTA({ titulo: 'Leve a terapia capilar para o seu espaço', texto: 'Fale com a nossa equipe para conhecer a linha Spa Therapy, condições para profissionais e treinamentos.', msg: 'Olá! Quero conhecer a linha de terapia capilar Spa Therapy para o meu negócio.' })}
<script>
(function(){function a(){var h=decodeURIComponent(location.hash.slice(1));if(!h)return;var e=document.getElementById(h);if(e&&e.tagName==='DETAILS'){e.open=true;e.scrollIntoView();}}
a();addEventListener('hashchange',a);})();
</script>`;

  return {
    caminho,
    html: pagina({
      titulo: 'Terapia capilar profissional Spa Therapy',
      descricao: `Terapia capilar para profissionais: linha Spa Therapy da Maison Visage e ${dados.protocolos.length} protocolos de cabine, Barber Therapy e home care. Conheça com a Belnic.`,
      caminho,
      corpo,
      versao,
      imagem: '/assets/img/produtos/terapia-capilar/ambiente-1.webp',
      schema: [
        { '@type': 'CollectionPage', '@id': `${site.url}${caminho}#pagina`, url: `${site.url}${caminho}`, name: 'Terapia capilar profissional Spa Therapy', inLanguage: 'pt-BR' },
        {
          '@type': 'ItemList', name: 'Protocolos de terapia capilar Spa Therapy', numberOfItems: dados.protocolos.length,
          itemListElement: dados.protocolos.map((p, n) => ({ '@type': 'ListItem', position: n + 1, name: p.nome, url: `${site.url}${caminho}#${p.slug}` })),
        },
        breadcrumb([['Início', '/'], ['Terapia capilar', caminho]]),
      ],
    }),
  };
};
