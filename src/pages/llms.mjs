// /llms.txt: resumo do site para assistentes de IA (ChatGPT, Perplexity, Claude etc.)
import { site } from '../site.mjs';

export default ({ dados }) => {
  const u = (c) => `${site.url}${c}`;
  const porMarca = (m) => dados.linhas.filter((l) => l.marca === m && l.produtos.length);
  const bloco = (m) => porMarca(m).map((l) =>
    `- [${l.nome}](${u(dados.marcas[m].url)}#${l.slug}): ${l.produtos.map((p) => p.nome).join(', ')}`).join('\n');

  const texto = `# ${site.nome}

> ${site.descricao}

A Belnic ("Belnic Hub da Beleza") é distribuidora oficial das marcas profissionais Maison Visage e Mirra Professional no Rio Grande do Sul. Atende salões de beleza, barbearias, terapeutas capilares, clínicas e profissionais da beleza com produtos, formação (cursos e imersões) e suporte de representantes por região. Não vende ao consumidor final: indica salões parceiros. Não há preços no site; pedidos e condições são tratados pelo WhatsApp.

- WhatsApp: +${site.whatsapp} (${site.whatsappExibicao})
- E-mail: ${site.email}
- Instagram: ${site.instagram}
- Região atendida: ${site.cidades.join(', ')} (RS)

## Páginas principais

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

## Linhas Maison Visage

${bloco('maison-visage')}

## Linhas Mirra Professional

${bloco('mirra-professional')}
`;
  return { caminho: '/llms.txt', arquivo: 'llms.txt', noindex: true, html: texto };
};
