import { pagina, icon, migalhas, breadcrumb, esc, btnWhats } from '../layout.mjs';
import { site } from '../site.mjs';
import { faqHtml, faqSchema, cardParceiro } from '../componentes.mjs';

const faq = [
  ['Preciso ter CNPJ para ser parceiro?', 'Fale com a nossa equipe pelo WhatsApp: ela explica quais condições valem para o seu perfil, seja salão, clínica ou profissional autônomo.'],
  ['Existe pedido mínimo?', 'As condições comerciais são combinadas com o representante da sua região. Chame a Belnic no WhatsApp e ele entra em contato para apresentar tudo.'],
  ['A Belnic oferece treinamento aos parceiros?', 'Sim. Oferecemos imersões, workshops e treinamentos gravados. Veja em <a href="/formacao/">Formação</a>.'],
  ['Minha cidade é atendida?', 'Atendemos ' + site.cidades.length + ' cidades do RS: Grande Porto Alegre, Vales, Serra Gaúcha, Litoral Norte e Região Sul. Confira em <a href="/onde-atendemos/">Onde atendemos</a>.'],
  ['Preciso preencher algum cadastro?', 'Não. É só chamar a Belnic no WhatsApp pelo botão desta página. A conversa continua por lá, com o representante da sua região.'],
];

export default ({ versao }) => {
  const caminho = '/seja-parceiro/';
  const corpo = `
<section class="cabecalho-pagina"><div class="container">
  ${migalhas([['Início', '/'], ['Seja parceiro', caminho]])}
  <span class="sobretitulo">Seja parceiro Belnic</span>
  <h1>Seja parceiro: produtos profissionais para o seu salão</h1>
  <p class="lead">Receba as linhas Maison Visage e Mirra Professional, formação e o suporte de um representante da sua região.</p>
</div></section>

<section class="secao secao--branca">
  <div class="container dividido">
    <div class="revela">
      <span class="sobretitulo">Vantagens</span>
      <h2>O que você ganha como parceiro</h2>
      <ul class="lista-check" style="margin-top:20px">
        <li>Produtos exclusivos para salão</li>
        <li>Formação com educadores das marcas</li>
        <li>Suporte de um representante da sua região</li>
        <li>Materiais e catálogos atualizados</li>
        <li>Combos exclusivos para clientes VIP</li>
      </ul>
    </div>
    ${cardParceiro()}
  </div>
</section>

<section class="secao secao--areia">
  <div class="container">
    <div class="cabeca revela"><span class="sobretitulo">Dúvidas frequentes</span><h2>Antes de chamar a gente</h2></div>
    ${faqHtml(faq)}
    <div class="botoes" style="margin-top:28px">${btnWhats('Prefiro falar direto no WhatsApp', 'Olá! Vim pelo site e quero ser parceiro(a) Belnic.')}</div>
  </div>
</section>`;

  return {
    caminho,
    html: pagina({
      titulo: 'Seja parceiro Belnic | Produtos profissionais para salão',
      descricao: 'Torne-se parceiro Belnic: produtos profissionais Maison Visage e Mirra para salão no RS, com formação, materiais e suporte de representante na sua região.',
      caminho, corpo, versao,
      schema: [faqSchema(faq), breadcrumb([['Início', '/'], ['Seja parceiro', caminho]])],
    }),
  };
};
