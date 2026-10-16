import { pagina, esc, icon, simbolo, migalhas, breadcrumb, btnWhats } from '../layout.mjs';
import { site } from '../site.mjs';
import { gradeProdutos, faixaCTA } from '../componentes.mjs';

const info = {
  'maison-visage': {
    titulo: 'Maison Visage: cosméticos capilares profissionais',
    desc: 'Conheça a Maison Visage, marca profissional desde 2000: finalizadores Touch, Le Bain, Luxury Nanotherapy, Nano Force e Spa Therapy. Distribuição Belnic no RS.',
    h1: 'Maison Visage',
    sobre: 'Cosmética profissional de alta performance desde 2000',
    lead: 'A Maison Visage Cosmetique cria produtos capilares profissionais com fragrâncias selecionadas e um “blend sensorial” que une aroma, bem-estar e resultado. Do tratamento à finalização, passando pela terapia capilar Spa Therapy, é uma marca pensada para o dia a dia do profissional.',
    pontos: [
      'Marca desde 2000, reconhecida por formulações otimizadas',
      'Fragrâncias selecionadas inspiradas na aromaterapia e no sul da França',
      '100% vegana, Cruelty Free e com o selo internacional PETA',
      'Linhas de finalização, tratamento, home care e terapia capilar',
    ],
    selos: ['Vegana', 'Cruelty Free', 'Selo PETA'],
    img: '/assets/img/produtos/maison-visage/ambiente-1.webp',
    pdf: '/catalogos/catalogo-maison-visage.pdf',
    pdfNome: 'Catálogo Maison Visage',
    cat: 'produtos de cabelo e couro cabeludo',
  },
  'mirra-professional': {
    titulo: 'Mirra Professional: tratamento, cor e barbearia',
    desc: 'Mirra Professional há mais de 25 anos: Elements, BioRestore, coloração Trend Colors, Theraplex, MS Curls e Hombre Barbearia. Distribuição oficial Belnic no RS.',
    h1: 'Mirra Professional',
    sobre: 'Há mais de 25 anos apaixonada por cuidados pessoais',
    lead: 'A Mirra Professional se preocupa com a beleza, a autoestima e as necessidades diárias, com produtos de alta qualidade e precisão para a rotina do salão. Preza o toque pessoal, e ser parceiro Mirra é mais do que uma parceria: é fazer parte da família.',
    pontos: [
      'Mais de 25 anos de história em cuidados pessoais',
      'Tratamento, coloração, alisamento, cachos e finalização',
      'Coloração profissional Trend Colors com vasta cartela de tons',
      'Linha Hombre para barbearias',
    ],
    selos: ['Tratamento', 'Coloração', 'Barbearia'],
    img: '/assets/img/produtos/mirra/ambiente-1.webp',
    pdf: '/catalogos/catalogo-mirra-professional.pdf',
    pdfNome: 'Catálogo Mirra Professional',
    cat: 'produtos de tratamento, cor e finalização',
  },
};

export default ({ dados, versao }) =>
  Object.keys(info).map((slug) => {
    const m = dados.marcas[slug];
    const i = info[slug];
    const caminho = m.url;
    const linhas = dados.linhas.filter((l) => l.marca === slug && l.produtos.length);
    const total = dados.produtos.filter((p) => p.marca === slug);

    const secoes = linhas.map((l) => `
<section class="secao linha-secao ${linhas.indexOf(l) % 2 ? 'secao--branca' : ''}" id="${esc(l.slug)}">
  <div class="container">
    <div class="linha-topo ${l.img ? '' : 'linha-topo--sem-img'}">
      <div class="revela">
        <span class="sobretitulo">${l.produtos.length} ${l.produtos.length === 1 ? 'produto' : 'produtos'}</span>
        <h2>${esc(l.nome)}</h2>
        ${l.descricao ? `<p class="lead">${esc(l.descricao)}</p>` : ''}
      </div>
      ${l.img ? `<div class="linha-topo__img revela"><img src="${l.img}" alt="Linha ${esc(l.nome)} ${esc(m.nome)}" width="800" height="600" loading="lazy" decoding="async"></div>` : ''}
    </div>
    ${gradeProdutos(l.produtos)}
  </div>
</section>`).join('');

    const corpo = `
<section class="cabecalho-pagina">
  <div class="container">
    ${migalhas([['Início', '/'], [m.nome, caminho]])}
    <div class="dividido" style="margin-top:18px">
      <div>
        <span class="sobretitulo">${esc(i.sobre)}</span>
        <h1>${esc(i.h1)}</h1>
        <p class="lead">${esc(i.lead)}</p>
        <ul class="lista-check" style="margin:22px 0 26px">${i.pontos.map((x) => `<li>${esc(x)}</li>`).join('')}</ul>
        <div class="botoes">
          <a class="btn btn--primario" href="${i.pdf}" download>${icon.download}<span>Baixar catálogo (PDF, cerca de 35 MB)</span></a>
          ${btnWhats('Falar sobre a marca', `Olá! Quero conhecer a linha ${m.nome} para o meu negócio.`, 'btn btn--contorno')}
        </div>
      </div>
      <div class="hero__visual" style="margin-top:28px"><img src="${i.img}" alt="Produtos ${esc(m.nome)}" width="900" height="1125" fetchpriority="high"></div>
    </div>
  </div>
</section>

<section class="secao secao--areia" style="padding-block:28px">
  <div class="container">
    <p class="sobretitulo" style="margin-bottom:12px">Linhas ${esc(m.nome)}</p>
    <nav class="filtros" style="margin-bottom:0" aria-label="Linhas da marca">
      ${linhas.map((l) => `<a class="filtro" href="#${esc(l.slug)}">${esc(l.nome)}</a>`).join('')}
    </nav>
  </div>
</section>
${secoes}

<section class="secao secao--areia">
  <div class="container dividido">
    <div class="revela">
      <span class="sobretitulo">Catálogo completo</span>
      <h2>Leve o catálogo ${esc(m.nome)} com você</h2>
      <p class="lead">Navegar pelo site é mais leve, mas o PDF reúne todas as linhas em um só arquivo para consultar e compartilhar com a sua equipe.</p>
    </div>
    <div class="botoes revela" style="margin-top:20px">
      <a class="btn btn--primario" href="${i.pdf}" download>${icon.download}<span>Baixar ${esc(i.pdfNome)} (PDF, cerca de 35 MB)</span></a>
      <a class="btn btn--contorno" href="/produtos/?marca=${slug}">Ver todos os ${total.length} produtos ${icon.arrow}</a>
    </div>
  </div>
</section>

${faixaCTA({ titulo: `Quer trabalhar com ${m.nome}?`, texto: 'Fale com a nossa equipe pelo WhatsApp. Apresentamos as linhas, condições para profissionais e treinamentos.', msg: `Olá! Quero ser parceiro(a) Belnic e trabalhar com ${m.nome}.` })}`;

    const url = `${site.url}${caminho}`;
    return {
      caminho,
      html: pagina({
        titulo: i.titulo,
        descricao: i.desc,
        caminho,
        corpo,
        versao,
        imagem: i.img,
        schema: [
          {
            '@type': 'Brand', '@id': `${url}#marca`, name: m.nome, url,
            description: i.lead,
          },
          {
            '@type': 'ItemList', name: `Produtos ${m.nome}`, numberOfItems: total.length,
            itemListElement: total.map((p, n) => ({ '@type': 'ListItem', position: n + 1, url: `${site.url}${p.url}`, name: p.nome })),
          },
          breadcrumb([['Início', '/'], [m.nome, caminho]]),
        ],
      }),
    };
  });
