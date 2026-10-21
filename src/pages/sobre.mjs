import { pagina, icon, migalhas, btnWhats } from '../layout.mjs';
import { site } from '../site.mjs';
import { faixaCTA } from '../componentes.mjs';
import { breadcrumb } from '../layout.mjs';

export default ({ versao }) => {
  const caminho = '/sobre/';
  const corpo = `
<section class="cabecalho-pagina"><div class="container">
  ${migalhas([['Início', '/'], ['Sobre a Belnic', caminho]])}
  <span class="sobretitulo">Hub da Beleza</span>
  <h1>Belnic: distribuidora oficial Maison Visage e Mirra Professional</h1>
  <p class="lead">Produtos, formação e suporte para salões crescerem. A Belnic conecta profissionais da beleza do Rio Grande do Sul a duas marcas profissionais e a quem sabe usá-las bem.</p>
</div></section>

<section class="secao secao--branca">
  <div class="container dividido">
    <div class="revela">
      <span class="sobretitulo">Quem somos</span>
      <h2>Um parceiro de verdade para o seu salão</h2>
      <p>A Belnic Cosméticos é distribuidora oficial das marcas <a href="/marcas/maison-visage/">Maison Visage</a> e <a href="/marcas/mirra-professional/">Mirra Professional</a> em ${site.cidades.length} cidades do Rio Grande do Sul. Vendemos para quem vive da beleza: salões, cabeleireiros, terapeutas capilares, barbearias e clínicas estéticas.</p>
      <p>Nosso trabalho não termina na entrega. Você recebe orientação de uso, apoio para montar protocolos e acesso a treinamentos com educadores das marcas, para transformar produto em resultado na cadeira e em faturamento.</p>
    </div>
    <ul class="lista-check revela" style="margin-top:24px">
      <li>Distribuição oficial das duas marcas</li>
      <li>Representantes que conhecem a sua região</li>
      <li>Formação presencial e em vídeo</li>
      <li>Atendimento direto pelo WhatsApp</li>
    </ul>
  </div>
</section>

<section class="secao">
  <div class="container">
    <div class="cabeca revela">
      <span class="sobretitulo">Como funciona</span>
      <h2>Atendimento de perto, por região</h2>
      <p class="lead">Nossa equipe de representantes atende salões e clínicas de cada região, com contato direto e sem burocracia.</p>
    </div>
    <div class="grade grade--3">
      <article class="cartao revela"><span class="numero">01</span><h3>Representantes</h3><p>Carina Lampert, Gisele Menezes e Cleidi Chagas acompanham os parceiros, apresentam as linhas e ajudam em cada pedido.</p></article>
      <article class="cartao revela"><span class="numero">02</span><h3>Educadores</h3><p>Profissionais como Daiane Carneiro e Pedro Pinheiro conduzem imersões, workshops e treinamentos sobre terapia capilar, colorimetria e técnicas.</p></article>
      <article class="cartao revela"><span class="numero">03</span><h3>Suporte no WhatsApp</h3><p>Dúvidas de uso, de protocolo ou de pedido são resolvidas pelo canal que você já usa no dia a dia.</p></article>
    </div>
    <p style="margin-top:28px"><a class="link-seta" href="/onde-atendemos/">Veja onde atendemos ${icon.arrow}</a></p>
  </div>
</section>

<section class="secao secao--areia">
  <div class="container">
    <div class="cabeca revela">
      <span class="sobretitulo">As marcas</span>
      <h2>Duas marcas profissionais, complementares</h2>
    </div>
    <div class="grade grade--2">
      <article class="cartao revela">
        <h3>Maison Visage</h3>
        <p>Marca de cosméticos profissionais desde 2000, com laboratórios próprios. Reúne finalizadores, linhas de tratamento capilar e a linha Spa Therapy para terapia capilar e cuidado do couro cabeludo.</p>
        <a class="link-seta" href="/marcas/maison-visage/">Conhecer Maison Visage ${icon.arrow}</a>
      </article>
      <article class="cartao revela">
        <h3>Mirra Professional</h3>
        <p>Há mais de 25 anos em cuidados pessoais, a Mirra Professional atende o salão com tratamento, coloração, alisamento e finalização.</p>
        <a class="link-seta" href="/marcas/mirra-professional/">Conhecer Mirra Professional ${icon.arrow}</a>
      </article>
    </div>
  </div>
</section>

<section class="secao">
  <div class="container">
    <div class="cabeca revela"><span class="sobretitulo">Valores</span><h2>No que acreditamos</h2></div>
    <div class="grade grade--3">
      <article class="cartao revela"><h3>Conhecimento primeiro</h3><p>Quem domina a técnica vende melhor e fideliza mais. Por isso formação faz parte do nosso serviço.</p></article>
      <article class="cartao revela"><h3>Proximidade</h3><p>Relação direta com cada parceiro, com resposta rápida e linguagem clara.</p></article>
      <article class="cartao revela"><h3>Crescimento compartilhado</h3><p>Seu salão crescendo é o nosso melhor resultado. Trabalhamos com você, não apenas para você.</p></article>
    </div>
    <div class="botoes" style="margin-top:32px">
      ${btnWhats('Falar com a Belnic', 'Olá! Vim pelo site e gostaria de conhecer melhor a Belnic.')}
      <a class="btn btn--contorno" href="/seja-parceiro/">Seja parceiro ${icon.arrow}</a>
    </div>
  </div>
</section>

${faixaCTA()}`;

  return {
    caminho,
    html: pagina({
      titulo: 'Sobre a Belnic | Distribuidora Maison Visage e Mirra',
      descricao: 'Conheça a Belnic, distribuidora oficial Maison Visage e Mirra Professional em Porto Alegre e região: produtos, formação e suporte para salões crescerem.',
      caminho, corpo, versao,
      schema: [
        { '@type': 'AboutPage', '@id': `${site.url}${caminho}#pagina`, url: `${site.url}${caminho}`, name: 'Sobre a Belnic Cosméticos', inLanguage: 'pt-BR', about: { '@id': `${site.url}/#organizacao` } },
        breadcrumb([['Início', '/'], ['Sobre a Belnic', caminho]]),
      ],
    }),
  };
};
