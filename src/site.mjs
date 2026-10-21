// Dados globais do site. Edite aqui telefone, cidades, redes etc.
export const site = {
  // Versão publicada no domínio: 'landing' (página única, contratada agora) ou 'completo'
  // (site com marcas e 176 páginas de produto). Dá para forçar com `node build.mjs --completo`.
  modo: 'landing',
  nome: 'Belnic Cosméticos',
  marca: 'Belnic',
  slogan: 'Hub da Beleza',
  url: 'https://belniccosmeticos.com',
  descricao:
    'Distribuidora oficial Mirra Professional e Maison Visage no RS: produtos para salão, terapia capilar, cursos e suporte em Porto Alegre e região.',
  whatsapp: '5551989086044',
  whatsappExibicao: '(51) 98908-6044',
  email: 'contato@belniccosmeticos.com',
  instagram: 'https://www.instagram.com/belnicoficial',
  instagramUser: '@belnicoficial',
  facebook: 'https://www.facebook.com/belniccosmeticos',
  regiao: 'Porto Alegre e região',
  uf: 'RS',
  // Cidades atendidas (mapa oficial no Google My Maps + página "sou consumidor final" do site antigo)
  cidades: [
    'Porto Alegre', 'Canoas', 'Alvorada', 'Gravataí', 'Viamão', 'Guaíba', 'Cachoeirinha',
    'Sapucaia do Sul', 'Nova Santa Rita', 'São Leopoldo', 'Novo Hamburgo', 'Estância Velha',
    'Campo Bom', 'Sapiranga', 'Dois Irmãos', 'Ivoti', 'Lindolfo Collor', 'Morro Reuter',
    'Santa Maria do Herval', 'Picada Café', 'Nova Petrópolis', 'Nova Hartz', 'Araricá',
    'Parobé', 'Taquara', 'Igrejinha', 'Três Coroas', 'Esteio', 'Feliz', 'Gramado', 'Linha Nova', 'Vale Real',
  ],
  // Medição: deixe vazio até ter os códigos (veja MEDICAO.md).
  // Use o GTM (recomendado) OU o GA4 direto, não os dois ao mesmo tempo.
  gtm: '', // ex.: 'GTM-XXXXXXX'
  ga4: '', // ex.: 'G-XXXXXXXXXX' (só se não usar o GTM)
  googleVerificacao: '', // conteúdo da meta tag do Google Search Console (opcional se verificar pelo DNS)
  bingVerificacao: '', // conteúdo da meta tag do Bing Webmaster Tools
  // Green Week (página /greenweek/)
  greenweek: {
    // Grande lançamento no Grupo VIP (horário de Brasília). A contagem regressiva vai até `lancamento`;
    // até `fim` a página mostra "É hoje!".
    lancamento: '2026-11-09T00:00:00-03:00',
    fim: '2026-11-09T23:59:59-03:00',
    lancamentoTexto: '9 de novembro',
    lancamentoCurto: '09.11',
    // Webhook (n8n) que recebe os cadastros. Vazio = o cadastro segue pelo WhatsApp da Belnic.
    endpoint: 'https://n8n.metingertech.com.br/webhook/green-week',
  },
  mapaUrl: 'https://www.google.com/maps/d/viewer?mid=1pcLneDbtBDrdGUFPIpXJ9lNRbPDYYBI',
};

export const wa = (texto = 'Olá! Vim pelo site da Belnic e gostaria de mais informações.') =>
  `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(texto)}`;

export const nav = [
  { href: '/marcas/maison-visage/', label: 'Maison Visage' },
  { href: '/marcas/mirra-professional/', label: 'Mirra Professional' },
  { href: '/produtos/', label: 'Produtos' },
  { href: '/terapia-capilar/', label: 'Terapia Capilar' },
  { href: '/formacao/', label: 'Formação' },
  { href: '/sobre/', label: 'Sobre' },
  { href: '/contato/', label: 'Contato' },
];
