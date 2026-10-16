import { pagina, esc, icon, migalhas, breadcrumb, btnWhats } from '../layout.mjs';
import { site } from '../site.mjs';
import { gradeProdutos, imgProduto } from '../componentes.mjs';

const limpa = (s = '') => String(s).replace(/\s+/g, ' ').trim();

function corta(txt, max) {
  if (txt.length <= max) return txt;
  const c = txt.slice(0, max + 1);
  const i = c.lastIndexOf(' ');
  return c.slice(0, i > 60 ? i : max).replace(/[\s,;:.\-–(]+$/, '') + '…';
}

function descricaoMeta(p, marcaNome) {
  const base = limpa(p.descricao);
  const linha = p.linhaObj?.nome ? ` ${p.linhaObj.nome}` : '';
  if (!base) {
    const ref = limpa(p.indicacao) || limpa((p.beneficios || []).join(', '));
    const t = `${p.nome}${linha ? ` da linha${linha}` : ''}, ${marcaNome}.${ref ? ` ${ref}.` : ''} Produto profissional para salões, distribuído pela Belnic no RS.`;
    return corta(t, 158);
  }
  let t = corta(base, 150);
  if (t.length < 120) t = `${t} ${p.nome}, ${marcaNome}: venda para profissionais pela Belnic.`;
  if (t.length < 135) t = `${t} Consulte a Belnic pelo WhatsApp.`;
  return corta(t, 158);
}

function tituloPagina(p, marcaNome) {
  const sufixo = ' | Belnic Cosméticos'.length;
  const jaTemMarca = p.nome.toLowerCase().includes(marcaNome.toLowerCase().split(' ')[0]);
  const completo = jaTemMarca ? p.nome : `${p.nome} ${marcaNome}`;
  if (completo.length + sufixo <= 70) return completo;
  if (p.nome.length + sufixo <= 70) return p.nome;
  return corta(p.nome, 70 - sufixo - 1).replace(/…$/, '');
}

const escudo = '<svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M12 3 4 6v6c0 4.5 3.2 7.8 8 9 4.8-1.2 8-4.5 8-9V6l-8-3Z"/><path d="m8.5 12 2.5 2.5 4.5-5"/></svg>';
const lista = (itens) => `<ul>${itens.map((i) => `<li>${esc(i)}</li>`).join('')}</ul>`;

export default ({ dados, versao }) => {
  const protocolosPorProduto = new Map();
  for (const pr of dados.protocolos) {
    for (const s of pr.produtos) {
      if (!protocolosPorProduto.has(s)) protocolosPorProduto.set(s, []);
      protocolosPorProduto.get(s).push(pr);
    }
  }

  return dados.produtos.map((p) => {
    const m = dados.marcas[p.marca];
    const l = p.linhaObj;
    const marcaUrl = `${m.url}`;
    const linhaUrl = l ? `${m.url}#${l.slug}` : m.url;
    const trilha = [['Início', '/'], [m.nome, marcaUrl]];
    if (l) trilha.push([l.nome, linhaUrl]);
    trilha.push([p.nome, p.url]);

    const aviso = p.uso === 'home care'
      ? 'Indicado para home care, adquira com seu profissional ou salão parceiro.'
      : p.uso === 'ambos'
        ? 'Uso profissional e home care. Venda exclusiva para salões e profissionais da beleza; clientes finais adquirem com seu profissional ou salão parceiro.'
        : 'Produto de uso profissional. Venda exclusiva para salões e profissionais da beleza.';

    const chips = [...p.volumes, ...p.selos];
    const fichas = [];
    if (p.beneficios.length) fichas.push(['Benefícios', lista(p.beneficios)]);
    if (p.ativos.length) fichas.push(['Ativos', lista(p.ativos)]);
    if (p.indicacao) fichas.push(['Indicação', `<p>${esc(limpa(p.indicacao))}</p>`]);
    if (p.modo_de_uso) fichas.push(['Modo de uso', `<p>${esc(limpa(p.modo_de_uso))}</p>`]);
    if (p.tons?.length) fichas.push([`Tons disponíveis (${p.tons.length})`, lista(p.tons)]);

    const protocolos = protocolosPorProduto.get(p.slug) || [];
    const irmaos = (l?.produtos || []).filter((x) => x.slug !== p.slug);
    // vizinhos na lista da linha, para variar a seleção entre páginas
    const idx = (l?.produtos || []).findIndex((x) => x.slug === p.slug);
    const outros = [...irmaos.slice(Math.max(idx, 0)), ...irmaos.slice(0, Math.max(idx, 0))].slice(0, 4);

    const corpo = `
<section class="cabecalho-pagina" style="padding-bottom:0">
  <div class="container">${migalhas(trilha)}</div>
</section>

<div class="container pdp">
  <div>
    <div class="pdp__galeria">${imgProduto(p, { lazy: false, tamanho: '(min-width:900px) 45vw, 100vw' })}</div>
    ${p.imgDaLinha ? '<p class="pdp__legenda">Imagem ilustrativa da linha.</p>' : ''}
  </div>
  <div>
    <p class="pdp__marca"><a href="${marcaUrl}" style="color:inherit;text-decoration:none">${esc(m.nome)}</a>${l ? ` · <a href="${linhaUrl}" style="color:inherit;text-decoration:none">${esc(l.nome)}</a>` : ''}</p>
    <h1>${esc(p.nome)}</h1>
    ${p.nomeAlternativo ? `<p class="pdp__sub">${esc(p.nomeAlternativo)}</p>` : ''}
    ${chips.length ? `<ul class="chips">${chips.map((c) => `<li>${esc(c)}</li>`).join('')}</ul>` : ''}
    ${p.descricao ? `<p>${esc(limpa(p.descricao))}</p>` : ''}
    <div class="aviso-pro">${escudo}<p style="margin:0">${esc(aviso)}</p></div>
    <div class="botoes">
      ${btnWhats('Pedir informações pelo WhatsApp', `Olá! Tenho interesse no produto ${p.nome} (${m.nome}). Pode me passar mais informações?`)}
    </div>
    ${fichas.length ? `<div class="ficha" style="margin-top:32px">${fichas.map(([t, h], n) => `<details${n === 0 ? ' open' : ''}><summary>${esc(t)}</summary><div>${h}</div></details>`).join('')}</div>` : ''}
    ${protocolos.length ? `
    <div style="margin-top:32px">
      <h2 style="font-size:1.4rem">Usado nos protocolos</h2>
      <ul class="protocolos-lista">${protocolos.map((pr) => `<li><a href="/terapia-capilar/#${esc(pr.slug)}">${esc(pr.nome)}</a></li>`).join('')}</ul>
    </div>` : ''}
  </div>
</div>

${outros.length ? `
<section class="secao secao--branca">
  <div class="container">
    <div class="cabeca"><span class="sobretitulo">Mais da linha</span><h2>Outros produtos ${esc(l.nome)}</h2></div>
    ${gradeProdutos(outros)}
    <p style="margin-top:24px"><a class="link-seta" href="${linhaUrl}">Ver a linha ${esc(l.nome)} completa ${icon.arrow}</a></p>
  </div>
</section>` : ''}`;

    const url = `${site.url}${p.url}`;
    const produtoSchema = {
      '@type': 'Product', '@id': `${url}#produto`, name: p.nome, url,
      description: limpa(p.descricao) || descricaoMeta(p, m.nome),
      brand: { '@type': 'Brand', name: m.nome },
      category: p.categoria,
    };
    if (p.img) produtoSchema.image = [`${site.url}${p.img}`];

    return {
      caminho: p.url,
      html: pagina({
        titulo: tituloPagina(p, m.nome),
        descricao: descricaoMeta(p, m.nome),
        caminho: p.url,
        corpo,
        versao,
        imagem: p.img || undefined,
        tipo: 'product',
        schema: [produtoSchema, breadcrumb(trilha)],
      }),
    };
  });
};
