# Green Week — página /greenweek/

Página de captação para o Grupo VIP da Green Week (a "Black Friday" da Belnic). O foco é o **grande lançamento em 9 de novembro**, que acontece dentro do Grupo VIP do WhatsApp. O formulário é curto e já filtra o perfil do lead. Os cadastros vão para um **webhook do n8n**, que entrega para a equipe Belnic fazer a triagem antes de mandar o convite do grupo.

## Configurações (`src/site.mjs` → `greenweek`)

| Campo | Para que serve |
|---|---|
| `lancamento`, `fim` | Data e hora do grande lançamento (horário de Brasília). Até `lancamento`, a página mostra a contagem regressiva; até `fim`, mostra "É hoje!". |
| `lancamentoTexto`, `lancamentoCurto` | Como a data aparece nos textos ("9 de novembro") e no destaque ("09.11"). |
| `desconto` | Desconto divulgado na página ("até 70%"): título, selo do topo, vantagens, cadastro, FAQ e letreiro. Vazio = não mostra. |
| `linkNaBio` | Mostra (`true`) ou esconde (`false`) o card da Green Week na página `/links/`. O card fica guardado em `src/pages/links.mjs`. Escondido até 01/11/2026 a pedido da Belnic (fechamento do mês). |
| `endpoint` | URL do webhook do n8n. Vazio = o cadastro segue pelo WhatsApp da Belnic. |

Depois de mudar, rode `node build.mjs` e publique.

## O que o webhook recebe

`POST` com corpo `application/x-www-form-urlencoded`. No n8n, os campos chegam em `{{$json.body.<campo>}}`:

| Campo | Exemplo | Observação |
|---|---|---|
| `nome` | Ana Souza | |
| `whatsapp` | (51) 99988-7766 | como digitado, com máscara |
| `whatsapp_e164` | +5551999887766 | pronto para integrações de WhatsApp |
| `perfil` | Salão de beleza | salão, clínica, estúdio, barbearia, autônomo(a), terapeuta capilar, estudante, consumidor(a) final |
| `cidade` | Novo Hamburgo | |
| `negocio` | Studio Ana | opcional |
| `instagram` | @studioana | opcional, ajuda muito na triagem |
| `ja_cliente` | Sim / Ainda não | |
| `prioridade` | Alta / Média / Baixa | sugestão: Alta = já é cliente; Baixa = estudante ou consumidor final; Média = demais profissionais |
| `aceite_contato` | sim | consentimento LGPD |
| `origem` | site_greenweek | |
| `pagina` | https://belniccosmeticos.com/greenweek/ | |
| `enviado_em` | 2026-10-20T14:03:00.000Z | data/hora do envio (UTC) |
| `utm_source`, `utm_medium`, `utm_campaign`, `utm_content`, `utm_term` | facebook, paid_social, greenweek_2026_leads_rs | vazios se o link não tiver UTM. Ficam guardados na sessão se a pessoa navegar antes de se cadastrar |
| `fbclid` | IwAR... | id do clique no anúncio do Facebook/Instagram (o Meta coloca sozinho no link) |
| `fbc` | fb.1.1793391147429.IwAR... | cookie `_fbc` do Pixel ou montado a partir do `fbclid`; formato pronto para a API de Conversões do Meta |
| `fbp` | fb.1.1793391147429.123456789 | cookie `_fbp` do Pixel; vazio enquanto o Pixel da Meta não estiver instalado |
| `gclid` | Cj0KCQ... | id do clique no Google Ads |
| `navegador` | Mozilla/5.0 (...) | user agent, usado pela API de Conversões |

Campos protegidos: há um campo invisível anti-robô. Se ele vier preenchido, o site nem envia.

## Configuração necessária no n8n (importante)

Configurado e testado em 19/10/2026: POST, CORS liberado para `belniccosmeticos.com` (site oficial, HostGator) e `belnic.vercel.app` (prévia), resposta 200. Se o workflow for alterado, mantenha:

1. No nó **Webhook**, mude **HTTP Method** para **POST**.
2. Em **Options → Allowed Origins (CORS)**, coloque `https://belniccosmeticos.com,https://belnic.vercel.app`, ou `*`. Sem isso, o navegador bloqueia a leitura da resposta e a página mostra erro, mesmo com o dado tendo chegado.
3. Em **Respond**, use **Immediately**, ou um nó *Respond to Webhook* com status **200**. A página só confirma o cadastro, e só dispara o evento de lead, quando recebe resposta 2xx.
4. **Ative** o workflow e use a URL de **produção** (`/webhook/…`, não `/webhook-test/…`).

Se o envio falhar (erro, n8n fora do ar, mais de 15 segundos sem resposta), a página mostra uma mensagem com um link para mandar o cadastro pelo WhatsApp da Belnic, e nada se perde.

## Medição (dataLayer / GA4)

| Evento | Quando |
|---|---|
| `greenweek_inicio_cadastro` | a pessoa começou a preencher |
| `lead_greenweek` | cadastro **enviado com sucesso** (resposta 2xx do webhook). Evento próprio da campanha: é a conversão da Green Week. Mesmos parâmetros do `generate_lead` |
| `generate_lead` | cadastro **enviado com sucesso** (resposta 2xx do webhook). Parâmetros: `form_id` = `greenweek_grupo_vip`, `lead_source` = `greenweek`, `perfil`, `ja_cliente`, `prioridade`, `cidade` |
| `greenweek_erro_envio` | o envio falhou (parâmetro `erro`) |

Nenhum dos dois dispara com formulário incompleto, com robô (honeypot) ou se o webhook falhar. No GA4, marque **`lead_greenweek`** como **evento principal** (conversão); não marque o `generate_lead` também, para não contar o lead duas vezes. O Lead do Meta Pixel é disparado pela tag `02 | Meta Pixel - Lead` do GTM, no evento `lead_greenweek`. Veja [MEDICAO.md](MEDICAO.md).

## Divulgação

Use links com UTM para saber de onde vêm os cadastros:

- Anúncios Meta (no campo **Parâmetros de URL** do anúncio): `utm_source={{site_source_name}}&utm_medium=paid_social&utm_campaign={{campaign.name}}&utm_content={{ad.name}}&utm_term={{adset.name}}`. O `fbclid` é adicionado sozinho pelo Meta.
- Instagram: `https://belniccosmeticos.com/greenweek/?utm_source=instagram&utm_medium=social&utm_campaign=greenweek`
- Representantes no WhatsApp: `...?utm_source=whatsapp&utm_medium=representante&utm_campaign=greenweek`

As URLs antigas `/green-friday/`, `/green-friday-2023/`, `/24-com-24-off/` e `/promocoes-vip/` redirecionam para `/greenweek/` (na HostGator).

## Dados pessoais (LGPD)

O formulário tem aceite obrigatório e link para a política de privacidade. Os dados devem ficar acessíveis só para quem faz a triagem. Pedidos de exclusão chegam pelo e-mail informado na política.
