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

  // Evento de clique no WhatsApp para GA4/Meta, se instalados depois
  document.addEventListener('click', (e) => {
    const a = e.target.closest('[data-evento="whatsapp"]');
    if (!a) return;
    window.gtag?.('event', 'contato_whatsapp', { pagina: location.pathname });
    window.fbq?.('track', 'Contact');
  });
})();
