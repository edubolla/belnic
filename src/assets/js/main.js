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
  // Contagem regressiva (data em site.mjs → greenweek.inicio)
  const contagem = document.querySelector('[data-contagem]');
  const inicio = contagem && Date.parse(contagem.dataset.contagem);
  if (inicio) {
    const pad = (n) => String(n).padStart(2, '0');
    const atualiza = () => {
      const falta = Math.max(0, inicio - Date.now());
      const s = Math.floor(falta / 1000);
      contagem.querySelector('[data-dias]').textContent = Math.floor(s / 86400);
      contagem.querySelector('[data-horas]').textContent = pad(Math.floor((s % 86400) / 3600));
      contagem.querySelector('[data-min]').textContent = pad(Math.floor((s % 3600) / 60));
      contagem.querySelector('[data-seg]').textContent = pad(s % 60);
      if (!falta) contagem.querySelector('.gw-contagem__rotulo').textContent = 'A Green Week começou no Grupo VIP';
    };
    atualiza();
    setInterval(atualiza, 1000);
  }

  // Cadastro do Grupo VIP: valida, envia para a planilha (Apps Script) e mostra a confirmação.
  // Sem endpoint configurado, envia o cadastro pelo WhatsApp da Belnic.
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
    const utm = Object.fromEntries(['utm_source', 'utm_medium', 'utm_campaign', 'utm_content']
      .map((k) => [k, new URLSearchParams(location.search).get(k) || '']));
    let comecou = false;
    gw.addEventListener('focusin', () => { if (!comecou) { comecou = true; rastreia('greenweek_inicio_cadastro'); } });

    const zap = gw.querySelector('[name="whatsapp"]');
    zap.addEventListener('input', () => {
      const d = zap.value.replace(/\D/g, '').slice(0, 11);
      zap.value = d.length > 6 ? `(${d.slice(0, 2)}) ${d.slice(2, d.length - 4)}-${d.slice(-4)}` : d.length > 2 ? `(${d.slice(0, 2)}) ${d.slice(2)}` : d;
    });

    const valida = (d) => {
      gw.querySelectorAll('[aria-invalid]').forEach((el) => el.removeAttribute('aria-invalid'));
      const falhas = [];
      const marca = (nome, msg) => { gw.querySelector(`[name="${nome}"]`)?.setAttribute('aria-invalid', 'true'); falhas.push(msg); };
      if ((d.nome || '').trim().length < 2) marca('nome', 'seu nome');
      if ((d.whatsapp || '').replace(/\D/g, '').length < 10) marca('whatsapp', 'um WhatsApp com DDD');
      if (!d.perfil) marca('perfil', 'o seu perfil');
      if ((d.cidade || '').trim().length < 2) marca('cidade', 'a sua cidade');
      if (!d.ja_cliente) falhas.push('se já compra com a Belnic');
      if (!d.aceite) falhas.push('o aceite de contato');
      return falhas;
    };

    gw.addEventListener('submit', async (e) => {
      e.preventDefault();
      const d = Object.fromEntries(new FormData(gw));
      if (d.site_empresa) return; // robô
      const falhas = valida(d);
      if (falhas.length) {
        erro.textContent = `Falta informar: ${falhas.join(', ')}.`;
        erro.hidden = false;
        gw.querySelector('[aria-invalid="true"]')?.focus();
        return;
      }
      erro.hidden = true;
      botaoEnviar.disabled = true;
      const lead = {
        nome: d.nome.trim(), whatsapp: d.whatsapp, perfil: d.perfil, cidade: d.cidade.trim(),
        negocio: (d.negocio || '').trim(), instagram: (d.instagram || '').trim(), ja_cliente: d.ja_cliente,
        pagina: location.href, ...utm,
      };
      const endpoint = gw.dataset.endpoint;
      try {
        if (endpoint) {
          // text/plain evita o preflight de CORS do Apps Script; a resposta não é lida (no-cors).
          await fetch(endpoint, { method: 'POST', mode: 'no-cors', headers: { 'Content-Type': 'text/plain;charset=utf-8' }, body: JSON.stringify(lead) });
        } else {
          const msg = ['Olá! Quero entrar no Grupo VIP da Green Week.', `Nome: ${lead.nome}`, `Perfil: ${lead.perfil}`,
            lead.negocio && `Negócio: ${lead.negocio}`, `Cidade: ${lead.cidade}`, lead.instagram && `Instagram: ${lead.instagram}`,
            `Já sou cliente Belnic: ${lead.ja_cliente}`].filter(Boolean).join('\n');
          window.open(`https://wa.me/${gw.dataset.whatsapp}?text=${encodeURIComponent(msg)}`, '_blank', 'noopener');
        }
        rastreia('greenweek_cadastro', { perfil: lead.perfil, ja_cliente: lead.ja_cliente, cidade: lead.cidade });
        window.fbq?.('track', 'Lead');
        gw.hidden = true;
        sucesso.hidden = false;
        sucesso.focus();
      } catch {
        erro.textContent = 'Não conseguimos enviar agora. Tente de novo em instantes ou chame a Belnic no WhatsApp.';
        erro.hidden = false;
        botaoEnviar.disabled = false;
      }
    });
  }
})();
