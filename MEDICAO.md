# Medição e indexação — Belnic

Guia para conectar o site ao Google Search Console, ao Google Tag Manager (GTM) e ao Google Analytics 4 (GA4).
O site já sai pronto: só falta criar as contas e colar os códigos em `src/site.mjs`.

## 1. Google Search Console (indexação)

1. Acesse search.google.com/search-console e adicione a propriedade **Domínio** `belniccosmeticos.com`.
2. Verifique pelo **DNS**: o Google mostra um registro TXT. Cole esse registro na zona DNS do domínio (cPanel da HostGator → Domínios → Editor de Zona; se o DNS estiver em outro lugar, como Registro.br ou Cloudflare, é lá). É a forma recomendada e cobre http, https e www.
   - Alternativa: propriedade **Prefixo de URL** `https://belniccosmeticos.com/` com verificação por **meta tag**. Copie só o código do `content="..."` para `googleVerificacao` em `src/site.mjs`, rode o build e publique.
3. Em **Sitemaps**, envie: `https://belniccosmeticos.com/sitemap.xml`
4. Em **Inspeção de URL**, cole `https://belniccosmeticos.com/` e clique em **Solicitar indexação**.
5. Faça o mesmo no **Bing Webmaster Tools** (bing.com/webmasters). Dá para importar direto do Search Console. O Bing alimenta o Copilot e parte das buscas do ChatGPT.

O sitemap é gerado a cada build (`dist/sitemap.xml`) com a página inicial e as páginas legais. O `robots.txt` libera todos os robôs, incluindo os de IA, e aponta para o sitemap. O `llms.txt` resume a Belnic para assistentes de IA.

## 2. Instalação na Belnic (30/10/2026)

- **GA4 direto no site:** `ga4: 'G-3QD545KYWP'` em `src/site.mjs`. O código do GA4 (gtag) entra em todas as páginas e envia sozinho as visitas (`page_view`) e todos os eventos da tabela abaixo. **Não é preciso configurar nada no GTM para o GA4.**
- **Google Tag Manager:** `gtm: 'GTM-5KTD5WNN'`. Fica disponível para outras tags (Meta Pixel, Google Ads etc.). Os eventos também chegam no `dataLayer`, então dá para usá-los como acionadores.
- A política de privacidade menciona o Google Analytics automaticamente quando `gtm` ou `ga4` está preenchido.

> **Atenção:** não crie a tag **Google Tag / GA4** dentro do GTM. O GA4 já roda direto no site, e uma segunda tag contaria as visitas em dobro.

## 3. Ajustes no painel do GA4 (feitos uma vez, em analytics.google.com)

O site já manda tudo; estes ajustes deixam os relatórios prontos para uso.

**Status em 30/10/2026 (propriedade "Belnic Site", 340709277):** feitos os itens 1 (retenção 14 meses), 3 (11 dimensões), 5 (medição otimizada ligada, com *Interações com formulário* desligada para não gerar `form_submit` em envios incompletos) e 8 (já estava certo). Pendentes: 2 (marcar os eventos principais assim que `lead_greenweek` e `contato_whatsapp` aparecerem na lista, em até 24h), 4 (IPs) e 6/7 (vinculações).

1. **Retenção de dados:** Administrador → Coleta e modificação de dados → Retenção de dados → **14 meses** (o padrão é 2, e apaga o histórico dos relatórios de exploração).
2. **Eventos principais (conversões):** Administrador → Eventos principais → marque **`lead_greenweek`** e **`contato_whatsapp`**. Opcional: `download_catalogo`. Não marque `generate_lead` (é o mesmo lead do `lead_greenweek`). Os eventos aparecem na lista depois de acontecerem pelo menos uma vez; dá para criar o nome manualmente antes.
3. **Dimensões personalizadas** (Administrador → Definições personalizadas → Criar, escopo **Evento**), uma para cada parâmetro: `local`, `botao`, `catalogo`, `secao`, `pergunta`, `perfil`, `ja_cliente`, `prioridade`, `cidade`, `link`, `form_id`.
4. **Tráfego interno:** Administrador → Fluxos de dados → Web → Configurar tag → Definir tráfego interno, com o IP do escritório da Belnic e o seu. Depois, em Configurações de dados → Filtros de dados, ative o filtro "Internal Traffic".
5. **Medição otimizada:** no fluxo de dados Web, deixe ligada (rolagem, cliques de saída, downloads, vídeo). Ela complementa os eventos do site.
6. **Search Console:** Administrador → Vinculações de produtos → Search Console, para ver as buscas do Google dentro do GA4.
7. **Google Ads** (se for anunciar): Vinculações de produtos → Google Ads, e importe `lead_greenweek` como conversão.
8. **Fuso e moeda:** Administrador → Configurações da propriedade → America/Sao_Paulo e Real (BRL).

