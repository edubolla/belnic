// Reaproveita a política do site completo, trocando o link que só existe lá.
import pagina from '../pages/privacidade.mjs';

export default (ctx) => {
  const p = pagina(ctx);
  return { ...p, html: p.html.replaceAll('href="/seja-parceiro/"', 'href="/#parceiro"') };
};
