# Medição e indexação — Belnic

Guia para conectar o site ao Google Search Console, ao Google Tag Manager (GTM) e ao Google Analytics 4 (GA4).
O site já sai pronto: só falta criar as contas e colar os códigos em `src/site.mjs`.

## 1. Google Search Console (indexação)

1. Acesse search.google.com/search-console e adicione a propriedade **Domínio** `belniccosmeticos.com`.
2. Verifique pelo **DNS**: o Google mostra um registro TXT. Cole esse registro na zona DNS do domínio (hPanel da Hostinger → Domínios → DNS). É a forma recomendada e cobre http, https e www.
   - Alternativa: propriedade **Prefixo de URL** `https://belniccosmeticos.com/` com verificação por **meta tag**. Copie só o código do `content="..."` para `googleVerificacao` em `src/site.mjs`, rode o build e publique.
3. Em **Sitemaps**, envie: `https://belniccosmeticos.com/sitemap.xml`
4. Em **Inspeção de URL**, cole `https://belniccosmeticos.com/` e clique em **Solicitar indexação**.
5. Faça o mesmo no **Bing Webmaster Tools** (bing.com/webmasters). Dá para importar direto do Search Console. O Bing alimenta o Copilot e parte das buscas do ChatGPT.

O sitemap é gerado a cada build (`dist/sitemap.xml`) com a página inicial e as páginas legais. O `robots.txt` libera todos os robôs, incluindo os de IA, e aponta para o sitemap. O `llms.txt` resume a Belnic para assistentes de IA.

## 2. Google Tag Manager (recomendado)

1. Crie uma conta e um contêiner **Web** em tagmanager.google.com.
2. Copie o ID `GTM-XXXXXXX` para `gtm` em `src/site.mjs`, rode `node build.mjs` e publique. O código do GTM (no `<head>` e o `<noscript>` logo após o `<body>`) entra sozinho em todas as páginas.
3. A política de privacidade passa a mencionar o Google Analytics automaticamente quando `gtm` ou `ga4` estiver preenchido.

> Use o GTM **ou** o GA4 direto (`ga4` em `src/site.mjs`), nunca os dois, para não contar visitas em dobro.

## 3. GA4 dentro do GTM

1. Crie uma propriedade GA4 em analytics.google.com e um fluxo de dados Web para `https://belniccosmeticos.com`. Anote o **ID de métricas** (`G-XXXXXXXXXX`).
2. No GTM, crie a tag **Google Tag** com esse ID e acionador **Initialization - All Pages**.
3. Crie as variáveis da camada de dados (Variáveis → Nova → Variável da camada de dados): `local`, `botao`, `catalogo`, `pergunta`, `secao`, `perfil`, `ja_cliente`, `cidade`, `form_id`, `lead_source`, `prioridade`.
4. Para cada evento da tabela abaixo, crie:
   - um **acionador** do tipo *Evento personalizado* com o nome exato do evento;
   - uma tag **Google Analytics: evento GA4** com o mesmo nome de evento e os parâmetros listados (valor = variável correspondente).
5. Publique o contêiner e teste no **Preview** do GTM e no **DebugView** do GA4.
6. No GA4, em Administrador → Eventos, marque **`contato_whatsapp`** como **evento principal** (conversão). Se quiser, marque também `download_catalogo`.
7. No GA4, em Administrador → Definições personalizadas, crie dimensões de evento para `local`, `catalogo`, `secao` e `pergunta`, para usar nos relatórios.

## 4. Eventos que o site já envia

Todos vão para o `dataLayer` (GTM). Se o GA4 estiver instalado direto (`ga4`), vão também para o `gtag`.

| Evento | Quando acontece | Parâmetros |
|---|---|---|
| `contato_whatsapp` | Clique em qualquer botão ou link de WhatsApp | `local` (seção: `parceiro`, `formacao`, `topo`, `rodape`, `barra_movel`…), `botao` (texto do botão) |
| `download_catalogo` | Clique para baixar um catálogo em PDF | `catalogo` (`catalogo-maison-visage`, `catalogo-mirra-professional`, `catalogo-terapia-capilar-spa-therapy`), `local` |
| `secao_vista` | A pessoa chega a uma seção da página (uma vez por visita) | `secao` (`para-quem`, `marcas`, `terapia-capilar`, `formacao`, `onde-atendemos`, `catalogos`, `parceiro`, `duvidas`) |
| `faq_aberta` | Abre uma pergunta frequente | `pergunta` |
| `clique_instagram` | Clique no Instagram | `local` |
| `clique_email` | Clique no e-mail | `local` |
| `abrir_mapa` | Abre o mapa de cidades atendidas | `local` |
| `greenweek_inicio_cadastro` | Começou a preencher o cadastro da Green Week | — |
| `generate_lead` | Cadastro da Green Week enviado com sucesso ao webhook (marque como evento principal) | `form_id`, `lead_source`, `perfil`, `ja_cliente`, `prioridade`, `cidade` |
| `greenweek_erro_envio` | O envio do cadastro falhou | `erro` |
| `busca_produto` | Busca no catálogo (só no site completo) | `termo` |
| `filtro_produto` | Filtro do catálogo (só no site completo) | `filtro` |

Se o Meta Pixel for instalado pelo GTM, o clique no WhatsApp também dispara `fbq('track', 'Contact')`.

## 5. O que acompanhar

- **Search Console → Desempenho:** buscas que trazem o site. Termos-alvo: *distribuidora Mirra Professional*, *Mirra Cosméticos Porto Alegre*, *distribuidora Maison Visage RS*, *curso de terapia capilar Novo Hamburgo*, *produtos profissionais para salão Porto Alegre*.
- **GA4 → Eventos:** `contato_whatsapp` por `local` mostra qual botão gera mais contatos; `secao_vista` mostra até onde as pessoas rolam a página.
- **IA (GEO):** de tempos em tempos, pergunte ao ChatGPT, Perplexity e Gemini *"onde comprar Mirra Professional em Porto Alegre?"* e *"quem distribui Maison Visage no RS?"* e anote se a Belnic aparece. No GA4, o tráfego vindo de IAs aparece com origem `chatgpt.com`, `perplexity.ai` etc.
