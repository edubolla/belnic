// /llms.txt: resumo do site para assistentes de IA (ChatGPT, Perplexity, Claude etc.)
import { site } from '../site.mjs';

export default ({ dados, modo }) => {
  const landing = modo === 'landing';
  const u = (c) => `${site.url}${c}`;
  const porMarca = (m) => dados.linhas.filter((l) => l.marca === m && l.produtos.length && l.slug !== 'hombre-barbearia');
  const bloco = (m) => porMarca(m).map((l) =>
    `- ${landing ? `**${l.nome}**` : `[${l.nome}](${u(dados.marcas[m].url)}#${l.slug})`}: ${l.produtos.map((p) => p.nome).join(', ')}`).join('\n');

  const texto = `# ${site.nome}

> ${site.descricao}

A Belnic ("Belnic Hub da Beleza") é distribuidora oficial das marcas profissionais Maison Visage e Mirra Professional no Rio Grande do Sul. Atende salões de beleza, estúdios, terapeutas capilares, clínicas e profissionais da beleza com produtos, formação (cursos e imersões) e suporte de representantes por região. Não vende ao consumidor final: indica salões parceiros. Não há preços no site; pedidos e condições são tratados pelo WhatsApp.

- WhatsApp: +${site.whatsapp} (${site.whatsappExibicao})
- E-mail: ${site.email}
- Instagram: ${site.instagram}
- Região atendida: ${site.cidades.join(', ')} (RS)

${landing ? `## Seções do site

- [Para quem é a Belnic](${u('/#para-quem')}): salões, cabeleireiros, estúdios, terapeutas capilares e clínicas
- [Marcas](${u('/#marcas')}): Maison Visage e Mirra Professional
- [Terapia capilar](${u('/#terapia-capilar')}): linha Spa Therapy e ${dados.protocolos.length} protocolos para couro cabeludo
- [Formação](${u('/#formacao')}): Imersão em Terapia Capilar, workshops e treinamentos gravados
- [Onde atendemos](${u('/#onde-atendemos')})
- [Seja parceiro](${u('/#parceiro')}): contato direto pelo WhatsApp

## Catálogos em PDF

- [Catálogo Maison Visage](${u('/catalogos/catalogo-maison-visage.pdf')})
- [Catálogo Mirra Professional](${u('/catalogos/catalogo-mirra-professional.pdf')})
- [Catálogo Terapia Capilar Spa Therapy](${u('/catalogos/catalogo-terapia-capilar-spa-therapy.pdf')})
` : `## Páginas principais

- [Início](${u('/')})
- [Sobre a Belnic](${u('/sobre/')})
- [Maison Visage](${u('/marcas/maison-visage/')}): ${dados.marcas['maison-visage'].resumo}
- [Mirra Professional](${u('/marcas/mirra-professional/')}): ${dados.marcas['mirra-professional'].resumo}
- [Todos os produtos](${u('/produtos/')}): ${dados.produtos.length} produtos profissionais
- [Terapia Capilar](${u('/terapia-capilar/')}): linha Spa Therapy e ${dados.protocolos.length} protocolos para couro cabeludo
- [Formação e cursos](${u('/formacao/')})
- [Seja parceiro](${u('/seja-parceiro/')})
- [Onde atendemos](${u('/onde-atendemos/')})
- [Catálogos em PDF](${u('/catalogos/')})
- [Contato](${u('/contato/')})

`}
## Linhas Maison Visage

${bloco('maison-visage')}

## Linhas Mirra Professional

${bloco('mirra-professional')}
`;
  return { caminho: '/llms.txt', arquivo: 'llms.txt', noindex: true, html: texto };
};
