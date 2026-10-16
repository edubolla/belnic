import { pagina, icon, migalhas, btnWhats, breadcrumb, esc } from '../layout.mjs';
import { site } from '../site.mjs';
import { faixaCTA } from '../componentes.mjs';

const MSG = 'Oi, gostaria de mais informações sobre os Cursos.';
const gravados = [
  ['Terapia Capilar', 'Rose Gebrim'], ['Estratégia de vendas: Plástica x Luxury'], ['Estratégia de vendas: Fusion CMC x Protein Fusion'],
  ['Laque + Protetor Facial', 'Olya'], ['Terapia Capilar e Progressiva Perfect Liss'], ['Cacheadas', 'Calebe Lopes'],
  ['Limpeza de pele Olya + colorações', 'Olya'], ['Protocolo para seborreia'], ['Coloração 000 + efeito gloss'],
  ['O segredo das âmpolas'], ['Colorações e tonalizantes', 'Dinho'], ['Gestão de campanhas', 'Marcelo'],
  ['Plástica capilar', 'Nathalia'], ['Coloração: aumente suas vendas'], ['Mega hair', 'Janice Almeida'],
  ['Alisamento profissional', 'Kelly Nakaia'], ['Spa Therapy, partes 1 e 2', 'Daiane Carneiro'],
];
const gil = ['Colorimetria (módulos 1 e 2)', 'Tratamentos', 'Especial Tratamentos, Dia da Beleza', 'Finalizadores Maison', 'Tratamentos veganos Maison'];

export default ({ versao }) => {
  const caminho = '/formacao/';
  const prov = { '@id': `${site.url}/#organizacao` };
  const cursos = [
    ['Imersão em Terapia Capilar', 'Imersão presencial de dois dias em Novo Hamburgo (RS), com teoria, posicionamento profissional, diagnósticos e prática com modelos reais.'],
    ['Workshop The Blond\'s Secret', 'Workshop com Pedro Pinheiro, especialista Mirra Professional e Maison Visage, sobre técnicas de loiros.'],
    ['Treinamentos gravados Belnic', 'Catálogo de treinamentos em vídeo sobre terapia capilar, coloração, alisamento, vendas e gestão, com educadores das marcas.'],
    ['Formação Gil Minogue', 'Formação em módulos sobre colorimetria, tratamentos e finalizadores Maison.'],
  ];
  const corpo = `
<section class="cabecalho-pagina"><div class="container">
  ${migalhas([['Início', '/'], ['Formação', caminho]])}
  <span class="sobretitulo">Formação Belnic</span>
  <h1>Cursos e treinamentos para profissionais da beleza</h1>
  <p class="lead">Imersões presenciais, workshops e treinamentos em vídeo para você dominar técnicas, aplicar protocolos com segurança e vender mais no seu salão.</p>
  <div class="botoes" style="margin-top:24px">${btnWhats('Saber mais sobre os cursos', MSG)}</div>
</div></section>

<section class="secao secao--branca">
  <div class="container dividido">
    <div class="revela">
      <span class="sobretitulo">Presencial · Novo Hamburgo</span>
      <h2>Imersão em Terapia Capilar</h2>
      <p class="lead">Dois dias intensos de conhecimento e prática, com a educadora Daiane Carneiro.</p>
      <p>No primeiro dia, teoria, posicionamento profissional e diagnósticos. No segundo, aprofundamento e mão na massa: aplicação de protocolos em modelos reais, com os aparelhos de terapia capilar. Você sai apto a aplicar o que aprendeu.</p>
      <p><strong>Próximas turmas:</strong> consulte datas e condições com a nossa equipe.</p>
      <div class="botoes" style="margin-top:20px">${btnWhats('Consultar próxima turma', MSG)}</div>
    </div>
    <ul class="lista-check revela" style="margin-top:24px">
      <li>Diagnóstico e montagem de protocolos personalizados</li>
      <li>Prática com modelos reais</li>
      <li>Como vender Home Care com autoridade</li>
      <li>Serviços inovadores para fidelizar clientes</li>
    </ul>
  </div>
</section>

<section class="secao">
  <div class="container dividido">
    <div class="revela">
      <span class="sobretitulo">Workshop</span>
      <h2>The Blond's Secret, com Pedro Pinheiro</h2>
      <p>Workshop conduzido por Pedro Pinheiro, especialista Mirra Professional e Maison Visage. Para quem quer se aprofundar na técnica e no resultado de loiros.</p>
      <div class="botoes" style="margin-top:20px">${btnWhats('Quero participar', MSG, 'btn btn--contorno')}</div>
    </div>
    <div class="revela" style="margin-top:24px">
      <span class="sobretitulo">Módulos</span>
      <h2>Formação Gil Minogue</h2>
      <ul class="lista-check">${gil.map((g) => `<li>${esc(g)}</li>`).join('')}</ul>
    </div>
  </div>
</section>

<section class="secao secao--areia">
  <div class="container">
    <div class="cabeca revela">
      <span class="sobretitulo">Treinamentos gravados</span>
      <h2>Assista no seu ritmo</h2>
      <p class="lead">Um catálogo de treinamentos em vídeo, por tema, com educadores e especialistas das marcas.</p>
    </div>
    <div class="grade grade--3">
      ${gravados.map(([t, e]) => `<article class="cartao revela"><h3 style="font-size:1.15rem">${esc(t)}</h3>${e ? `<p>com ${esc(e)}</p>` : ''}</article>`).join('')}
    </div>
    <p style="margin-top:24px">Peça o acesso aos treinamentos gravados pelo WhatsApp.</p>
  </div>
</section>

${faixaCTA({ titulo: 'Quer saber qual formação combina com o seu salão?', texto: 'Conte para a nossa equipe o que você faz hoje e indicamos o melhor caminho de capacitação.', msg: MSG })}`;

  const lista = {
    '@type': 'ItemList', name: 'Cursos e treinamentos Belnic',
    itemListElement: cursos.map(([name, description], i) => ({
      '@type': 'ListItem', position: i + 1,
      item: { '@type': 'Course', name, description, provider: prov, inLanguage: 'pt-BR', url: `${site.url}${caminho}` },
    })),
  };
  return {
    caminho,
    html: pagina({
      titulo: 'Cursos de terapia capilar e formação | Belnic',
      descricao: 'Imersão em Terapia Capilar, workshop The Blond\'s Secret, treinamentos gravados e formação em colorimetria para salões e profissionais da beleza no RS.',
      caminho, corpo, versao,
      schema: [lista, breadcrumb([['Início', '/'], ['Formação', caminho]])],
    }),
  };
};
