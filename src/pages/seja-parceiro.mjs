import { pagina, icon, migalhas, breadcrumb, esc, btnWhats } from '../layout.mjs';
import { site } from '../site.mjs';
import { faqHtml, faqSchema } from '../componentes.mjs';

const faq = [
  ['Preciso ter CNPJ para ser parceiro?', 'Fale com a nossa equipe pelo WhatsApp: ela explica quais condições valem para o seu perfil, seja salão, clínica ou profissional autônomo.'],
  ['Existe pedido mínimo?', 'As condições comerciais são combinadas com o representante da sua região. Envie o cadastro e ele entra em contato para apresentar tudo.'],
  ['A Belnic oferece treinamento aos parceiros?', 'Sim. Oferecemos imersões, workshops e treinamentos gravados. Veja em <a href="/formacao/">Formação</a>.'],
  ['Minha cidade é atendida?', 'Atendemos Porto Alegre, Região Metropolitana, Vale do Sinos, Vale do Paranhana e Serra Gaúcha. Confira em <a href="/onde-atendemos/">Onde atendemos</a>.'],
  ['Meus dados ficam guardados no site?', 'Não. O formulário apenas abre o WhatsApp com a sua mensagem pronta. Nada é armazenado por nós neste site.'],
];
const perfis = ['Salão de beleza', 'Clínica de estética', 'Profissional autônomo(a)', 'Terapeuta capilar', 'Barbearia', 'Outro'];
const interesses = ['Maison Visage', 'Mirra Professional', 'Terapia Capilar', 'Cursos e formação', 'Ainda não sei'];

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
    <div class="revela" style="margin-top:32px">
      <h2>Fale com a gente</h2>
      <form class="form form--2" data-form-whats="${site.whatsapp}">
        <div class="campo"><label for="nome">Seu nome *</label><input id="nome" name="nome" type="text" required autocomplete="name"></div>
        <div class="campo"><label for="perfil">Seu perfil</label><select id="perfil" name="perfil">${perfis.map((p) => `<option>${esc(p)}</option>`).join('')}</select></div>
        <div class="campo"><label for="negocio">Nome do salão ou clínica</label><input id="negocio" name="negocio" type="text" autocomplete="organization"></div>
        <div class="campo"><label for="cidade">Cidade *</label><input id="cidade" name="cidade" type="text" list="cidades" required autocomplete="off"><datalist id="cidades">${site.cidades.map((c) => `<option value="${esc(c)}">`).join('')}</datalist></div>
        <div class="campo"><label for="interesse">O que mais interessa</label><select id="interesse" name="interesse">${interesses.map((p) => `<option>${esc(p)}</option>`).join('')}</select></div>
        <div class="campo campo--cheio"><label for="mensagem">Mensagem</label><textarea id="mensagem" name="mensagem"></textarea></div>
        <div class="campo--cheio"><button class="btn btn--primario" type="submit">${icon.whatsapp}<span>Enviar pelo WhatsApp</span></button></div>
        <p class="form__nota campo--cheio">Não guardamos seus dados: ao enviar, abrimos o WhatsApp com a mensagem pronta para você conferir e mandar.</p>
      </form>
    </div>
  </div>
</section>

<section class="secao">
  <div class="container">
    <div class="cabeca revela"><span class="sobretitulo">Como funciona</span><h2>Três passos até o primeiro pedido</h2></div>
    <div class="grade grade--3">
      <article class="cartao revela"><span class="numero">01</span><h3>Você nos conta</h3><p>Envie o formulário com seu perfil, sua cidade e o que busca.</p></article>
      <article class="cartao revela"><span class="numero">02</span><h3>Representante entra em contato</h3><p>A pessoa da sua região apresenta as linhas, condições e materiais.</p></article>
      <article class="cartao revela"><span class="numero">03</span><h3>Você começa a vender</h3><p>Faz o pedido, recebe orientação de uso e acesso à formação.</p></article>
    </div>
  </div>
</section>

<section class="secao secao--areia">
  <div class="container">
    <div class="cabeca revela"><span class="sobretitulo">Dúvidas frequentes</span><h2>Antes de se cadastrar</h2></div>
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
