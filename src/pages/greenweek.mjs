// /greenweek/ — captação para o Grupo VIP da Green Week (a "Black Friday" da Belnic).
// Página de campanha: sem menu, um único chamado (entrar no Grupo VIP) e formulário curto
// que já filtra o perfil do lead para a equipe fazer a triagem (veja GREENWEEK.md).
import { pagina, esc, icon, simbolo } from '../layout.mjs';
import { site } from '../site.mjs';
import { faqHtml, faqSchema } from '../componentes.mjs';

const perfis = [
  'Salão de beleza', 'Clínica de estética', 'Estúdio de beleza', 'Barbearia',
  'Profissional autônomo(a)', 'Terapeuta capilar', 'Estudante da área', 'Sou consumidor(a) final',
];

const faq = [
  ['Quem pode participar da Green Week?',
    'Profissionais da beleza: salões, clínicas de estética, estúdios, barbearias, terapeutas capilares e profissionais autônomos. Cada cadastro é conferido pela equipe Belnic antes de entrar no Grupo VIP.'],
  ['Quanto custa para entrar no Grupo VIP?',
    'Nada. O cadastro e o grupo são gratuitos. Você só paga pelo que decidir comprar na Green Week.'],
  ['Preciso já ser cliente Belnic?',
    'Não. Profissionais que ainda não compram com a Belnic também podem se cadastrar. A equipe confere o perfil e, se estiver tudo certo, envia o convite.'],
  ['Sou cliente final. Posso participar?',
    'A Green Week é exclusiva para profissionais. Se você é cliente final, chame a Belnic no WhatsApp e indicamos um salão parceiro perto de você.'],
  ['Como recebo as ofertas?',
    'Pelo Grupo VIP no WhatsApp. É lá que as condições da Green Week são liberadas, antes de qualquer outro canal.'],
  ['Quando acontece a Green Week?',
    'A data é anunciada primeiro no Grupo VIP. Quem já está no grupo recebe o aviso antes e se organiza com antecedência.'],
  ['O que a Belnic faz com os meus dados?',
    'Usa apenas para conferir o seu perfil profissional e falar com você sobre a Green Week e as condições da Belnic. Você pode pedir a exclusão a qualquer momento pelo e-mail ' + site.email + '.'],
];

