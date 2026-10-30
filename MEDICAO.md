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

## 2. Instalação na Belnic (30/10/2026)

- **GA4 direto no site:** `ga4: 'G-3QD545KYWP'` em `src/site.mjs`. O código do GA4 (gtag) entra em todas as páginas e envia sozinho as visitas (`page_view`) e todos os eventos da tabela abaixo. **Não é preciso configurar nada no GTM para o GA4.**
- **Google Tag Manager:** `gtm: 'GTM-5KTD5WNN'`. Fica disponível para outras tags (Meta Pixel, Google Ads etc.). Os eventos também chegam no `dataLayer`, então dá para usá-los como acionadores.
- A política de privacidade menciona o Google Analytics automaticamente quando `gtm` ou `ga4` está preenchido.

> **Atenção:** não crie a tag **Google Tag / GA4** dentro do GTM. O GA4 já roda direto no site, e uma segunda tag contaria as visitas em dobro.

## 3. Ajustes no painel do GA4

1. No GA4, em Administrador → Eventos (ou Eventos principais), marque **`generate_lead`** e **`contato_whatsapp`** como **eventos principais** (conversões). Se quiser, marque também `download_catalogo`. Os eventos só aparecem na lista depois de acontecerem pelo menos uma vez.
2. Em Administrador → Definições personalizadas, crie dimensões de evento para `local`, `catalogo`, `secao`, `pergunta`, `perfil` e `link`, para usar nos relatórios.
3. Para testar, abra o site e veja em Relatórios → Tempo real (ou Administrador → DebugView).

## 4. Eventos que o site já envia

Todos vão para o GA4 (via `gtag`) e para o `dataLayer` (GTM).

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
