import { pagina, esc, icon, migalhas, breadcrumb } from '../layout.mjs';
import { site } from '../site.mjs';
import { faixaCTA } from '../componentes.mjs';

export default ({ dados, versao }) => {
  const caminho = '/catalogos/';
  const n = {
    mv: dados.produtos.filter((p) => p.marca === 'maison-visage').length,
    mirra: dados.produtos.filter((p) => p.marca === 'mirra-professional').length,
    spa: dados.produtos.filter((p) => p.linhaObj?.area === 'spa-capilar').length,
  };
  const cats = [
    { titulo: 'Maison Visage', img: '/assets/img/produtos/maison-visage/ambiente-2.webp', arq: '/catalogos/catalogo-maison-visage.pdf', ver: '/marcas/maison-visage/', qtd: n.mv, texto: 'Finalizadores Touch, Le Bain, Luxury Nanotherapy, Nano Force, home care e Spa Therapy.' },
    { titulo: 'Mirra Professional', img: '/assets/img/produtos/mirra/ambiente-2.webp', arq: '/catalogos/catalogo-mirra-professional.pdf', ver: '/marcas/mirra-professional/', qtd: n.mirra, texto: 'Elements, BioRestore, coloração Trend Colors, Theraplex, MS Curls e mais.' },
    { titulo: 'Terapia Capilar Spa Therapy', img: '/assets/img/produtos/terapia-capilar/ambiente-1.webp', arq: '/catalogos/catalogo-terapia-capilar-spa-therapy.pdf', ver: '/terapia-capilar/', qtd: n.spa, texto: 'Óleos essenciais, argilas, vitaminas, tônicos e os protocolos de cabine, Barber Therapy e home care.' },
  ];
  const corpo = `
<section class="cabecalho-pagina">
  <div class="container">
    ${migalhas([['Início', '/'], ['Catálogos', caminho]])}
    <span class="sobretitulo" style="margin-top:18px">Para profissionais</span>
    <h1>Catálogos em PDF</h1>
    <p class="lead">Baixe os catálogos completos das marcas para consultar e compartilhar com a sua equipe. Navegar pelo site é mais leve, principalmente no celular, e os arquivos em PDF são pesados (cerca de 35 MB cada). Os catálogos não trazem preços: valores e condições pelo WhatsApp.</p>
  </div>
</section>

<section class="secao" style="padding-top:8px">
  <div class="container">
    <div class="grade grade--3">
      ${cats.map((c) => `
      <article class="catalogo-card revela">
        <div class="catalogo-card__img"><img src="${c.img}" alt="Ambiente ${esc(c.titulo)}" width="1200" height="900" loading="lazy" decoding="async"></div>
        <div class="catalogo-card__corpo">
          <h2>${esc(c.titulo)}</h2>
          <p>${esc(c.texto)}</p>
          <p><strong>${c.qtd} produtos</strong> no site</p>
          <div class="catalogo-card__acoes">
            <a class="btn btn--primario" href="${c.arq}" download>${icon.download}<span>Baixar PDF (cerca de 35 MB)</span></a>
            <a class="link-seta" href="${c.ver}">Ver produtos no site ${icon.arrow}</a>
          </div>
        </div>
      </article>`).join('')}
    </div>
  </div>
</section>

${faixaCTA({ titulo: 'Precisa de ajuda para escolher?', texto: 'Nossa equipe indica as linhas ideais para o seu negócio e passa valores e condições para profissionais.', msg: 'Olá! Baixei os catálogos da Belnic e gostaria de ajuda para escolher os produtos.' })}`;

  return {
    caminho,
    html: pagina({
      titulo: 'Catálogos Maison Visage e Mirra Professional em PDF',
      descricao: 'Baixe os catálogos em PDF da Maison Visage, da Mirra Professional e da Terapia Capilar Spa Therapy. Material para profissionais, distribuído pela Belnic.',
      caminho,
      corpo,
      versao,
      imagem: cats[0].img,
      schema: [
        { '@type': 'CollectionPage', url: `${site.url}${caminho}`, name: 'Catálogos em PDF', inLanguage: 'pt-BR' },
        breadcrumb([['Início', '/'], ['Catálogos', caminho]]),
      ],
    }),
  };
};
