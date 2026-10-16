// Dados globais do site. Edite aqui telefone, cidades, redes etc.
export const site = {
  nome: 'Belnic Cosméticos',
  marca: 'Belnic',
  slogan: 'Hub da Beleza',
  url: 'https://belniccosmeticos.com',
  descricao:
    'Distribuidora oficial Maison Visage e Mirra Professional no RS. Produtos profissionais, formação e suporte para salões, clínicas estéticas e profissionais da beleza em Porto Alegre e região.',
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
