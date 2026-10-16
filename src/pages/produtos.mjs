import { pagina, esc, icon, migalhas, breadcrumb } from '../layout.mjs';
import { site, wa } from '../site.mjs';
import { gradeProdutos, faixaCTA, tokensProduto } from '../componentes.mjs';

const filtros = [
  ['todos', 'Todos'],
  ['maison-visage', 'Maison Visage'],
  ['mirra-professional', 'Mirra Professional'],
  ['terapia-capilar', 'Terapia capilar'],
  ['coloracao', 'Coloração'],
  ['finalizacao', 'Finalização'],
  ['cachos', 'Cachos'],
  ['barbearia', 'Barbearia'],
  ['home-care', 'Home care'],
];

export default ({ dados, versao }) => {
  const lista = dados.produtos;
  const usados = new Set(lista.flatMap((p) => tokensProduto(p).split(' ')));
  const botoes = filtros.filter(([v]) => v === 'todos' || usados.has(v));
  const caminho = '/produtos/';
  const corpo = `
<section class="cabecalho-pagina">
  <div class="container">
    ${migalhas([['Início', '/'], ['Produtos', caminho]])}
    <span class="sobretitulo" style="margin-top:18px">Maison Visage e Mirra Professional</span>
    <h1>Produtos profissionais para cabelo e couro cabeludo</h1>
    <p class="lead">${lista.length} produtos para salões, barbearias, terapeutas capilares e profissionais da beleza. Busque por nome, linha ou ativo. Valores e condições, consulte nossa equipe no WhatsApp.</p>
  </div>
</section>

<section class="secao" style="padding-top:8px">
  <div class="container">
    <label class="sr" for="busca-produtos">Buscar produto</label>
    <input class="busca" id="busca-produtos" type="search" data-busca placeholder="Buscar produto, linha ou ativo" autocomplete="off">
    <div class="filtros" role="group" aria-label="Filtrar produtos">
      ${botoes.map(([v, n]) => `<button class="filtro" type="button" data-filtrar="${v}" aria-pressed="${v === 'todos'}">${n}</button>`).join('')}
    </div>
    ${gradeProdutos(lista, 'data-produtos')}
    <p data-vazio hidden style="text-align:center;padding:40px 0">Não encontramos nenhum produto com essa busca. <a href="${wa('Olá! Não encontrei um produto no site da Belnic. Pode me ajudar?')}" target="_blank" rel="noopener" data-evento="whatsapp">Fale com a gente no WhatsApp</a> e ajudamos você a encontrar.</p>
  </div>
</section>

<section class="secao secao--areia">
  <div class="container dividido">
    <div class="revela">
      <span class="sobretitulo">Catálogos em PDF</span>
      <h2>Prefere consultar tudo em um arquivo?</h2>
      <p class="lead">Baixe os catálogos completos das marcas. Navegar pelo site é mais leve no celular, e o PDF é ideal para consultar e compartilhar com a equipe.</p>
    </div>
    <div class="botoes revela" style="margin-top:20px"><a class="btn btn--primario" href="/catalogos/">${icon.download}<span>Ver catálogos em PDF</span></a></div>
  </div>
</section>

${faixaCTA({ titulo: 'Não achou o que procurava?', texto: 'Nossa equipe ajuda você a escolher produtos, montar protocolos e consultar condições para profissionais.', msg: 'Olá! Vim pelo site da Belnic e preciso de ajuda para escolher produtos.' })}`;

  return {
    caminho,
    html: pagina({
      titulo: 'Produtos profissionais Maison Visage e Mirra',
      descricao: `Veja os ${lista.length} produtos profissionais Maison Visage e Mirra Professional para cabelo e couro cabeludo. Venda exclusiva para salões e profissionais, via Belnic.`,
      caminho,
      corpo,
      versao,
      schema: [
        { '@type': 'CollectionPage', '@id': `${site.url}${caminho}#colecao`, url: `${site.url}${caminho}`, name: 'Produtos profissionais Maison Visage e Mirra Professional', inLanguage: 'pt-BR', isPartOf: { '@id': `${site.url}/#site` } },
        {
          '@type': 'ItemList', name: 'Produtos Belnic', numberOfItems: lista.length,
          itemListElement: lista.map((p, n) => ({ '@type': 'ListItem', position: n + 1, url: `${site.url}${p.url}`, name: p.nome })),
        },
        breadcrumb([['Início', '/'], ['Produtos', caminho]]),
      ],
    }),
  };
};
