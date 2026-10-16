import { pagina, icon, migalhas, breadcrumb, esc, btnWhats } from '../layout.mjs';
import { site } from '../site.mjs';
import { faixaCTA } from '../componentes.mjs';

const grupos = [
  ['Porto Alegre e Região Metropolitana', ['Porto Alegre', 'Canoas', 'Alvorada', 'Gravataí', 'Viamão', 'Guaíba', 'Cachoeirinha', 'Sapucaia do Sul', 'Nova Santa Rita', 'Esteio']],
  ['Vale do Sinos', ['São Leopoldo', 'Novo Hamburgo', 'Estância Velha', 'Campo Bom', 'Sapiranga', 'Dois Irmãos', 'Ivoti', 'Araricá']],
  ['Vale do Paranhana', ['Parobé', 'Taquara', 'Igrejinha', 'Três Coroas', 'Nova Hartz']],
  ['Serra Gaúcha e arredores', ['Gramado', 'Nova Petrópolis', 'Picada Café', 'Feliz', 'Linha Nova', 'Vale Real', 'Lindolfo Collor', 'Morro Reuter', 'Santa Maria do Herval']],
];

export default ({ versao }) => {
  const caminho = '/onde-atendemos/';
  const listados = grupos.flatMap((g) => g[1]);
  const falta = site.cidades.filter((c) => !listados.includes(c));
  if (falta.length) grupos[3][1].push(...falta);
  const corpo = `
<section class="cabecalho-pagina"><div class="container">
  ${migalhas([['Início', '/'], ['Onde atendemos', caminho]])}
  <span class="sobretitulo">Cobertura</span>
  <h1>Onde a Belnic atende no Rio Grande do Sul</h1>
  <p class="lead">Representantes visitam salões, clínicas e profissionais em ${site.cidades.length} cidades de Porto Alegre, Vale do Sinos, Vale do Paranhana e Serra Gaúcha.</p>
  <div class="botoes" style="margin-top:24px">
    <a class="btn btn--primario" href="${site.mapaUrl}" target="_blank" rel="noopener">${icon.pin}<span>Abrir mapa de atendimento</span></a>
  </div>
</div></section>

<section class="secao secao--branca">
  <div class="container">
    ${grupos.map(([nome, cs]) => `
    <div class="revela" style="margin-bottom:32px">
      <h2 style="font-size:1.5rem">${esc(nome)}</h2>
      <ul class="cidades" style="margin-top:14px">${cs.map((c) => `<li>${esc(c)}</li>`).join('')}</ul>
    </div>`).join('')}
    <p>Não encontrou a sua cidade? Fale com a gente: podemos avaliar o atendimento na sua região.</p>
  </div>
</section>

<section class="secao secao--verde">
  <div class="container dividido">
    <div class="revela">
      <span class="sobretitulo">Para quem é cliente final</span>
      <h2>Procurando um salão parceiro perto de você?</h2>
      <p class="lead">A Belnic vende para profissionais. Se você quer usar nossos produtos, peça pelo WhatsApp a indicação do salão parceiro mais próximo.</p>
    </div>
    <div class="botoes revela">
      ${btnWhats('Pedir indicação de salão', 'Olá! Gostaria de saber qual salão parceiro Belnic fica mais perto de mim. Minha cidade é: ', 'btn btn--claro')}
      <a class="btn btn--contorno" style="color:#fff" href="/sou-consumidor-final/">Sou consumidor final ${icon.arrow}</a>
    </div>
  </div>
</section>

${faixaCTA({ titulo: 'Tem salão ou clínica nessas regiões?', texto: 'Cadastre-se como parceiro e receba a visita de um representante da sua região.' })}`;

  return {
    caminho,
    html: pagina({
      titulo: 'Onde atendemos | Distribuidora Belnic no RS',
      descricao: 'Veja as cidades atendidas pela Belnic, distribuidora Maison Visage e Mirra Professional: Porto Alegre, Vale do Sinos, Vale do Paranhana e Serra Gaúcha.',
      caminho, corpo, versao,
      schema: [
        { '@type': 'Service', '@id': `${site.url}${caminho}#servico`, name: 'Distribuição de produtos profissionais para salões e clínicas', serviceType: 'Distribuição de cosméticos profissionais', provider: { '@id': `${site.url}/#organizacao` }, areaServed: site.cidades.map((c) => ({ '@type': 'City', name: `${c}, ${site.uf}` })) },
        breadcrumb([['Início', '/'], ['Onde atendemos', caminho]]),
      ],
    }),
  };
};
