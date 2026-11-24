# Formação em Terapia Capilar (`/formacao-terapia-capilar/`)

Página de venda da formação, com pré-inscrição. A pessoa preenche o formulário, o lead vai para o n8n, e a equipe Belnic chama no WhatsApp para confirmar a vaga e combinar o pagamento.

Código: `src/pages/formacao-terapia-capilar.mjs`. As fotos foram recortadas dos carrosséis do Instagram (@belnicoficial, turma 2026) e estão em `src/assets/img/formacao/`. Na foto da placa de reconhecimento, o nome da aluna foi desfocado.

## Configuração (`src/site.mjs` → `formacao`)

| Campo | Para que serve |
|---|---|
| `turma` | Ano da turma (aparece no selo, nos títulos e no `form_id`) |
| `inicio`, `fim` | Data e hora de início e fim (dados estruturados do curso para o Google) |
| `datasTexto`, `datasCurto` | Como as datas aparecem nos textos ("14, 15 e 16 de março de 2027") e nos destaques ("14, 15 e 16/03") |
| `horario` | "8h30 às 17h30" |
| `local`, `cidade` | Cidade como aparece na página ("Dois Irmãos/RS") e só o nome dela, para os dados estruturados |
| `endereco` | "Rua Santa Helena, 423". Vira link para o Google Maps. Vazio = a página diz que o endereço é enviado na confirmação |
| `docente` | Quem conduz |
| `preco`, `parcelas` | Valor total e número de parcelas. A parcela é calculada (2.457,90 ÷ 10 = 245,79) |
| `descontoVista` | Desconto à vista (`0.10` = 10%, calculado sobre o `preco`: 2.457,90 − 10% = 2.212,11). `0` = sem desconto |
| `endpoint` | Webhook do n8n que recebe a pré-inscrição |

O conteúdo aparece **por tema, sem dia nem horário**, a pedido da Belnic: a ordem muda conforme a dinâmica da turma, e um assunto pode passar de um dia para outro. Os 8 temas ficam no topo do arquivo da página (`modulos`). Para uma nova turma, troque as datas, o preço e os temas.

## Webhook (n8n)

Hoje a pré-inscrição usa **o mesmo webhook da Green Week** (`/webhook/greenweek`). O lead chega com os mesmos campos (veja [GREENWEEK.md](GREENWEEK.md)) e é separado por:

- `origem` = `site_formacao_terapia_capilar_2027`
- `pagina` = `https://belniccosmeticos.com/formacao-terapia-capilar/`

No n8n, coloque um nó **IF** logo depois do Webhook (`{{ $json.body.origem }}` começa com `site_formacao`). Assim os leads da formação vão para uma aba ou planilha própria e recebem um e-mail com outro assunto, em vez de "Novo Lead - Belnic Greenweek". Outra opção é criar um webhook só da formação e trocar o `endpoint`.

No formulário da formação, o campo `perfil` tem outras opções: Cabeleireiro(a), Dono(a) de salão, Terapeuta capilar, Esteticista, Profissional autônomo(a), Estudante da área e Outro.

## Eventos (GA4 e GTM)

| Evento | Quando dispara |
|---|---|
| `formacao_inicio_cadastro` | A pessoa clica no primeiro campo do formulário (uma vez) |
| `lead_formacao` | Pré-inscrição preenchida corretamente **e** recebida pelo webhook (marque como **evento principal** no GA4) |
| `generate_lead` | No mesmo momento, com `lead_source` = `formacao_terapia_capilar` (não marque como principal) |
| `formacao_erro_envio` | O envio falhou |

No GTM, para o Pixel da Meta contar a pré-inscrição como **Lead**, acrescente o evento `lead_formacao` ao acionador da tag `02 | Meta Pixel - Lead`, ou crie uma tag nova com esse acionador.

Também valem os eventos gerais do site: `contato_whatsapp`, `scroll_50`, `scroll_100` e `secao_vista`.
