// /greenweek/ — captação para o Grupo VIP da Green Week (a "Black Friday" da Belnic).
// Página de campanha: sem menu nem barra no topo, um único chamado (entrar no Grupo VIP) e
// formulário curto que já filtra o perfil do lead. Os cadastros vão para o webhook (n8n)
// configurado em site.mjs → greenweek.endpoint (veja GREENWEEK.md).
import { pagina, esc, icon, simbolo, logoHorizontal } from '../layout.mjs';
import { site } from '../site.mjs';
import { faqHtml, faqSchema } from '../componentes.mjs';

const perfis = [
  'Salão de beleza', 'Clínica de estética', 'Estúdio de beleza',
  'Profissional autônomo(a)', 'Terapeuta capilar', 'Estudante da área', 'Sou consumidor(a) final',
];

const icones = {
  salao: '<svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"><circle cx="6" cy="18" r="2.5"/><circle cx="18" cy="18" r="2.5"/><path d="M7.8 16.2 18 4M16.2 16.2 6 4"/></svg>',
  clinica: '<svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"><path d="M12 3c3 3.5 5 6.4 5 9a5 5 0 0 1-10 0c0-2.6 2-5.5 5-9Z"/><path d="M10 13.5a2 2 0 0 0 2 2"/></svg>',
  terapia: '<svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"><path d="M12 21c-4-3-6-6.5-6-10a6 6 0 0 1 12 0c0 3.5-2 7-6 10Z"/><path d="M9.5 10.5c1.4 1.6 3.6 1.6 5 0"/></svg>',
  autonomo: '<svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><circle cx="12" cy="8" r="3.5"/><path d="M5 20c.8-3.6 3.6-5.5 7-5.5s6.2 1.9 7 5.5"/></svg>',
};

