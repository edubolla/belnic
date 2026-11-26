// /formacao-terapia-capilar/ — página de venda da Formação em Terapia Capilar Belnic.
// Página de campanha (sem menu no topo), com o conteúdo da formação (por tema, sem dia e horário,
// a pedido da Belnic: a ordem muda conforme a dinâmica da turma), quem conduz,
// a experiência da turma anterior, investimento e pré-inscrição. O formulário reaproveita o da
// Green Week (validação, máscara, UTM/fbclid) e envia para o webhook em site.mjs → formacao.endpoint;
// a equipe Belnic chama no WhatsApp para confirmar a vaga e o pagamento.
import { pagina, esc, icon, simbolo, logoHorizontal } from '../layout.mjs';
import { site } from '../site.mjs';
import { faqHtml, faqSchema } from '../componentes.mjs';

const perfis = [
  'Cabeleireiro(a)', 'Dono(a) de salão', 'Terapeuta capilar', 'Esteticista',
  'Profissional autônomo(a)', 'Estudante da área', 'Outro',
];

const reais = (v) => v.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

// Currículo da professora (enviado pela Belnic)
const professora = {
  nome: 'Daiane Carneiro Schneider',
  cargo: 'Educadora em Terapia Capilar Mirra Professional e Maison Visage',
  numeros: [
    ['+5.000', 'alunos formados em imersões de terapia capilar pelo Brasil'],
    ['+600', 'mentorados na Comunidade de Terapia Capilar, sua plataforma online'],
    ['+15 anos', 'de experiência clínica em estética capilar, facial e corporal'],
    ['11 anos', 'como docente universitária de Estética e Cosmética'],
  ],
  formacao: [
    ['2008', 'Graduação em Estética e Cosmetologia', 'Universidade Paranaense'],
    ['2010', 'Pós-graduação em Dermocosmética', 'ICosmetologia'],
    ['2025', 'MBA em Tricologia', 'ICosmetologia'],
  ],
  trajetoria: [
    ['2009–2020', 'Docente do curso de Tecnologia em Estética e Cosmética', 'Universidade Paranaense'],
    ['6 anos', 'Coordenadora de Pós-Graduação em Estética e Cosmética', 'Universidade Paranaense'],
    ['8 anos', 'Coordenadora e supervisora de estágio presencial', 'Universidade Paranaense'],
    ['Hoje', 'Educadora em Terapia Capilar', 'Mirra Professional e Maison Visage'],
  ],
};

// Conteúdo da formação, agrupado por tema (sem dia nem horário: a ordem depende da dinâmica da turma)
const modulos = [
  ['Fundamentos da terapia capilar', 'O que é terapia capilar, a atuação do terapeuta, a diferença para o tricologista, a anatomia e a fisiologia do fio e do couro cabeludo.'],
  ['Terapia capilar no salão', 'Posicionamento, precificação, como vender tratamentos e planos e como fidelizar clientes. Inclui protocolos home care.'],
  ['Prática demonstrativa', 'Escova, coloração e progressiva terapêuticas, e como minimizar os danos químicos no dia a dia do salão.'],
  ['Queda capilar e alopecias', 'Tipos de queda, alopecias e afinamento dos fios, além dos fatores sistêmicos: exames, hormônios, metabolismo e emoções.'],
  ['Avaliação capilar e tricoscopia', 'Anamnese completa, identificação de patologias e a leitura correta do couro cabeludo.'],
  ['Patologias inflamatórias', 'Psoríase, dermatite, caspa, oleosidade excessiva e foliculite: como reconhecer e como tratar.'],
  ['Eletroterapia capilar', 'Vapor de ozônio, alta-frequência, laser e LEDs, com indicações, contraindicações e protocolos.'],
  ['Protocolos na prática', 'Protocolos de crescimento e fortalecimento e protocolos integrados, aplicados na prática.'],
];

const icones = {
  data: '<svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"><rect x="3.5" y="5" width="17" height="15" rx="2.5"/><path d="M3.5 10h17M8 3v4M16 3v4"/></svg>',
  hora: '<svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"><circle cx="12" cy="12" r="8.5"/><path d="M12 7.5V12l3 2"/></svg>',
  local: icon.pin,
  certificado: '<svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"><circle cx="12" cy="9" r="5"/><path d="m9 13.5-1.5 7 4.5-2.5 4.5 2.5-1.5-7"/></svg>',
};

