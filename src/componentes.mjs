// Blocos reutilizados entre páginas.
import { esc, simbolo, icon, btnWhats } from './layout.mjs';
import { marcas } from './dados.mjs';
import { site } from './site.mjs';

export const imgProduto = (p, { lazy = true, tamanho = '(min-width:1024px) 25vw, 50vw' } = {}) =>
  p.img
    ? `<img src="${p.img}" alt="${esc(p.nome)} — ${esc(marcas[p.marca].nome)}" width="800" height="1000" ${lazy ? 'loading="lazy" decoding="async"' : 'fetchpriority="high"'} sizes="${tamanho}">`
    : `<span class="simbolo-vazio" aria-hidden="true">${simbolo}</span>`;

// Tokens usados pelo filtro de /produtos/ (main.js compara com data-filtrar).
const LINHAS_SPA = ['spa-therapy', 'home-spa-therapy'];
export const tokensProduto = (p) => {
  const t = [p.marca, p.catalogo, p.linha || ''];
  const area = p.linhaObj?.area;
  if (LINHAS_SPA.includes(p.linha) || area === 'spa-capilar') t.push('terapia-capilar', 'spa-therapy', 'terapia');
  if (area === 'coloracao') t.push('coloracao');
  if (area === 'finalizacao' || ['touch-finishers', 'hair-mist', 'beach-intensive', 'vegan-oil'].includes(p.linha)) t.push('finalizacao');
  if (p.linha === 'hombre-barbearia') t.push('barbearia');
  if (['ms-curls', 'miss-curls'].includes(p.linha) || /cachos|curls/i.test(p.nome)) t.push('cachos');
  if (p.uso === 'home care' || p.uso === 'ambos' || p.linha === 'home-spa-therapy' || p.linha === 'linha-profissional-home-care') t.push('home-care');
  return [...new Set(t.filter(Boolean))].join(' ');
};

export const cartaoProduto = (p) => `
<a class="produto" href="${p.url}" data-filtro="${esc(tokensProduto(p))}">
  <div class="produto__img">${imgProduto(p)}</div>
  <div class="produto__info">
    <span class="produto__linha">${esc(p.linhaObj?.nome || marcas[p.marca].nome)}</span>
    <span class="produto__nome">${esc(p.nome)}</span>
    ${p.volumes.length ? `<span class="produto__vol">${esc(p.volumes.join(' · '))}</span>` : ''}
    <span hidden>${esc([marcas[p.marca].nome, p.nomeAlternativo, p.categoria, ...(p.ativos || [])].filter(Boolean).join(' '))}</span>
  </div>
</a>`;

export const gradeProdutos = (lista, attrs = '') => `<div class="produtos"${attrs ? ' ' + attrs : ''}>${lista.map(cartaoProduto).join('')}</div>`;

export const faixaCTA = ({
  titulo = 'Leve as marcas da Belnic para o seu salão ou clínica',
  texto = 'Fale com a nossa equipe pelo WhatsApp. Ajudamos você a escolher os produtos, montar protocolos e capacitar sua equipe.',
  msg = 'Olá! Vim pelo site e quero ser parceiro(a) Belnic.',
} = {}) => `
<section class="secao">
  <div class="container">
    <div class="cta revela">
      <span class="cta__folha" aria-hidden="true">${simbolo}</span>
      <span class="sobretitulo" style="color:var(--areia)">Seja parceiro Belnic</span>
      <h2>${esc(titulo)}</h2>
      <p>${esc(texto)}</p>
      <div class="botoes" style="margin-top:24px">
        ${btnWhats('Falar com um consultor', msg, 'btn btn--claro')}
        <a class="btn btn--contorno" style="color:#fff" href="/seja-parceiro/">Cadastro de parceiro ${icon.arrow}</a>
      </div>
    </div>
  </div>
</section>`;

export const faqHtml = (itens) => `
<div class="ficha faq">
  ${itens.map(([p, r]) => `<details><summary>${esc(p)}</summary><div><p>${r}</p></div></details>`).join('')}
</div>`;

export const faqSchema = (itens) => ({
  '@type': 'FAQPage',
  mainEntity: itens.map(([p, r]) => ({
    '@type': 'Question', name: p,
    acceptedAnswer: { '@type': 'Answer', text: r.replace(/<[^>]+>/g, '') },
  })),
});

// Formulário "Seja parceiro": não envia dados a servidor, abre o WhatsApp com a mensagem pronta (main.js).
const perfis = ['Salão de beleza', 'Clínica de estética', 'Profissional autônomo(a)', 'Terapeuta capilar', 'Barbearia', 'Outro'];
const interesses = ['Maison Visage', 'Mirra Professional', 'Terapia Capilar', 'Cursos e formação', 'Ainda não sei'];

export const formParceiro = () => `
      <form class="form form--2" data-form-whats="${site.whatsapp}">
        <div class="campo"><label for="nome">Seu nome *</label><input id="nome" name="nome" type="text" required autocomplete="name"></div>
        <div class="campo"><label for="perfil">Seu perfil</label><select id="perfil" name="perfil">${perfis.map((p) => `<option>${esc(p)}</option>`).join('')}</select></div>
        <div class="campo"><label for="negocio">Nome do salão ou clínica</label><input id="negocio" name="negocio" type="text" autocomplete="organization"></div>
        <div class="campo"><label for="cidade">Cidade *</label><input id="cidade" name="cidade" type="text" list="cidades" required autocomplete="off"><datalist id="cidades">${site.cidades.map((c) => `<option value="${esc(c)}">`).join('')}</datalist></div>
        <div class="campo"><label for="interesse">O que mais interessa</label><select id="interesse" name="interesse">${interesses.map((p) => `<option>${esc(p)}</option>`).join('')}</select></div>
        <div class="campo campo--cheio"><label for="mensagem">Mensagem</label><textarea id="mensagem" name="mensagem"></textarea></div>
        <div class="campo--cheio"><button class="btn btn--primario" type="submit">${icon.whatsapp}<span>Enviar pelo WhatsApp</span></button></div>
        <p class="form__nota campo--cheio">Não guardamos seus dados: ao enviar, abrimos o WhatsApp com a mensagem pronta para você conferir e mandar.</p>
      </form>`;