export default ({ versao }) => {
  const caminho = '/greenweek/';
  const gw = site.greenweek || {};
  const ano = gw.lancamento ? new Date(gw.lancamento).getFullYear() : '';
  const dia = esc(gw.lancamentoTexto || '');

  const faq = [
    ['Quando acontece a Green Week?',
      `O grande lançamento da Green Week ${ano} é no dia ${gw.lancamentoTexto}, dentro do Grupo VIP do WhatsApp. É nesse dia que as condições são liberadas. Faça seu cadastro antes para não ficar de fora.`],
    ['Quem pode participar da Green Week?',
      'Profissionais da beleza: salões, clínicas de estética, estúdios, terapeutas capilares e profissionais autônomos. Cada cadastro é conferido pela equipe Belnic antes de entrar no Grupo VIP.'],
    ['É preciso pagar para entrar no Grupo VIP?',
      'Não. Entrar no Grupo VIP é gratuito. O pagamento só acontece se você fizer uma compra no lançamento da Green Week.'],
    ['Preciso já ser cliente Belnic?',
      'Não. Profissionais que ainda não compram com a Belnic também podem se cadastrar. A equipe confere o perfil e, se estiver tudo certo, envia o convite.'],
    ['Sou cliente final. Posso participar?',
      'A Green Week é exclusiva para profissionais. Se você é cliente final, chame a Belnic no WhatsApp e indicamos um salão parceiro perto de você.'],
    ['Como recebo as ofertas?',
      'Pelo Grupo VIP no WhatsApp. É lá que o lançamento acontece no dia ' + (gw.lancamentoTexto || '') + ', com as condições liberadas antes de qualquer outro canal.'],
    ['O que a Belnic faz com os meus dados?',
      `Usa apenas para conferir o seu perfil profissional e falar com você sobre a Green Week e as condições da Belnic. Você pode pedir a exclusão a qualquer momento pelo e-mail ${site.email}.`],
  ];

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
  <fieldset class="campo--cheio gw-opcoes">
    <legend>Você já compra com a Belnic? *</legend>
    <div class="gw-opcoes__grupo">
      <label class="gw-opcao"><input type="radio" name="ja_cliente" value="Sim" required><span>Sim, já sou cliente</span></label>
      <label class="gw-opcao"><input type="radio" name="ja_cliente" value="Ainda não"><span>Ainda não</span></label>
    </div>
  </fieldset>
  <div class="gw-armadilha" aria-hidden="true"><label>Não preencha<input type="text" name="site_empresa" tabindex="-1" autocomplete="off"></label></div>
  <label class="campo--cheio gw-aceite"><input type="checkbox" name="aceite" value="sim" required><span>Aceito receber o contato da Belnic pelo WhatsApp sobre a Green Week. Li a <a href="/politicas-de-privacidade/" target="_blank">política de privacidade</a>.</span></label>
  <div class="gw-erro campo--cheio" data-erro hidden role="alert"></div>
  <div class="campo--cheio"><button class="btn btn--primario gw-enviar" type="submit"><span data-rotulo>Quero meu acesso VIP</span> ${icon.arrow}</button></div>
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
  <div class="container">
    <a class="gw-hero__logo" href="/" aria-label="Belnic Cosméticos — início">${logoHorizontal}</a>
  </div>
  <div class="container gw-hero__grade">
    <div>
      <span class="gw-selo gw-entra" style="--d:0">Grande lançamento · ${dia} · Grupo VIP</span>
      <h1 class="gw-entra" style="--d:1">Green Week Belnic: <em>o grande lançamento</em> do ano para quem vive de beleza</h1>
      <p class="gw-lead gw-entra" style="--d:2">No dia <strong>${dia}</strong>, a Belnic libera no Grupo VIP do WhatsApp as condições mais esperadas do ano em <strong>Mirra Professional</strong> e <strong>Maison Visage</strong>. Só quem está no grupo participa do lançamento.</p>
      <div class="gw-data gw-entra" style="--d:3">
        <b>${esc(gw.lancamentoCurto || '')}</b>
        <span><strong>Grande lançamento</strong>No Grupo VIP do WhatsApp</span>
      </div>
      <div class="gw-contagem gw-entra" style="--d:4" data-contagem data-alvo="${esc(gw.lancamento || '')}" data-fim="${esc(gw.fim || '')}">
        <p class="gw-contagem__rotulo" data-rotulo-contagem>O grande lançamento começa em</p>
        <div class="gw-contagem__numeros" aria-live="polite">${['dias', 'horas', 'min', 'seg'].map((u) => `<span><b data-${u}>--</b><small>${u}</small></span>`).join('')}</div>
      </div>
      <a class="btn btn--claro gw-cta gw-entra" style="--d:5" href="#cadastro">Quero entrar no Grupo VIP ${icon.arrow}</a>
      <p class="gw-micro gw-entra" style="--d:6">Gratuito · Só para profissionais da beleza · Cada cadastro é validado pela equipe Belnic</p>
    </div>
    <div class="gw-hero__visual">
      <img src="/assets/img/produtos/mirra/ambiente-3.webp" alt="Profissional com cabelo tratado com Mirra Professional" width="1134" height="1365" fetchpriority="high">
    </div>
  </div>
</section>

<div class="gw-letreiro" aria-hidden="true">
  <div class="gw-letreiro__trilho"><span>Mirra Professional</span><span>Maison Visage</span><span>Spa Therapy</span><span>Elements</span><span>BioRestore</span><span>Trend Colors</span><span>Theraplex</span><span>Luxury Nanotherapy</span><span>Touch Finishers</span><span>MS Curls</span><span>Le Bain</span><span>Nano Force</span><span>Mirra Professional</span><span>Maison Visage</span><span>Spa Therapy</span><span>Elements</span><span>BioRestore</span><span>Trend Colors</span><span>Theraplex</span><span>Luxury Nanotherapy</span><span>Touch Finishers</span><span>MS Curls</span><span>Le Bain</span><span>Nano Force</span></div>
</div>

<section class="secao secao--branca">
  <div class="container">
    <div class="cabeca revela">
      <span class="sobretitulo">O que você ganha no Grupo VIP</span>
      <h2>Vantagens que só quem está dentro recebe</h2>
    </div>
    <div class="grade grade--2 grade--4">
      <article class="cartao revela"><span class="numero">01</span><h3>Aviso antes de todo mundo</h3><p>Lembretes do lançamento e as linhas participantes chegam primeiro no grupo.</p></article>
      <article class="cartao revela"><span class="numero">02</span><h3>Condições exclusivas</h3><p>Ofertas em Mirra Professional e Maison Visage que não aparecem no resto do ano.</p></article>
      <article class="cartao revela"><span class="numero">03</span><h3>Combos para o seu salão</h3><p>Kits pensados para cabine e para revenda de home care aos seus clientes.</p></article>
      <article class="cartao revela"><span class="numero">04</span><h3>Quem chega primeiro, garante</h3><p>No dia ${dia}, quem já está no grupo sai na frente.</p></article>
    </div>
  </div>
</section>

<section class="secao gw-exclusivo">
  <div class="container">
    <div class="gw-exclusivo__painel revela">
      <div class="gw-exclusivo__texto">
        <span class="gw-selo gw-selo--escuro">Somente profissionais</span>
        <h2>A Green Week é exclusiva para quem trabalha com beleza</h2>
        <p>As ofertas da Green Week são liberadas somente dentro do Grupo VIP, e não ficam abertas ao público. Por isso, cada cadastro passa pela equipe Belnic antes de entrar no grupo, para que as condições cheguem a quem realmente vive de beleza.</p>
      </div>
      <ul class="gw-exclusivo__perfis">
        <li>${icones.salao}<span>Salões e estúdios de beleza</span></li>
        <li>${icones.clinica}<span>Clínicas de estética e terapia capilar</span></li>
        <li>${icones.terapia}<span>Terapeutas capilares</span></li>
        <li>${icones.autonomo}<span>Profissionais autônomos da beleza</span></li>
      </ul>
      <p class="gw-exclusivo__nao"><strong>É cliente final?</strong> A Green Week não é para você, mas a Belnic indica um salão parceiro perto de você pelo <a href="https://wa.me/${site.whatsapp}?text=${encodeURIComponent('Olá! Sou cliente final e gostaria da indicação de um salão parceiro.')}" target="_blank" rel="noopener" data-evento="whatsapp">WhatsApp</a>.</p>
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
      <article class="cartao revela"><span class="numero">03</span><h3>Receba o convite</h3><p>O link do Grupo VIP chega no seu WhatsApp. É lá que o lançamento acontece, no dia ${dia}.</p></article>
    </div>
  </div>
</section>

<section class="secao secao--verde gw-cadastro" id="cadastro">
  <div class="container dividido">
    <div class="revela">
      <span class="sobretitulo">Cadastro Grupo VIP</span>
      <h2>Garanta seu lugar no lançamento do dia ${dia}</h2>
      <p class="lead">Preencha os dados ao lado. Se o seu perfil for aprovado, o convite do Grupo VIP chega no seu WhatsApp antes do lançamento.</p>
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
      titulo: `Green Week Belnic ${ano} | Grande lançamento em ${gw.lancamentoCurto?.replace('.', '/')}`,
      descricao: `Grande lançamento da Green Week Belnic em ${gw.lancamentoTexto}: condições exclusivas Mirra Professional e Maison Visage no Grupo VIP para profissionais.`,
      caminho,
      corpo,
      versao,
      classeBody: 'pagina-gw',
      imagem: '/assets/img/produtos/mirra/ambiente-3.webp',
      campanha: { cta: 'Quero entrar no Grupo VIP', alvo: '#cadastro', semTopo: true },
      schema: [
        {
          '@type': 'WebPage', '@id': `${site.url}${caminho}#pagina`, url: `${site.url}${caminho}`,
          name: `Green Week Belnic ${ano}: grande lançamento`, inLanguage: 'pt-BR', about: { '@id': `${site.url}/#organizacao` },
        },
        {
          '@type': 'SaleEvent', name: `Green Week Belnic ${ano}: grande lançamento`,
          description: 'Grande lançamento com condições exclusivas em Mirra Professional e Maison Visage para profissionais da beleza do Grupo VIP Belnic.',
          startDate: gw.lancamento, endDate: gw.fim, eventAttendanceMode: 'https://schema.org/OnlineEventAttendanceMode',
          eventStatus: 'https://schema.org/EventScheduled',
          location: { '@type': 'VirtualLocation', url: `${site.url}${caminho}` },
          organizer: { '@id': `${site.url}/#organizacao` },
          image: `${site.url}/assets/img/produtos/mirra/ambiente-3.webp`,
        },
        faqSchema(faq),
      ],
    }),
  };
};
