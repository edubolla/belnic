import { pagina, migalhas, breadcrumb } from '../layout.mjs';
import { site } from '../site.mjs';

export default ({ versao }) => {
  const caminho = '/termos-de-uso/';
  const corpo = `
<section class="cabecalho-pagina"><div class="container">
  ${migalhas([['Início', '/'], ['Termos de uso', caminho]])}
  <span class="sobretitulo">Termos</span>
  <h1>Termos de uso</h1>
  <p class="lead">Regras simples para usar o site da ${site.nome}. Ao navegar por ele, você concorda com o que está descrito abaixo.</p>
</div></section>

<section class="secao secao--branca"><div class="container prosa">
  <h2>Sobre o site</h2>
  <p>O site ${site.url.replace('https://', '')} apresenta a ${site.nome}, distribuidora das marcas Maison Visage e Mirra Professional, e seus produtos, cursos e canais de atendimento. A venda é destinada a profissionais da beleza.</p>
  <h2>Pedidos e condições</h2>
  <p>O site não realiza vendas nem pagamentos. Pedidos, preços, prazos e condições são tratados diretamente com a nossa equipe, por WhatsApp ou e-mail.</p>
  <h2>Informações de produtos</h2>
  <p>Nos esforçamos para manter descrições, imagens e catálogos atualizados, mas eles podem mudar sem aviso. Em caso de dúvida, confirme com a nossa equipe antes de comprar.</p>
  <h2>Propriedade intelectual</h2>
  <p>Textos, imagens, logotipos e demais conteúdos do site pertencem à ${site.nome} ou aos titulares das marcas Maison Visage e Mirra Professional. Não é permitido copiá-los ou usá-los comercialmente sem autorização.</p>
  <h2>Links para terceiros</h2>
  <p>O site pode levar a serviços como WhatsApp, Instagram, Facebook e Google Maps. Não somos responsáveis pelo conteúdo nem pelas políticas desses serviços.</p>
  <h2>Responsabilidade</h2>
  <p>O conteúdo é fornecido para fins informativos. Fazemos o possível para mantê-lo correto e disponível, sem garantir ausência de erros ou interrupções.</p>
  <h2>Privacidade</h2>
  <p>O tratamento de informações está descrito na <a href="/politicas-de-privacidade/">política de privacidade</a>.</p>
  <h2>Contato</h2>
  <p>Dúvidas sobre estes termos: <a href="mailto:${site.email}">${site.email}</a>.</p>
</div></section>`;
  return {
    caminho,
    html: pagina({
      titulo: 'Termos de uso | Belnic Cosméticos',
      descricao: 'Termos de uso do site da Belnic Cosméticos: finalidade, pedidos tratados por WhatsApp, propriedade intelectual, links externos e contato para dúvidas.',
      caminho, corpo, versao,
      schema: [breadcrumb([['Início', '/'], ['Termos de uso', caminho]])],
    }),
  };
};