export default ({ versao }) => {
  const caminho = '/formacao-terapia-capilar/';
  const f = site.formacao;
  const turma = esc(f.turma);
  const parcela = reais(Math.round((f.preco / f.parcelas) * 100) / 100);
  const preco = reais(f.preco);
  const pctVista = Math.round((f.descontoVista || 0) * 100);
  const precoVista = reais(Math.round(f.preco * (1 - (f.descontoVista || 0)) * 100) / 100);
  const local = f.endereco ? `${esc(f.endereco)} · ${esc(f.local)}` : esc(f.local);
  const mapa = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${f.endereco}, ${f.local}`)}`;
  const localLink = f.endereco ? `<a href="${mapa}" target="_blank" rel="noopener" data-evento="mapa">${local}</a>` : local;
  const linkWhats = (msg) => `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(msg)}`;

  const faq = [
    ['Quando e onde acontece a formação?',
      `A turma ${f.turma} acontece em ${f.datasTexto}, das ${f.horario}, em ${f.local}. ${f.endereco ? `O endereço é ${f.endereco}.` : 'O endereço completo é enviado na confirmação da inscrição.'}`],
    ['Para quem é a formação?',
      'Para profissionais da beleza que querem atuar com terapia capilar: cabeleireiros, donos de salão, terapeutas capilares, esteticistas e profissionais autônomos.'],
    ['Preciso ter experiência com terapia capilar?',
      'Não. A formação começa pelos fundamentos (o que é terapia capilar, anatomia e fisiologia do fio e do couro cabeludo) e avança até avaliação, patologias, eletroterapia e protocolos integrados.'],
    ['Quem é a professora da formação?',
      `${professora.nome} (Daia Carneiro) é graduada em Estética e Cosmetologia, pós-graduada em Dermocosmética e tem MBA em Tricologia. Foi docente universitária por 11 anos, tem mais de 15 anos de experiência clínica e já formou mais de 5.000 alunos em terapia capilar. Hoje é educadora em Terapia Capilar da Mirra Professional e da Maison Visage.`],
    ['A formação tem certificado?',
      'Sim. O certificado é entregue no encerramento da formação. Você também recebe um jaleco e uma placa de reconhecimento de Terapeuta Capilar.'],
    ['Qual é o investimento?',
      `${pctVista ? `${precoVista} à vista, com ${pctVista}% de desconto, ou ` : `${preco} à vista ou `}em até ${f.parcelas}x de ${parcela} (total de ${preco}). A forma de pagamento é combinada com a equipe Belnic na confirmação da vaga.`],
    ['Como funciona a inscrição?',
      'Você preenche a pré-inscrição nesta página e a equipe Belnic chama você no WhatsApp para confirmar a vaga e combinar o pagamento.'],
    ['A formação é teórica ou prática?',
      'As duas coisas. Os conteúdos teóricos são acompanhados de prática demonstrativa e de protocolos práticos de crescimento, fortalecimento, eletroterapia e protocolos integrados.'],
    ['O que a Belnic faz com os meus dados?',
      `Usa apenas para falar com você sobre a formação e as condições da Belnic. Você pode pedir a exclusão a qualquer momento pelo e-mail ${site.email}.`],
  ];

  const campo = (id, rotulo, html, cheio = false) =>
    `<div class="campo${cheio ? ' campo--cheio' : ''}"><label for="fm-${id}">${rotulo}</label>${html}</div>`;

  const formulario = `
<form class="form form--2 gw-form" data-form-greenweek data-endpoint="${esc(f.endpoint || '')}" data-whatsapp="${site.whatsapp}"
  data-form-id="formacao_terapia_capilar_${turma}" data-origem="site_formacao_terapia_capilar_${turma}"
  data-evento-inicio="formacao_inicio_cadastro" data-evento-lead="lead_formacao" data-evento-erro="formacao_erro_envio" data-lead-source="formacao_terapia_capilar"
  data-msg-whatsapp="${esc(`Olá! Quero me inscrever na Formação em Terapia Capilar Belnic (turma ${f.turma}).`)}" novalidate>
  ${campo('nome', 'Seu nome *', '<input id="fm-nome" name="nome" type="text" required autocomplete="name" maxlength="80">')}
  ${campo('whatsapp', 'WhatsApp com DDD *', '<input id="fm-whatsapp" name="whatsapp" type="tel" required autocomplete="tel" inputmode="tel" placeholder="(51) 99999-9999" maxlength="20">')}
  ${campo('perfil', 'Você é *', `<select id="fm-perfil" name="perfil" required><option value="">Selecione</option>${perfis.map((p) => `<option>${esc(p)}</option>`).join('')}</select>`)}
  ${campo('cidade', 'Cidade *', `<input id="fm-cidade" name="cidade" type="text" required list="fm-cidades" autocomplete="address-level2" maxlength="60"><datalist id="fm-cidades">${site.cidades.map((c) => `<option value="${esc(c)}">`).join('')}</datalist>`)}
  ${campo('negocio', 'Nome do salão, clínica ou estúdio', '<input id="fm-negocio" name="negocio" type="text" autocomplete="organization" maxlength="80">')}
  ${campo('instagram', 'Instagram profissional', '<input id="fm-instagram" name="instagram" type="text" placeholder="@seuperfil" maxlength="60" autocapitalize="off">')}
  <fieldset class="campo--cheio gw-opcoes">
    <legend>Você já compra com a Belnic? *</legend>
    <div class="gw-opcoes__grupo">
      <label class="gw-opcao"><input type="radio" name="ja_cliente" value="Sim" required><span>Sim, já sou cliente</span></label>
      <label class="gw-opcao"><input type="radio" name="ja_cliente" value="Ainda não"><span>Ainda não</span></label>
    </div>
  </fieldset>
  <div class="gw-armadilha" aria-hidden="true"><label>Não preencha<input type="text" name="site_empresa" tabindex="-1" autocomplete="off"></label></div>
  <label class="campo--cheio gw-aceite"><input type="checkbox" name="aceite" value="sim" required><span>Aceito receber o contato da Belnic pelo WhatsApp sobre a formação. Li a <a href="/politicas-de-privacidade/" target="_blank">política de privacidade</a>.</span></label>
  <div class="gw-erro campo--cheio" data-erro hidden role="alert"></div>
  <div class="campo--cheio"><button class="btn btn--primario gw-enviar" type="submit"><span data-rotulo>Quero garantir minha vaga</span> ${icon.arrow}</button></div>
  <p class="form__nota campo--cheio">A pré-inscrição não tem custo. A vaga é confirmada pela equipe Belnic no WhatsApp, junto com o pagamento.</p>
</form>
<div class="gw-sucesso" data-sucesso hidden tabindex="-1">
  <span class="gw-sucesso__icone" aria-hidden="true">${simbolo}</span>
  <h3>Pré-inscrição recebida!</h3>
  <p>A equipe Belnic vai chamar você no WhatsApp para confirmar a sua vaga na turma ${turma} e combinar o pagamento.</p>
  <p>Enquanto isso, siga <a href="${site.instagram}" target="_blank" rel="noopener">${site.instagramUser}</a> para acompanhar as novidades.</p>
</div>`;

  const conteudo = modulos.map(([t, d], i) => `
      <article class="cartao fm-modulo revela"><span class="numero">${String(i + 1).padStart(2, '0')}</span><h3>${esc(t)}</h3><p>${esc(d)}</p></article>`).join('');

  const inclui = ['3 dias intensivos de formação', 'Teoria e prática demonstrativa', 'Material didático', 'Certificado de conclusão', 'Jaleco de Terapeuta Capilar', 'Placa de reconhecimento'];

  const corpo = `
<section class="gw-hero fm-hero">
  <span class="gw-hero__folha" aria-hidden="true">${simbolo}</span>
  <div class="container">
    <a class="gw-hero__logo" href="/" aria-label="Belnic Cosméticos — início">${logoHorizontal}</a>
  </div>
  <div class="container gw-hero__grade">
    <div>
      <span class="gw-selo gw-entra" style="--d:0">Turma ${turma} · Inscrições abertas</span>
      <h1 class="gw-entra" style="--d:1">Formação em Terapia Capilar <em>Belnic</em></h1>
      <p class="gw-lead gw-entra" style="--d:2"><strong>3 dias intensivos</strong> de teoria e prática com <strong>${esc(f.docente)}</strong>, que já formou mais de 5.000 profissionais em terapia capilar. Você aprende a avaliar o couro cabeludo, montar protocolos personalizados e oferecer terapia capilar no seu salão, com <strong>certificado</strong>.</p>
      <ul class="fm-info gw-entra" style="--d:3">
        <li>${icones.data}<span><small>Datas</small>${esc(f.datasCurto)}</span></li>
        <li>${icones.hora}<span><small>Horário</small>${esc(f.horario)}</span></li>
        <li>${icones.local}<span><small>Local</small>${localLink}</span></li>
      </ul>
      <a class="btn btn--claro gw-cta gw-entra" style="--d:4" href="#inscricao">Quero garantir minha vaga ${icon.arrow}</a>
      <p class="gw-micro gw-entra" style="--d:5">Certificado incluso · Ganhe jaleco e placa de reconhecimento · Em até ${f.parcelas}x${pctVista ? ` ou ${pctVista}% off à vista` : ''}</p>
    </div>
    <figure class="gw-hero__visual fm-hero__visual">
      <img src="/assets/img/formacao/turma-2026-completa.webp" alt="Turma 2026 da Formação em Terapia Capilar Belnic com os jalecos de Terapeuta Capilar" width="1000" height="939" fetchpriority="high" decoding="async">
      <figcaption><small>Turma 2026</small>Formação em Terapia Capilar</figcaption>
    </figure>
  </div>
</section>

<div class="gw-letreiro" aria-hidden="true">
  <div class="gw-letreiro__trilho">${[1, 2].map(() => '<span>Formação em Terapia Capilar</span><span>Avaliação capilar</span><span>Tricoscopia</span><span>Queda e alopecias</span><span>Patologias do couro cabeludo</span><span>Eletroterapia</span><span>Protocolos home care</span><span>Certificado</span>').join('')}</div>
</div>

<section class="secao secao--branca">
  <div class="container">
    <div class="revela fm-objetivo">
      <span class="sobretitulo">Objetivo da formação</span>
      <h2>Terapia capilar não é só uma nova técnica. É uma nova frente de atuação.</h2>
      <p class="lead">Capacitar profissionais da beleza a atuarem com <strong>terapia capilar clínica e estética</strong>, com domínio em avaliação e em protocolos de tratamento personalizado do couro cabeludo e dos fios.</p>
      <ul class="lista-check fm-ganhos">
        <li><strong>Mais especialização:</strong> avaliação, tricoscopia e leitura correta do couro cabeludo.</li>
        <li><strong>Novos serviços:</strong> protocolos de crescimento, fortalecimento e eletroterapia para a cabine.</li>
        <li><strong>Novos atendimentos:</strong> queda, afinamento, caspa, oleosidade e outras queixas do dia a dia.</li>
        <li><strong>Mais valor profissional:</strong> precificação, venda de planos de tratamento e fidelização.</li>
      </ul>
    </div>
  </div>
</section>

<section class="secao secao--areia" id="conteudo">
  <div class="container">
    <div class="cabeca revela">
      <span class="sobretitulo">O que você vai aprender</span>
      <h2>Do fundamento ao protocolo integrado</h2>
      <p class="lead">3 dias de teoria e prática que cobrem a terapia capilar de ponta a ponta, da avaliação do couro cabeludo à aplicação dos protocolos no salão.</p>
    </div>
    <div class="grade grade--2 grade--4 fm-conteudo">${conteudo}
    </div>
  </div>
</section>

<section class="secao secao--branca fm-prof" id="professora">
  <div class="container dividido fm-docente">
    <figure class="fm-foto fm-prof__foto revela">
      <img src="/assets/img/formacao/daia-maquete.webp" alt="${esc(f.docente)} segurando uma maquete do couro cabeludo" width="800" height="1000" loading="lazy" decoding="async">
    </figure>
    <div class="revela">
      <span class="sobretitulo">Quem conduz a formação</span>
      <h2>${esc(f.docente)}</h2>
      <p class="fm-prof__cargo">${esc(professora.nome)} · ${esc(professora.cargo)}</p>
      <p class="lead">Referência na formação de profissionais em <strong>Terapia Capilar Integrativa</strong>, Daia une mais de 15 anos de experiência clínica a uma longa trajetória como professora e coordenadora universitária.</p>
      <ul class="fm-numeros">
        ${professora.numeros.map(([n, t]) => `<li><b>${esc(n)}</b><span>${esc(t)}</span></li>`).join('')}
      </ul>
      <p>Durante a formação, ela acompanha cada etapa, esclarece dúvidas e mostra como transformar conhecimento em protocolos aplicáveis à rotina profissional.</p>
    </div>
  </div>
  <div class="container fm-prof__curriculo">
    <div class="revela">
      <h3>Formação acadêmica</h3>
      <ol class="fm-linha">${professora.formacao.map(([a, t, o]) => `<li><time>${esc(a)}</time><div><strong>${esc(t)}</strong><span>${esc(o)}</span></div></li>`).join('')}</ol>
    </div>
    <div class="revela">
      <h3>Trajetória</h3>
      <ol class="fm-linha">${professora.trajetoria.map(([a, t, o]) => `<li><time>${esc(a)}</time><div><strong>${esc(t)}</strong><span>${esc(o)}</span></div></li>`).join('')}</ol>
    </div>
  </div>
  <div class="container">
    <div class="fm-prof__galeria">
      <img class="revela" src="/assets/img/formacao/daia-palestra.webp" alt="${esc(f.docente)} conduzindo um treinamento para profissionais" width="600" height="750" loading="lazy" decoding="async">
      <img class="revela" src="/assets/img/formacao/daia-palco.webp" alt="${esc(f.docente)} em palestra sobre terapia capilar" width="600" height="750" loading="lazy" decoding="async">
      <img class="revela" src="/assets/img/formacao/daia-aula.webp" alt="${esc(f.docente)} em uma aula de terapia capilar" width="600" height="750" loading="lazy" decoding="async">
    </div>
    <p class="fm-destaque revela">Conhecimento que sai da teoria e <strong>chega à prática</strong>.</p>
  </div>
</section>

<section class="secao">
  <div class="container">
    <div class="cabeca cabeca--centro revela">
      <span class="sobretitulo">Uma experiência pensada do início ao fim</span>
      <h2>Mais do que aulas: uma experiência completa</h2>
      <p class="lead">Cada detalhe é preparado para que você se sinta acolhido, valorizado e parte de algo maior. Foi assim na turma de 2026.</p>
    </div>
    <div class="grade grade--2 grade--4 fm-experiencia">
      <figure class="revela"><img src="/assets/img/formacao/exp-jaleco.webp" alt="Turma de 2026 com os jalecos de Terapeuta Capilar" width="490" height="180" loading="lazy" decoding="async"><figcaption><strong>Jaleco</strong>Você ganha o jaleco de Terapeuta Capilar.</figcaption></figure>
      <figure class="revela"><img src="/assets/img/formacao/exp-placa.webp" alt="Placa de reconhecimento de Terapeuta Capilar" width="490" height="178" loading="lazy" decoding="async"><figcaption><strong>Placa de reconhecimento</strong>Para expor no seu espaço de atendimento.</figcaption></figure>
      <figure class="revela"><img src="/assets/img/formacao/exp-acompanhamento.webp" alt="Alunas acompanhando a aula da formação" width="490" height="181" loading="lazy" decoding="async"><figcaption><strong>Acompanhamento</strong>Dúvidas esclarecidas em cada etapa.</figcaption></figure>
      <figure class="revela"><img src="/assets/img/formacao/exp-coffee.webp" alt="Coffee break servido na formação de 2026" width="490" height="186" loading="lazy" decoding="async"><figcaption><strong>Acolhimento</strong>Um ambiente pensado para você aprender bem.</figcaption></figure>
    </div>
  </div>
</section>

<section class="secao secao--branca">
  <div class="container">
    <div class="cabeca revela">
      <span class="sobretitulo">Produtos e protocolos</span>
      <h2>Diferentes necessidades pedem diferentes protocolos</h2>
      <p class="lead">Durante a formação, você conhece uma linha ampla de produtos profissionais para trabalhar diferentes necessidades do couro cabeludo e dos fios. Conhecer o produto é entender <strong>quando, como e por que</strong> utilizá-lo.</p>
    </div>
    <figure class="fm-foto fm-foto--larga revela">
      <img src="/assets/img/formacao/produtos-protocolos.webp" alt="Produtos Mirra Professional e Maison Visage usados nos protocolos da formação" width="1026" height="284" loading="lazy" decoding="async">
    </figure>
    <div class="dividido fm-resultado">
      <figure class="fm-foto revela">
        <img src="/assets/img/formacao/antes-depois.webp" alt="Antes e depois de um tratamento capilar realizado com os produtos e protocolos apresentados na formação" width="918" height="473" loading="lazy" decoding="async">
      </figure>
      <div class="revela">
        <h3 class="fm-equacao">Conhecimento + protocolo + produtos certos = <em>resultado</em></h3>
        <p>Resultado real de um tratamento realizado com os produtos e protocolos apresentados na formação.</p>
      </div>
    </div>
  </div>
</section>

<section class="secao gw-exclusivo">
  <div class="container">
    <div class="gw-exclusivo__painel fm-belnic revela">
      <div class="gw-exclusivo__texto">
        <span class="gw-selo gw-selo--escuro">Por que a Belnic</span>
        <h2>Uma formação respaldada por quem vive o mercado profissional</h2>
        <p>A Belnic é distribuidora especializada em cosméticos profissionais e parceira de marcas como Mirra Professional e Maison Visage. Com estrutura, equipe e suporte, conecta produtos, conhecimento e acompanhamento para a evolução dos profissionais da beleza.</p>
        <p><strong>Aqui, formação e mercado caminham juntos:</strong> depois do curso, você continua com o suporte de um representante Belnic na sua região.</p>
      </div>
      <div class="fm-belnic__fotos">
        <img src="/assets/img/formacao/belnic-fachada.webp" alt="Fachada da Belnic Hub da Beleza" width="369" height="521" loading="lazy" decoding="async">
        <img src="/assets/img/formacao/belnic-espaco.webp" alt="Espaço da Belnic com o mapa do Rio Grande do Sul" width="369" height="495" loading="lazy" decoding="async">
      </div>
    </div>
  </div>
</section>

<section class="secao secao--branca">
  <div class="container">
    <div class="cabeca revela">
      <span class="sobretitulo">Turma 2026</span>
      <h2>Foram dias de aprendizado, troca, prática e conexão</h2>
      <p class="lead">Profissionais que decidiram ir além na profissão. A próxima pode ser você.</p>
    </div>
    <div class="fm-galeria">
      <img class="revela" src="/assets/img/formacao/turma-2026-grupo.webp" alt="Foto oficial da turma 2026 da Formação em Terapia Capilar" width="1080" height="440" loading="lazy" decoding="async">
      <img class="revela" src="/assets/img/formacao/sala-aula.webp" alt="Aula teórica da turma 2026" width="1080" height="505" loading="lazy" decoding="async">
    </div>
  </div>
</section>

<section class="secao secao--verde gw-cadastro" id="inscricao">
  <div class="container dividido">
    <div class="revela">
      <span class="sobretitulo">Investimento · Turma ${turma}</span>
      <h2>Garanta sua vaga na Formação em Terapia Capilar</h2>
      <div class="fm-preco">
        <span class="fm-preco__parcela"><small>em até ${f.parcelas}x de</small>${parcela}</span>
        ${pctVista ? `<span class="fm-preco__vista">ou <strong>${precoVista} à vista</strong> <span class="fm-preco__selo">${pctVista}% de desconto</span></span>
        <span class="fm-preco__total">Valor total parcelado: ${preco}</span>` : `<span class="fm-preco__vista">ou ${preco} à vista</span>`}
      </div>
      <ul class="lista-check fm-inclui">${inclui.map((i) => `<li>${esc(i)}</li>`).join('')}</ul>
      <ul class="fm-info fm-info--claro">
        <li>${icones.data}<span><small>Datas</small>${esc(f.datasTexto)}</span></li>
        <li>${icones.hora}<span><small>Horário</small>${esc(f.horario)}</span></li>
        <li>${icones.local}<span><small>Local</small>${localLink}</span></li>
      </ul>
      <p class="gw-agora">Prefere conversar antes? <a href="${linkWhats(`Olá! Tenho dúvidas sobre a Formação em Terapia Capilar Belnic (turma ${f.turma}).`)}" target="_blank" rel="noopener" data-evento="whatsapp">Fale com a Belnic no WhatsApp</a>.</p>
    </div>
    <div class="cartao gw-cartao revela">
      <h3 class="fm-form__titulo">Pré-inscrição</h3>
      ${formulario}
    </div>
  </div>
</section>

<section class="secao">
  <div class="container">
    <div class="cabeca revela"><span class="sobretitulo">Dúvidas</span><h2>Perguntas frequentes sobre a formação</h2></div>
    ${faqHtml(faq)}
    <p style="margin-top:32px"><a class="btn btn--primario" href="#inscricao">Quero garantir minha vaga ${icon.arrow}</a></p>
  </div>
</section>`;

  const curso = {
    '@type': 'Course', '@id': `${site.url}${caminho}#curso`,
    name: 'Formação em Terapia Capilar Belnic',
    description: 'Formação de 3 dias, teórica e prática, para profissionais da beleza atuarem com terapia capilar clínica e estética: avaliação, tricoscopia, queda e alopecias, patologias do couro cabeludo, eletroterapia e protocolos personalizados.',
    provider: { '@id': `${site.url}/#organizacao` },
    inLanguage: 'pt-BR',
    educationalCredentialAwarded: 'Certificado de conclusão',
    hasCourseInstance: {
      '@type': 'CourseInstance', courseMode: 'Onsite', startDate: f.inicio, endDate: f.fim,
      location: { '@type': 'Place', name: f.local, address: { '@type': 'PostalAddress', addressLocality: f.cidade, addressRegion: 'RS', addressCountry: 'BR', ...(f.endereco ? { streetAddress: f.endereco } : {}) } },
      instructor: {
        '@type': 'Person', name: professora.nome, alternateName: f.docente, jobTitle: professora.cargo,
        image: `${site.url}/assets/img/formacao/daia-maquete.webp`,
        alumniOf: [{ '@type': 'CollegeOrUniversity', name: 'Universidade Paranaense' }, { '@type': 'EducationalOrganization', name: 'ICosmetologia' }],
      },
      offers: { '@type': 'Offer', price: f.preco.toFixed(2), priceCurrency: 'BRL', availability: 'https://schema.org/InStock', url: `${site.url}${caminho}#inscricao` },
    },
    image: [`${site.url}/assets/img/formacao/daia-maquete.webp`, `${site.url}/assets/img/formacao/turma-2026-completa.webp`],
  };

  return {
    caminho,
    html: pagina({
      titulo: `Formação em Terapia Capilar Belnic ${f.turma} | ${f.local}`,
      descricao: `Formação em Terapia Capilar Belnic em ${f.local}, na região metropolitana de Porto Alegre: 3 dias de teoria e prática (${f.datasCurto}) com ${f.docente}. Avaliação, tricoscopia, queda, patologias, eletroterapia e protocolos. Certificado incluso.`,
      caminho,
      corpo,
      versao,
      classeBody: 'pagina-gw pagina-formacao',
      imagem: '/assets/img/formacao/turma-2026-completa.webp',
      campanha: { cta: 'Quero garantir minha vaga', alvo: '#inscricao', semTopo: true },
      schema: [
        { '@type': 'WebPage', '@id': `${site.url}${caminho}#pagina`, url: `${site.url}${caminho}`, name: `Formação em Terapia Capilar Belnic ${f.turma}`, inLanguage: 'pt-BR', about: { '@id': `${site.url}${caminho}#curso` } },
        curso,
        faqSchema(faq),
      ],
    }),
  };
};
