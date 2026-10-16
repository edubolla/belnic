import { pagina, icon, migalhas, breadcrumb, btnWhats } from '../layout.mjs';

export default ({ versao }) => {
  const caminho = '/sou-consumidor-final/';
  const corpo = `
<section class="cabecalho-pagina"><div class="container">
  ${migalhas([['Início', '/'], ['Sou consumidor final', caminho]])}
  <span class="sobretitulo">Consumidor final</span>
  <h1>Quer usar Maison Visage ou Mirra? Encontre um salão parceiro</h1>
  <p class="lead">A Belnic vende para profissionais da beleza. Para você, cliente final, indicamos o salão parceiro mais próximo da sua cidade.</p>
</div></section>

<section class="secao secao--branca">
  <div class="container">
    <div class="grade grade--3">
      <article class="cartao revela"><span class="numero">01</span><h3>Chame no WhatsApp</h3><p>Diga em qual cidade você mora e o que está procurando.</p></article>
      <article class="cartao revela"><span class="numero">02</span><h3>Receba a indicação</h3><p>Informamos o salão parceiro mais perto de você.</p></article>
      <article class="cartao revela"><span class="numero">03</span><h3>Agende seu atendimento</h3><p>Converse com o profissional sobre o tratamento ideal para você.</p></article>
    </div>
    <div class="botoes" style="margin-top:32px">
      ${btnWhats('Pedir indicação de salão', 'Olá! Sou cliente final e gostaria de saber qual salão parceiro Belnic fica mais perto de mim. Minha cidade é: ')}
      <a class="btn btn--contorno" href="/onde-atendemos/">Ver cidades atendidas ${icon.arrow}</a>
    </div>
  </div>
</section>

<section class="secao">
  <div class="container">
    <div class="cabeca revela"><span class="sobretitulo">Conheça as marcas</span><h2>O que os salões parceiros usam</h2></div>
    <div class="grade grade--2">
      <a class="cartao revela" href="/marcas/maison-visage/"><h3>Maison Visage</h3><p>Tratamento capilar, finalizadores e terapia capilar profissional.</p><span class="link-seta">Ver a marca ${icon.arrow}</span></a>
      <a class="cartao revela" href="/marcas/mirra-professional/"><h3>Mirra Professional</h3><p>Tratamento, coloração, alisamento e finalização.</p><span class="link-seta">Ver a marca ${icon.arrow}</span></a>
    </div>
    <p style="margin-top:28px">É profissional da beleza? <a href="/seja-parceiro/">Seja parceiro Belnic</a>.</p>
  </div>
</section>`;
  return {
    caminho,
    html: pagina({
      titulo: 'Sou consumidor final | Salão parceiro Belnic',
      descricao: 'Cliente final? A Belnic vende para profissionais, mas indica o salão parceiro mais próximo da sua cidade que trabalha com Maison Visage e Mirra Professional.',
      caminho, corpo, versao,
      schema: [breadcrumb([['Início', '/'], ['Sou consumidor final', caminho]])],
    }),
  };
};
