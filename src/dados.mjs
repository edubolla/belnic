// Carrega os JSON dos catálogos (src/data) e normaliza para as páginas.
import { readFileSync, existsSync } from 'node:fs';
import { join } from 'node:path';

export const marcas = {
  'maison-visage': {
    slug: 'maison-visage',
    nome: 'Maison Visage',
    url: '/marcas/maison-visage/',
    resumo: 'Cosméticos profissionais de alta performance desde 2000: tratamento e finalização capilar, terapia capilar Spa Therapy e cuidados corporais.',
  },
  'mirra-professional': {
    slug: 'mirra-professional',
    nome: 'Mirra Professional',
    url: '/marcas/mirra-professional/',
    resumo: 'Há mais de 25 anos em cuidados pessoais: tratamento, coloração, alisamento e finalização profissional para salões de beleza.',
  },
};

// slug no catálogo Terapia Capilar → slug no catálogo Maison Visage (mesmo produto)
export const ALIAS = {
  'agua-termal': 'spa-therapy-thermal-water',
  'argila-preta': 'spa-therapy-argila-preta',
  'argila-verde': 'spa-therapy-argila-verde',
  'espuma-de-limpeza-clorexidina': 'spa-therapy-chlorhexidine-cleansing',
  'oleo-essencial-alecrim-limao': 'spa-therapy-essential-oil-alecrim-limao',
  'oleo-essencial-eucalipto-globulus': 'spa-therapy-essential-oil-eucalipto-globulus',
  'oleo-essencial-gengibre': 'spa-therapy-essential-oil-gengibre',
  'oleo-essencial-lavanda': 'spa-therapy-essential-oil-lavanda',
  'oleo-essencial-melaleuca-laranja': 'spa-therapy-essential-oil-melaleuca-laranja',
  'oleo-essencial-menta-piperita': 'spa-therapy-essential-oil-menta-piperita',
  'mascara-de-carvao': 'spa-therapy-charcoal-mask',
  'oleo-vegetal-avocado': 'spa-therapy-vegetable-oil-avocado',
  'oleo-vegetal-jojoba': 'spa-therapy-vegetable-oil-jojoba',
  'oleo-vegetal-semente-de-uva': 'spa-therapy-vegetable-oil-semente-de-uva',
  'tonico-growth-factor': 'spa-therapy-growth-factor-tonic',
  'vitamina-b5': 'spa-therapy-vitamin-b5',
  'vitamin-biotin': 'spa-therapy-biotin',
  'vitamina-e': 'spa-therapy-vitamin-e',
  'scalp-calming': 'home-spa-therapy-scalp-calming',
};

const marcaDe =(nome = '') => (/mirra/i.test(nome) ? 'mirra-professional' : 'maison-visage');

export function carregarDados(raiz) {
  const ler = (f) => {
    const p = join(raiz, 'src/data', `${f}.json`);
    return existsSync(p) ? JSON.parse(readFileSync(p, 'utf8')) : null;
  };
  const fontes = ['maison-visage', 'mirra', 'terapia-capilar'].map(ler).filter(Boolean);

  const produtos = new Map();
  const linhas = new Map();
  const protocolos = [];
  const institucional = {};

  for (const f of fontes) {
    const marca = marcaDe(f.marca);
    institucional[f.catalogo] = f.institucional || '';
    for (const l of f.linhas || []) {
      const chave = `${marca}:${l.slug}`;
      if (!linhas.has(chave)) linhas.set(chave, { ...l, marca, catalogo: f.catalogo, produtos: [] });
    }
    for (const pr of f.produtos || []) {
      // Produto do catálogo de Terapia Capilar que já existe no catálogo Maison Visage: mescla.
      const alvo = produtos.get(ALIAS[pr.slug]);
      if (alvo) {
        for (const [k, v] of Object.entries(pr)) {
          const vazio = alvo[k] == null || (Array.isArray(alvo[k]) && !alvo[k].length);
          if (vazio && v != null) alvo[k] = v;
        }
        if (pr.imagem) alvo.img = `/assets/img/produtos/${pr.imagem}`;
        if (pr.nome !== alvo.nome) alvo.nomeAlternativo = pr.nome;
        continue;
      }
      let slug = pr.slug;
      const existente = produtos.get(slug);
      // Mesmo produto em dois catálogos: fica com a versão mais completa.
      if (existente) {
        if (existente.marca === marca && existente.nome.toLowerCase() === pr.nome.toLowerCase()) {
          if (JSON.stringify(pr).length <= JSON.stringify(existente).length) continue;
        } else slug = `${slug}-${f.catalogo}`;
      }
      produtos.set(slug, {
        ...pr,
        slug,
        marca,
        catalogo: f.catalogo,
        linhaChave: `${marca}:${pr.linha}`,
        url: `/produtos/${slug}/`,
        img: pr.imagem ? `/assets/img/produtos/${pr.imagem}` : null,
        volumes: pr.volumes || [],
        beneficios: pr.beneficios || [],
        ativos: pr.ativos || [],
        selos: pr.selos || [],
      });
    }
    for (const p of f.protocolos || []) protocolos.push({ ...p, marca, produtos: (p.produtos || []).map((s) => ALIAS[s] || s) });
  }

  const lista = [...produtos.values()].sort((a, b) => a.nome.localeCompare(b.nome, 'pt-BR'));
  for (const p of lista) linhas.get(p.linhaChave)?.produtos.push(p);
  for (const p of lista) {
    p.linhaObj = linhas.get(p.linhaChave) || null;
    // Sem foto própria: usa a foto de grupo da linha, quando houver.
    if (!p.img && p.linhaObj?.imagem_linha) { p.img = `/assets/img/produtos/${p.linhaObj.imagem_linha}`; p.imgDaLinha = true; }
  }
  for (const l of linhas.values()) l.img = l.imagem_linha ? `/assets/img/produtos/${l.imagem_linha}` : l.produtos.find((p) => p.img)?.img || null;

  return { marcas, produtos: lista, linhas: [...linhas.values()], protocolos, institucional, porSlug: produtos };
}
