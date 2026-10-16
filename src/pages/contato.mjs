import { pagina, icon, migalhas, breadcrumb, btnWhats } from '../layout.mjs';
import { site, wa } from '../site.mjs';

export default ({ versao }) => {
  const caminho = '/contato/';
  const corpo = `
<section class="cabecalho-pagina"><div class="container">
  ${migalhas([['Início', '/'], ['Contato', caminho]])}
  <span class="sobretitulo">Fale com a Belnic</span>
  <h1>Contato Belnic Cosméticos</h1>
  <p class="lead">O jeito mais rápido de falar com a gente é pelo WhatsApp. Também respondemos por e-mail e pelas redes sociais.</p>
</div></section>

<section class="secao secao--branca">
  <div class="container">
    <div class="grade grade--3">
      <article class="cartao revela"><h3>WhatsApp</h3><p>${site.whatsappExibicao}</p><a class="btn btn--primario" href="${wa()}" target="_blank" rel="noopener" data-evento="whatsapp">${icon.whatsapp}<span>Chamar agora</span></a></article>
      <article class="cartao revela"><h3>E-mail</h3><p><a href="mailto:${site.email}">${site.email}</a></p></article>
      <article class="cartao revela"><h3>Redes sociais</h3><p><a href="${site.instagram}" target="_blank" rel="noopener">Instagram ${site.instagramUser}</a><br><a href="${site.facebook}" target="_blank" rel="noopener">Facebook Belnic Cosméticos</a></p></article>
    </div>
  </div>
</section>

<section class="secao">
  <div class="container">
    <div class="cabeca revela"><span class="sobretitulo">Com quem falar</span><h2>Escolha o assunto</h2></div>
    <div class="grade grade--3">
      <article class="cartao revela"><h3>Pedidos e parcerias</h3><p>Para comprar ou se tornar parceiro, chame no WhatsApp ou use o <a href="/seja-parceiro/">cadastro de parceiro</a>.</p>${btnWhats('Falar sobre pedidos', 'Olá! Quero produtos exclusivos para o meu salão.', 'btn btn--contorno')}</article>
      <article class="cartao revela"><h3>Cursos e formação</h3><p>Datas, turmas e treinamentos gravados. Veja a página de <a href="/formacao/">formação</a>.</p>${btnWhats('Falar sobre cursos', 'Oi, gostaria de mais informações sobre os Cursos.', 'btn btn--contorno')}</article>
      <article class="cartao revela"><h3>Consumidor final</h3><p>Quer encontrar um salão que usa nossos produtos? Veja <a href="/sou-consumidor-final/">como funciona</a>.</p>${btnWhats('Achar um salão', 'Olá! Sou cliente final e gostaria de saber qual salão parceiro Belnic fica mais perto de mim. Minha cidade é: ', 'btn btn--contorno')}</article>
    </div>
  </div>
</section>`;
  return {
    caminho,
    html: pagina({
      titulo: 'Contato | Belnic Cosméticos',
      descricao: 'Fale com a Belnic Cosméticos pelo WhatsApp, e-mail ou redes sociais: pedidos, parcerias, cursos e indicação de salão parceiro em Porto Alegre e região.',
      caminho, corpo, versao,
      schema: [
        { '@type': 'ContactPage', '@id': `${site.url}${caminho}#pagina`, url: `${site.url}${caminho}`, name: 'Contato Belnic Cosméticos', inLanguage: 'pt-BR', about: { '@id': `${site.url}/#organizacao` } },
        breadcrumb([['Início', '/'], ['Contato', caminho]]),
      ],
    }),
  };
};
