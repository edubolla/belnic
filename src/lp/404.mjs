import { pagina, icon, btnWhats } from '../layout.mjs';

export default ({ versao }) => ({
  caminho: '/404/',
  arquivo: '404.html',
  noindex: true,
  html: pagina({
    titulo: 'Página não encontrada',
    descricao: 'A página que você procura não existe ou mudou de endereço.',
    caminho: '/404/',
    noindex: true,
    versao,
    corpo: `
<section class="secao">
  <div class="container cabeca">
    <span class="sobretitulo">Erro 404</span>
    <h1>Esta página mudou de lugar</h1>
    <p class="lead">O site da Belnic foi renovado. Tudo o que você precisa está na página inicial.</p>
    <div class="botoes" style="margin-top:24px">
      <a class="btn btn--primario" href="/">Ir para o início ${icon.arrow}</a>
      ${btnWhats('Falar no WhatsApp', 'Olá! Não encontrei uma página no site da Belnic.', 'btn btn--contorno')}
    </div>
  </div>
</section>`,
  }),
});
