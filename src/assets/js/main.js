// Belnic — JS mínimo. O site funciona sem ele; aqui só há melhorias.
(() => {
  const topo = document.querySelector('[data-topo]');
  const botao = document.querySelector('[data-menu]');
  const menu = document.getElementById('menu');

  // Menu mobile
  if (botao && menu) {
    const alterna = (abrir) => {
      botao.setAttribute('aria-expanded', String(abrir));
      menu.classList.toggle('aberto', abrir);
      document.body.classList.toggle('menu-aberto', abrir);
    };
    botao.addEventListener('click', () => alterna(botao.getAttribute('aria-expanded') !== 'true'));
    document.addEventListener('keydown', (e) => e.key === 'Escape' && alterna(false));
    menu.addEventListener('click', (e) => e.target.closest('a') && alterna(false));
  }

  // Borda do topo ao rolar
  if (topo) {
    const marca = () => topo.classList.toggle('rolou', window.scrollY > 8);
    marca();
    window.addEventListener('scroll', marca, { passive: true });
  }

  // Revelação suave
  const revelar = document.querySelectorAll('.revela');
  if ('IntersectionObserver' in window && revelar.length) {
    const io = new IntersectionObserver((itens) => itens.forEach((i) => {
      if (i.isIntersecting) { i.target.classList.add('visivel'); io.unobserve(i.target); }
    }), { rootMargin: '0px 0px -8% 0px' });
    revelar.forEach((el) => io.observe(el));
  } else revelar.forEach((el) => el.classList.add('visivel'));

  // Filtro + busca de produtos
  const lista = document.querySelector('[data-produtos]');
  if (lista) {
    const cards = [...lista.querySelectorAll('[data-filtro]')];
    const filtros = [...document.querySelectorAll('[data-filtrar]')];
    const busca = document.querySelector('[data-busca]');
    const vazio = document.querySelector('[data-vazio]');
    const norm = (s) => s.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase();
    let ativo = 'todos';
    const aplica = () => {
      const q = norm(busca?.value || '');
      let n = 0;
      cards.forEach((c) => {
        const ok = (ativo === 'todos' || c.dataset.filtro.split(' ').includes(ativo)) && (!q || norm(c.textContent).includes(q));
        c.hidden = !ok; if (ok) n++;
      });
      if (vazio) vazio.hidden = n > 0;
    };
    filtros.forEach((f) => f.addEventListener('click', () => {
      ativo = f.dataset.filtrar;
      filtros.forEach((x) => x.setAttribute('aria-pressed', String(x === f)));
      aplica();
    }));
    busca?.addEventListener('input', aplica);
    const inicial = new URLSearchParams(location.search).get('marca');
    if (inicial) document.querySelector(`[data-filtrar="${inicial}"]`)?.click();
  }

  // ── Medição ──────────────────────────────────────────────────────────────
  // Todo evento vai para o dataLayer (Google Tag Manager). Se o GA4 estiver instalado
  // direto (gtag), vai para ele também. Nomes e parâmetros documentados em MEDICAO.md.
  window.dataLayer = window.dataLayer || [];
  const rastreia = (evento, params = {}) => {
    window.dataLayer.push({ event: evento, ...params });
    if (typeof window.gtag === 'function') window.gtag('event', evento, params);
  };
  // Onde o clique aconteceu: id da seção, topo, rodapé ou barra fixa do celular
  const localDe = (el) =>
    el.closest('.barra-movel') ? 'barra_movel'
      : el.closest('.topo') ? 'topo'
      : el.closest('.rodape') ? 'rodape'
      : el.closest('section[id]')?.id || el.closest('section')?.className.split(' ')[0] || 'pagina';
  const texto = (el) => el.textContent.trim().replace(/\s+/g, ' ').slice(0, 80);

  document.addEventListener('click', (e) => {
    const a = e.target.closest('a');
    if (!a) return;
    const href = a.getAttribute('href') || '';
    if (a.dataset.evento === 'whatsapp' || /wa\.me|api\.whatsapp\.com/.test(href)) {
      rastreia('contato_whatsapp', { local: localDe(a), botao: texto(a) });
      window.fbq?.('track', 'Contact');
    } else if (href.endsWith('.pdf')) {
      rastreia('download_catalogo', { catalogo: href.split('/').pop().replace('.pdf', ''), local: localDe(a) });
    } else if (href.includes('instagram.com')) {
      rastreia('clique_instagram', { local: localDe(a) });
    } else if (href.startsWith('mailto:')) {
      rastreia('clique_email', { local: localDe(a) });
    } else if (a.dataset.evento === 'mapa' || href.includes('google.com/maps')) {
      rastreia('abrir_mapa', { local: localDe(a) });
    }
  });

  // Pergunta frequente aberta
  document.querySelectorAll('.ficha details').forEach((d) => d.addEventListener('toggle', () => {
    if (d.open) rastreia('faq_aberta', { pergunta: texto(d.querySelector('summary')) });
  }));

  // Seções vistas (uma vez por visita): mostra até onde as pessoas chegam na página
  const secoes = document.querySelectorAll('main section[id]');
  if ('IntersectionObserver' in window && secoes.length) {
    const vistas = new IntersectionObserver((itens) => itens.forEach((i) => {
      if (i.isIntersecting) { rastreia('secao_vista', { secao: i.target.id }); vistas.unobserve(i.target); }
    }), { threshold: 0.4 });
    secoes.forEach((s) => vistas.observe(s));
  }

  // Busca e filtros do catálogo (site completo)
  let espera;
  document.querySelector('[data-busca]')?.addEventListener('input', (e) => {
    clearTimeout(espera);
    const termo = e.target.value.trim();
    if (termo.length >= 3) espera = setTimeout(() => rastreia('busca_produto', { termo: termo.slice(0, 50) }), 1200);
  });
  document.querySelectorAll('[data-filtrar]').forEach((f) => f.addEventListener('click', () => rastreia('filtro_produto', { filtro: f.dataset.filtrar })));

  // ── Green Week ───────────────────────────────────────────────────────────
  // Contagem regressiva até o grande lançamento; no dia, mostra "É hoje!".
  const contagem = document.querySelector('[data-contagem]');
  if (contagem) {
    const lancamento = Date.parse(contagem.dataset.alvo);
    const fim = Date.parse(contagem.dataset.fim);
    const rotulo = contagem.querySelector('[data-rotulo-contagem]');
    const numeros = contagem.querySelector('.gw-contagem__numeros');
    const pad = (n) => String(n).padStart(2, '0');
    const atualiza = () => {
      const agora = Date.now();
      let alvo = null;
      if (lancamento && agora < lancamento) { alvo = lancamento; rotulo.textContent = 'O grande lançamento começa em'; }
      else if (fim && agora <= fim) { rotulo.textContent = 'É hoje! O lançamento está acontecendo no Grupo VIP'; }
      else { rotulo.textContent = 'O lançamento terminou. Cadastre-se para a próxima Green Week'; }
      numeros.hidden = !alvo;
      if (!alvo) return;
      const s = Math.floor((alvo - agora) / 1000);
      // Atualiza cada número e dá um "tique" animado só nos que mudaram
      [['dias', Math.floor(s / 86400)], ['horas', pad(Math.floor((s % 86400) / 3600))],
        ['min', pad(Math.floor((s % 3600) / 60))], ['seg', pad(s % 60)]].forEach(([k, v]) => {
        const el = numeros.querySelector(`[data-${k}]`);
        if (el.textContent === String(v)) return;
        el.textContent = v;
        el.classList.remove('tique'); void el.offsetWidth; el.classList.add('tique');
      });
    };
    atualiza();
    setInterval(atualiza, 1000);
  }

  // Carrossel de produtos do hero: troca a cada 4,5 s, pausa ao passar o mouse ou focar,
  // aceita deslizar no celular e os pontinhos. Com "reduzir movimento", só troca manualmente.
  document.querySelectorAll('[data-carrossel]').forEach((car) => {
    const slides = [...car.querySelectorAll('.gw-slide')];
    const pontos = [...car.querySelectorAll('.gw-carrossel__pontos button')];
    if (slides.length < 2) return;
    let atual = 0, timer = null, x0 = null;
    const auto = !window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const vai = (n) => {
      atual = (n + slides.length) % slides.length;
      slides.forEach((s, i) => { s.classList.toggle('ativo', i === atual); s.toggleAttribute('aria-hidden', i !== atual); });
      pontos.forEach((p, i) => p.setAttribute('aria-current', String(i === atual)));
    };
    const para = () => { clearInterval(timer); timer = null; };
    const roda = () => { if (auto && !timer) timer = setInterval(() => vai(atual + 1), 4500); };
    pontos.forEach((p, i) => p.addEventListener('click', () => { vai(i); para(); roda(); }));
    car.addEventListener('mouseenter', para);
    car.addEventListener('mouseleave', roda);
    car.addEventListener('focusin', para);
    car.addEventListener('focusout', roda);
    car.addEventListener('touchstart', (e) => { x0 = e.touches[0].clientX; }, { passive: true });
    car.addEventListener('touchend', (e) => {
      if (x0 === null) return;
      const dx = e.changedTouches[0].clientX - x0; x0 = null;
      if (Math.abs(dx) > 40) { vai(atual + (dx < 0 ? 1 : -1)); para(); roda(); }
    });
    document.addEventListener('visibilitychange', () => (document.hidden ? para() : roda()));
    roda();
  });

  // Cadastro do Grupo VIP: valida, envia ao webhook (n8n) e, só quando o envio dá certo,
  // mostra a confirmação e dispara o evento de lead (generate_lead) no dataLayer.
  const gw = document.querySelector('[data-form-greenweek]');
  // Esconde a barra fixa do celular enquanto o formulário está na tela
  const barraCampanha = document.querySelector('.barra-movel--campanha');
  const secaoCadastro = document.getElementById('cadastro');
  if (barraCampanha && secaoCadastro && 'IntersectionObserver' in window) {
    new IntersectionObserver(([i]) => barraCampanha.classList.toggle('escondida', i.isIntersecting), { threshold: 0.15 }).observe(secaoCadastro);
  }
  if (gw) {
    const erro = gw.querySelector('[data-erro]');
    const sucesso = document.querySelector('[data-sucesso]');
    const botaoEnviar = gw.querySelector('[type="submit"]');
    const rotuloBotao = botaoEnviar.querySelector('[data-rotulo]');
    const params = new URLSearchParams(location.search);
    const utm = Object.fromEntries(['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term'].map((k) => [k, params.get(k) || '']));
    let comecou = false;
    gw.addEventListener('focusin', () => { if (!comecou) { comecou = true; rastreia('greenweek_inicio_cadastro', { form_id: 'greenweek_grupo_vip' }); } });

    const zap = gw.querySelector('[name="whatsapp"]');
    zap.addEventListener('input', () => {
      const d = zap.value.replace(/\D/g, '').slice(0, 11);
      zap.value = d.length > 6 ? `(${d.slice(0, 2)}) ${d.slice(2, d.length - 4)}-${d.slice(-4)}` : d.length > 2 ? `(${d.slice(0, 2)}) ${d.slice(2)}` : d;
    });

    const valida = (d) => {
      gw.querySelectorAll('[aria-invalid]').forEach((el) => el.removeAttribute('aria-invalid'));
      const falhas = [];
      const marca = (sel, msg) => { gw.querySelector(sel)?.setAttribute('aria-invalid', 'true'); falhas.push(msg); };
      if ((d.nome || '').trim().length < 2) marca('[name="nome"]', 'seu nome');
      const digitos = (d.whatsapp || '').replace(/\D/g, '');
      if (digitos.length < 10 || digitos.length > 11) marca('[name="whatsapp"]', 'um WhatsApp com DDD');
      if (!d.perfil) marca('[name="perfil"]', 'o seu perfil');
      if ((d.cidade || '').trim().length < 2) marca('[name="cidade"]', 'a sua cidade');
      if (!d.ja_cliente) marca('.gw-opcoes', 'se já compra com a Belnic');
      if (!d.aceite) marca('.gw-aceite', 'o aceite de contato');
      return falhas;
    };
    const prioridade = (d) => (d.ja_cliente === 'Sim' ? 'Alta' : /estudante|consumidor/i.test(d.perfil) ? 'Baixa' : 'Média');
    const mostraErro = (html) => { erro.innerHTML = html; erro.hidden = false; };

    gw.addEventListener('submit', async (e) => {
      e.preventDefault();
      const d = Object.fromEntries(new FormData(gw));
      if (d.site_empresa) return; // robô
      const falhas = valida(d);
      if (falhas.length) {
        mostraErro(`Falta informar: ${falhas.join(', ')}.`);
        (gw.querySelector('input[aria-invalid], select[aria-invalid]') || gw.querySelector('[aria-invalid] input'))?.focus();
        return;
      }
      erro.hidden = true;
      botaoEnviar.disabled = true;
      rotuloBotao.textContent = 'Enviando...';
      const digitos = d.whatsapp.replace(/\D/g, '');
      const lead = {
        nome: d.nome.trim(), whatsapp: d.whatsapp, whatsapp_e164: `+55${digitos}`, perfil: d.perfil,
        cidade: d.cidade.trim(), negocio: (d.negocio || '').trim(), instagram: (d.instagram || '').trim(),
        ja_cliente: d.ja_cliente, prioridade: prioridade(d), aceite_contato: 'sim',
        origem: 'site_greenweek', pagina: location.origin + location.pathname, enviado_em: new Date().toISOString(), ...utm,
      };
      const msgWhats = ['Olá! Quero entrar no Grupo VIP da Green Week.', `Nome: ${lead.nome}`, `Perfil: ${lead.perfil}`,
        lead.negocio && `Negócio: ${lead.negocio}`, `Cidade: ${lead.cidade}`, lead.instagram && `Instagram: ${lead.instagram}`,
        `Já sou cliente Belnic: ${lead.ja_cliente}`].filter(Boolean).join('\n');
      const linkWhats = `https://wa.me/${gw.dataset.whatsapp}?text=${encodeURIComponent(msgWhats)}`;
      const endpoint = gw.dataset.endpoint;

      try {
        if (endpoint) {
          // Formulário urlencoded = requisição "simples" (sem preflight de CORS). O n8n precisa
          // responder com Access-Control-Allow-Origin para o site ler a resposta (veja GREENWEEK.md).
          const ctrl = new AbortController();
          const tempo = setTimeout(() => ctrl.abort(), 15000);
          const resp = await fetch(endpoint, { method: 'POST', body: new URLSearchParams(lead), signal: ctrl.signal });
          clearTimeout(tempo);
          if (!resp.ok) throw new Error(`HTTP ${resp.status}`);
        } else {
          window.open(linkWhats, '_blank', 'noopener');
        }
        // Lead enviado com sucesso: evento recomendado do GA4 para conversões de formulário
        rastreia('generate_lead', {
          form_id: 'greenweek_grupo_vip', lead_source: 'greenweek', perfil: lead.perfil,
          ja_cliente: lead.ja_cliente, prioridade: lead.prioridade, cidade: lead.cidade,
        });
        window.fbq?.('track', 'Lead');
        gw.hidden = true;
        sucesso.hidden = false;
        sucesso.focus();
      } catch (falha) {
        rastreia('greenweek_erro_envio', { form_id: 'greenweek_grupo_vip', erro: String(falha.message || falha).slice(0, 80) });
        mostraErro(`Não conseguimos enviar seu cadastro agora. Tente de novo em instantes ou <a href="${linkWhats}" target="_blank" rel="noopener">envie pelo WhatsApp</a>.`);
        botaoEnviar.disabled = false;
        rotuloBotao.textContent = 'Quero meu acesso VIP';
      }
    });
  }
})();
