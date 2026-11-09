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
    'Distribuidora oficial Mirra Professional e Maison Visage no RS: produtos para salão, terapia capilar, cursos e suporte da Grande Porto Alegre ao Litoral e Sul.',
  whatsapp: '5551989086044',
  whatsappExibicao: '(51) 98908-6044',
  email: 'contato@belniccosmeticos.com',
  instagram: 'https://www.instagram.com/belnicoficial',
  instagramUser: '@belnicoficial',
  facebook: 'https://www.facebook.com/belniccosmeticos',
  regiao: 'Porto Alegre e região',
  uf: 'RS',
  // Cidades atendidas, por região (lista enviada pela Belnic em 21/10/2026)
  regioes: [
    { nome: 'Porto Alegre e Região Metropolitana', cidades: ['Porto Alegre', 'Alvorada', 'Cachoeirinha', 'Canoas', 'Esteio', 'Gravataí', 'Guaíba', 'Nova Santa Rita', 'Sapucaia do Sul', 'Viamão', 'Santo Antônio da Patrulha'] },
    { nome: 'Vales do Sinos, Paranhana e Caí', cidades: ['Novo Hamburgo', 'São Leopoldo', 'Campo Bom', 'Estância Velha', 'Dois Irmãos', 'Ivoti', 'Sapiranga', 'Nova Hartz', 'Araricá', 'Portão', 'Lindolfo Collor', 'Morro Reuter', 'Parobé', 'Taquara', 'Igrejinha', 'Três Coroas', 'Riozinho', 'Rolante', 'Montenegro', 'São Sebastião do Caí', 'Bom Princípio', 'Feliz', 'Alto Feliz', 'Linha Nova', 'Vale Real', 'Picada Café'] },
    { nome: 'Serra Gaúcha', cidades: ['Caxias do Sul', 'Bento Gonçalves', 'Farroupilha', 'Garibaldi', 'Carlos Barbosa', 'Flores da Cunha', 'São Marcos', 'Nova Petrópolis', 'Gramado', 'Canela', 'Nova Prata', 'Veranópolis'] },
    { nome: 'Litoral Norte', cidades: ['Capão da Canoa', 'Xangri-lá', 'Imbé', 'Tramandaí', 'Nova Tramandaí', 'Cidreira', 'Quintão', 'Osório', 'Torres', 'Arroio do Sal', 'Terra de Areia', 'Três Cachoeiras', 'Três Forquilhas', 'Mampituba', 'Morrinhos do Sul', 'Dom Pedro de Alcântara'] },
    { nome: 'Vales do Taquari e Rio Pardo', cidades: ['Lajeado', 'Teutônia', 'Santa Cruz do Sul', 'Venâncio Aires'] },
    { nome: 'Costa Doce e Centro-Sul', cidades: ['Camaquã', 'Tapes', 'Arambaré', 'Cristal', 'Chuvisca', 'Dom Feliciano', 'Amaral Ferrador', 'Cerro Grande do Sul', 'Sentinela do Sul', 'São Lourenço do Sul'] },
    { nome: 'Região Sul', cidades: ['Pelotas', 'Rio Grande', 'São José do Norte', 'Capão do Leão', 'Morro Redondo', 'Arroio do Padre', 'Turuçu', 'Canguçu', 'Piratini', 'Pedro Osório', 'Cerrito', 'Herval', 'Jaguarão', 'Arroio Grande', 'Santa Vitória do Palmar', 'Chuí'] },
  ],
  // Resumo da área de atendimento para textos
  areaTexto: 'Porto Alegre, Vales, Serra Gaúcha, Litoral Norte e Sul do RS',
  // Medição: deixe vazio até ter os códigos (veja MEDICAO.md).
  // O GA4 roda direto no site (gtag) e o GTM fica para outras tags (Meta Pixel etc.).
  // Não crie tag do GA4 dentro do GTM, senão as visitas contam em dobro.
  gtm: 'GTM-5KTD5WNN',
  ga4: 'G-3QD545KYWP',
  googleVerificacao: '', // conteúdo da meta tag do Google Search Console (opcional se verificar pelo DNS)
  bingVerificacao: '', // conteúdo da meta tag do Bing Webmaster Tools
  // Green Week (página /greenweek/)
  greenweek: {
    // Fase da página /greenweek/: 'campanha' (cadastro no Grupo VIP, com contagem regressiva) ou
    // 'lista-espera' (depois do lançamento: cadastro para a edição do ano seguinte, mesmo webhook).
    fase: 'lista-espera',
    // Grande lançamento no Grupo VIP (horário de Brasília). A contagem regressiva vai até `lancamento`;
    // até `fim` a página mostra "É hoje!".
    lancamento: '2026-11-09T00:00:00-03:00',
    fim: '2026-11-09T23:59:59-03:00',
    lancamentoTexto: '9 de novembro',
    lancamentoCurto: '09.11',
    // Desconto máximo divulgado na página (vazio = não mostra)
    desconto: 'até 70%',
    // Card da Green Week na página /links/. false = escondido (fica guardado em links.mjs).
    // Escondido de novo em 09/11/2026: a Green Week 2026 acabou e a página virou lista de espera.
    linkNaBio: false,
    // Webhook (n8n) que recebe os cadastros. Vazio = o cadastro segue pelo WhatsApp da Belnic.
    endpoint: 'https://n8n.metingertech.com.br/webhook/greenweek',
  },
};

// Lista simples de todas as cidades (ordem alfabética)
site.cidades = site.regioes.flatMap((r) => r.cidades).sort((a, b) => a.localeCompare(b, 'pt-BR'));

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
