import { pagina, migalhas, breadcrumb } from '../layout.mjs';
import { site } from '../site.mjs';

export default ({ versao }) => {
  const caminho = '/politicas-de-privacidade/';
  const corpo = `
<section class="cabecalho-pagina"><div class="container">
  ${migalhas([['Início', '/'], ['Política de privacidade', caminho]])}
  <span class="sobretitulo">Privacidade</span>
  <h1>Política de privacidade</h1>
  <p class="lead">Explicamos de forma simples como tratamos informações neste site, em conformidade com a Lei Geral de Proteção de Dados (LGPD, Lei 13.709/2018).</p>
</div></section>

<section class="secao secao--branca"><div class="container prosa">
  <h2>Quem é o controlador</h2>
  <p>O controlador dos dados é a ${site.nome}. Para qualquer assunto sobre privacidade, escreva para <a href="mailto:${site.email}">${site.email}</a>.</p>
  <h2>O que coletamos</h2>
  <p>Este site não tem login, cadastro de usuários nem loja. Não usamos cookies próprios e não há formulários: nenhum dado digitado é armazenado por este site.</p>
  <p>Os botões de contato (como em <a href="/seja-parceiro/">Seja parceiro</a>) apenas abrem o WhatsApp com uma mensagem pronta. O envio só acontece se você apertar enviar no aplicativo, e a partir daí a conversa segue as regras do WhatsApp.</p>
  <h2>Serviços de terceiros</h2>
  <p>O site tem links para serviços externos, como WhatsApp, Instagram, Facebook e Google Maps (mapa de atendimento). Ao acessá-los, você passa a estar sujeito às políticas de privacidade de cada um, sobre as quais não temos controle.</p>
  <h2>Como usamos as conversas</h2>
  <p>As informações que você nos envia por WhatsApp ou e-mail são usadas apenas para responder ao seu contato, atender pedidos, apresentar condições comerciais e indicar salões parceiros.</p>
  <h2>Seus direitos</h2>
  <p>Você pode solicitar confirmação de tratamento, acesso, correção ou exclusão dos seus dados, entre outros direitos previstos na LGPD, escrevendo para o e-mail acima.</p>
  <h2>Alterações</h2>
  <p>Podemos atualizar esta política para refletir mudanças no site. A versão vigente é sempre a publicada nesta página.</p>
</div></section>`;
  return {
    caminho,
    html: pagina({
      titulo: 'Política de privacidade | Belnic Cosméticos',
      descricao: 'Saiba como a Belnic Cosméticos trata dados neste site conforme a LGPD: sem cookies próprios, sem login e com contato direto pelo WhatsApp.',
      caminho, corpo, versao,
      schema: [breadcrumb([['Início', '/'], ['Política de privacidade', caminho]])],
    }),
  };
};