**Grupos de conteúdo:** cada página manda o `content_group` pelo 1º trecho do endereço (`inicio`, `greenweek`, `links`, `politicas-de-privacidade`…). Em Relatórios → Engajamento → Páginas, troque a dimensão para "Grupo de conteúdo".

**Link da bio do Instagram:** use `https://belniccosmeticos.com/links/?utm_source=instagram&utm_medium=bio` para o GA4 separar o tráfego da bio do resto do Instagram. Não use UTM em links internos do site (quebra a sessão).

## 4. Eventos que o site já envia

Todos vão para o GA4 (via `gtag`, numa fila própria chamada `gaLayer`) e para o `dataLayer` (GTM). Por serem filas separadas, no Preview do GTM cada evento aparece uma vez só, como `dataLayer.push`; os comandos `gtag(...)` do GA4 não aparecem lá.

| Evento | Quando acontece | Parâmetros |
|---|---|---|
| `contato_whatsapp` | Clique em qualquer botão ou link de WhatsApp | `local` (seção: `parceiro`, `formacao`, `topo`, `rodape`, `barra_movel`…), `botao` (texto do botão) |
| `download_catalogo` | Clique para baixar um catálogo em PDF | `catalogo` (`catalogo-maison-visage`, `catalogo-mirra-professional`, `catalogo-terapia-capilar-spa-therapy`), `local` |
| `secao_vista` | A pessoa chega a uma seção da página (uma vez por visita) | `secao` (`para-quem`, `marcas`, `terapia-capilar`, `formacao`, `onde-atendemos`, `catalogos`, `parceiro`, `duvidas`) |
| `scroll_50` | A pessoa rolou até a metade da página (uma vez por página vista) | `percentual` = 50 |
| `scroll_100` | A pessoa chegou ao fim da página (uma vez por página vista; página que cabe na tela conta na hora) | `percentual` = 100 |
| `faq_aberta` | Abre uma pergunta frequente | `pergunta` |
| `clique_instagram` | Clique no Instagram | `local` |
| `clique_email` | Clique no e-mail | `local` |
| `abrir_mapa` | Abre o mapa de cidades atendidas | `local` |
| `greenweek_inicio_cadastro` | Começou a preencher o cadastro da Green Week | — |
| `lead_greenweek` | Cadastro da Green Week preenchido corretamente e aceito pelo webhook (**marque como evento principal**) | `form_id`, `lead_source`, `perfil`, `ja_cliente`, `prioridade`, `cidade` |
| `generate_lead` | Mesmo momento do `lead_greenweek` (evento recomendado do GA4; não marque como principal) | `form_id`, `lead_source`, `perfil`, `ja_cliente`, `prioridade`, `cidade` |
| `greenweek_erro_envio` | O envio do cadastro falhou | `erro` |
| `busca_produto` | Busca no catálogo (só no site completo) | `termo` |
| `filtro_produto` | Filtro do catálogo (só no site completo) | `filtro` |

O Meta Pixel fica todo no GTM (tags `00 | Meta Pixel - PageView`, `01 | Meta Pixel - Contact` no evento `contato_whatsapp` e `02 | Meta Pixel - Lead` no evento `lead_greenweek`). O código do site não chama `fbq` direto, para não duplicar. Não crie tag do GA4 no GTM: o GA4 já roda direto no site.

## 5. O que acompanhar

- **Search Console → Desempenho:** buscas que trazem o site. Termos-alvo: *distribuidora Mirra Professional*, *Mirra Cosméticos Porto Alegre*, *distribuidora Maison Visage RS*, *curso de terapia capilar Novo Hamburgo*, *produtos profissionais para salão Porto Alegre*.
- **GA4 → Eventos:** `contato_whatsapp` por `local` mostra qual botão gera mais contatos; `secao_vista` mostra até onde as pessoas rolam a página.
- **IA (GEO):** de tempos em tempos, pergunte ao ChatGPT, Perplexity e Gemini *"onde comprar Mirra Professional em Porto Alegre?"* e *"quem distribui Maison Visage no RS?"* e anote se a Belnic aparece. No GA4, o tráfego vindo de IAs aparece com origem `chatgpt.com`, `perplexity.ai` etc.
