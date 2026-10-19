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
})();