export default ({ versao }) => {
  const caminho = '/greenweek/';
  const gw = site.greenweek || {};
  const campo = (id, rotulo, html, cheio = false) =>
    `<div class="campo${cheio ? ' campo--cheio' : ''}"><label for="gw-${id}">${rotulo}</label>${html}</div>`;

  const formulario = `
<form class="form form--2 gw-form" data-form-greenweek data-endpoint="${esc(gw.endpoint || '')}" data-whatsapp="${site.whatsapp}" novalidate>
  ${campo('nome', 'Seu nome *', '<input id="gw-nome" name="nome" type="text" required autocomplete="name" maxlength="80">')}
  ${campo('whatsapp', 'WhatsApp com DDD *', '<input id="gw-whatsapp" name="whatsapp" type="tel" required autocomplete="tel" inputmode="tel" placeholder="(51) 99999-9999" maxlength="20">')}
  ${campo('perfil', 'Você é *', `<select id="gw-perfil" name="perfil" required><option value="">Selecione</option>${perfis.map((p) => `<option>${esc(p)}</option>`).join('')}</select>`)}
  ${campo('cidade', 'Cidade *', `<input id="gw-cidade" name="cidade" type="text" required list="gw-cidades" autocomplete="address-level2" maxlength="60"><datalist id="gw-cidades">${site.cidades.map((c) => `<option value="${esc(c)}">`).join('')}</datalist>`)}
  ${campo('negocio', 'Nome do salão, clínica ou estúdio', '<input id="gw-negocio" name="negocio" type="text" autocomplete="organization" maxlength="80">')}
  ${campo('instagram', 'Instagram profissional', '<input id="gw-instagram" name="instagram" type="text" placeholder="@seuperfil" maxlength="60" autocapitalize="off">')}
  <fieldset class="campo campo--cheio gw-opcoes">
    <legend>Você já compra com a Belnic? *</legend>
    <label><input type="radio" name="ja_cliente" value="Sim" required> Sim, já sou cliente</label>
    <label><input type="radio" name="ja_cliente" value="Ainda não"> Ainda não</label>
  </fieldset>
  <div class="gw-armadilha" aria-hidden="true"><label>Não preencha<input type="text" name="site_empresa" tabindex="-1" autocomplete="off"></label></div>
  <label class="campo--cheio gw-aceite"><input type="checkbox" name="aceite" value="sim" required> Aceito receber o contato da Belnic pelo WhatsApp sobre a Green Week. Li a <a href="/politicas-de-privacidade/" target="_blank">política de privacidade</a>.</label>
  <p class="gw-erro campo--cheio" data-erro hidden role="alert"></p>
  <div class="campo--cheio"><button class="btn btn--primario gw-enviar" type="submit">Quero meu acesso VIP ${icon.arrow}</button></div>
  <p class="form__nota campo--cheio">Leva menos de 1 minuto. Seus dados são usados só para validar o seu perfil e falar com você sobre a Green Week.</p>
</form>
<div class="gw-sucesso" data-sucesso hidden tabindex="-1">
  <span class="gw-sucesso__icone" aria-hidden="true">${simbolo}</span>
  <h3>Cadastro recebido!</h3>
  <p>Agora é com a gente: a equipe Belnic confere o seu perfil e envia o convite do Grupo VIP direto no seu WhatsApp. Fique de olho nas mensagens.</p>
  <p>Enquanto isso, siga <a href="${site.instagram}" target="_blank" rel="noopener">${site.instagramUser}</a> para não perder nenhum aviso.</p>
</div>`;

  const corpo = `
<section class="gw-hero">
  <span class="gw-hero__folha" aria-hidden="true">${simbolo}</span>
  <div class="container gw-hero__grade">
    <div>
      <span class="gw-selo">Acesso exclusivo · Grupo VIP no WhatsApp</span>
      <h1>Green Week Belnic: <em>a semana mais esperada do ano</em> para quem vive de beleza</h1>
      <p class="gw-lead">Condições que não se repetem no resto do ano em <strong>Mirra Professional</strong> e <strong>Maison Visage</strong>. Liberadas só para profissionais do Grupo VIP. Quem não está no grupo, não fica sabendo.</p>
      <div class="gw-contagem" data-contagem="${esc(gw.inicio || '')}">
        <p class="gw-contagem__rotulo">${gw.inicio ? 'Começa em' : 'Data anunciada primeiro no Grupo VIP'}</p>
        ${gw.inicio ? `<div class="gw-contagem__numeros" aria-live="polite">${['dias', 'horas', 'min', 'seg'].map((u) => `<span><b data-${u}>--</b><small>${u}</small></span>`).join('')}</div>` : ''}
      </div>
      <a class="btn btn--claro gw-cta" href="#cadastro">Quero entrar no Grupo VIP ${icon.arrow}</a>
      <p class="gw-micro">Gratuito · Só para profissionais da beleza · Cada cadastro é validado pela equipe Belnic</p>
    </div>
    <div class="gw-hero__visual">
      <img src="/assets/img/produtos/mirra/ambiente-3.webp" alt="Profissional com cabelo tratado com Mirra Professional" width="1134" height="1365" fetchpriority="high">
    </div>
  </div>
</section>

<section class="secao secao--branca">
  <div class="container">
    <div class="gw-destaque revela">
      <span class="gw-destaque__numero">1 dia</span>
      <p>Em um único dia de Green Week, a procura dos profissionais supera a de <strong>um mês inteiro</strong>. Quem está no grupo se prepara antes e garante primeiro.</p>
    </div>
    <div class="cabeca revela" style="margin-top:48px">
      <span class="sobretitulo">O que você ganha no Grupo VIP</span>
      <h2>Vantagens que só quem está dentro recebe</h2>
    </div>
    <div class="grade grade--2 grade--4">
      <article class="cartao revela"><span class="numero">01</span><h3>Aviso antes de todo mundo</h3><p>A data, as linhas participantes e as condições chegam primeiro no grupo.</p></article>
      <article class="cartao revela"><span class="numero">02</span><h3>Condições exclusivas</h3><p>Ofertas em Mirra Professional e Maison Visage que não aparecem no resto do ano.</p></article>
      <article class="cartao revela"><span class="numero">03</span><h3>Combos para o seu salão</h3><p>Kits pensados para cabine e para revenda de home care aos seus clientes.</p></article>
      <article class="cartao revela"><span class="numero">04</span><h3>Quem chega primeiro, garante</h3><p>Com a procura de um mês concentrada em um dia, sair na frente faz diferença.</p></article>
    </div>
  </div>
</section>

<section class="secao">
  <div class="container dividido">
    <div class="revela">
      <span class="sobretitulo">Não é para todo mundo</span>
      <h2>A Green Week é exclusiva para profissionais da beleza</h2>
      <p class="lead">Por isso, cada cadastro passa pela equipe Belnic antes de entrar no grupo. Assim o Grupo VIP continua sendo de quem trabalha com beleza.</p>
    </div>
    <div class="gw-para revela">
      <div>
        <h3>É para você se trabalha em</h3>
        <ul class="lista-check">
          <li>Salão de beleza ou estúdio</li>
          <li>Clínica de estética ou terapia capilar</li>
          <li>Barbearia</li>
          <li>Atendimento autônomo na área da beleza</li>
        </ul>
      </div>
      <p class="gw-para__nao">É cliente final? A Green Week não é para você, mas a Belnic indica um salão parceiro perto de você pelo <a href="https://wa.me/${site.whatsapp}?text=${encodeURIComponent('Olá! Sou cliente final e gostaria da indicação de um salão parceiro.')}" target="_blank" rel="noopener" data-evento="whatsapp">WhatsApp</a>.</p>
    </div>
  </div>
</section>

<section class="secao secao--areia">
  <div class="container">
    <div class="cabeca cabeca--centro revela">
      <span class="sobretitulo">Como entrar</span>
      <h2>Três passos até o Grupo VIP</h2>
    </div>
    <div class="grade grade--3">
      <article class="cartao revela"><span class="numero">01</span><h3>Faça seu cadastro</h3><p>Leva menos de 1 minuto: nome, WhatsApp, cidade e o seu perfil profissional.</p></article>
      <article class="cartao revela"><span class="numero">02</span><h3>A equipe confere seu perfil</h3><p>A Belnic valida cada cadastro para manter o grupo só com profissionais.</p></article>
      <article class="cartao revela"><span class="numero">03</span><h3>Receba o convite</h3><p>O link do Grupo VIP chega no seu WhatsApp. É lá que a Green Week acontece.</p></article>
    </div>
  </div>
</section>

<section class="secao secao--verde gw-cadastro" id="cadastro">
  <div class="container dividido">
    <div class="revela">
      <span class="sobretitulo">Cadastro Grupo VIP</span>
      <h2>Garanta seu lugar na Green Week</h2>
      <p class="lead">Preencha os dados abaixo. Se o seu perfil for aprovado, o convite do Grupo VIP chega no seu WhatsApp.</p>
      <ul class="gw-marcas">
        <li>Mirra Professional</li><li>Maison Visage</li><li>Spa Therapy</li><li>Elements</li><li>BioRestore</li><li>Trend Colors</li><li>Luxury</li><li>Touch Finishers</li>
      </ul>
    </div>
    <div class="cartao gw-cartao revela">${formulario}</div>
  </div>
</section>

<section class="secao">
  <div class="container">
    <div class="cabeca revela"><span class="sobretitulo">Dúvidas</span><h2>Perguntas frequentes sobre a Green Week</h2></div>
    ${faqHtml(faq)}
    <p style="margin-top:32px"><a class="btn btn--primario" href="#cadastro">Quero entrar no Grupo VIP ${icon.arrow}</a></p>
  </div>
</section>`;

  return {
    caminho,
    html: pagina({
      titulo: 'Green Week Belnic | Grupo VIP para profissionais da beleza',
      descricao: 'Green Week Belnic: condições exclusivas em Mirra Professional e Maison Visage, só para profissionais do Grupo VIP. Cadastre-se e garanta seu acesso.',
      caminho,
      corpo,
      versao,
      imagem: '/assets/img/produtos/mirra/ambiente-3.webp',
      campanha: { cta: 'Quero entrar no Grupo VIP', ctaCurto: 'Entrar no VIP', alvo: '#cadastro' },
      schema: [
        {
          '@type': 'WebPage', '@id': `${site.url}${caminho}#pagina`, url: `${site.url}${caminho}`,
          name: 'Green Week Belnic', inLanguage: 'pt-BR', about: { '@id': `${site.url}/#organizacao` },
        },
        faqSchema(faq),
      ],
    }),
  };
};
