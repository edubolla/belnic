# Green Week — página /greenweek/

Página de captação para o Grupo VIP da Green Week (a "Black Friday" da Belnic). O formulário é curto e já filtra o perfil do lead. Os cadastros caem numa planilha do Google, onde a equipe Belnic faz a triagem antes de mandar o convite do grupo.

## Como funciona

1. A pessoa preenche nome, WhatsApp, perfil (salão, clínica, estúdio, barbearia, autônomo, terapeuta capilar, estudante ou consumidor final), cidade, nome do negócio, Instagram profissional e se já compra com a Belnic.
2. O cadastro vai para a planilha com uma **prioridade sugerida**:
   - **Alta:** já é cliente Belnic
   - **Média:** profissional que ainda não compra
   - **Baixa:** estudante ou consumidor(a) final
3. Se o mesmo WhatsApp se cadastrar de novo, a linha entra com status **Duplicado**.
4. A equipe confere o perfil (o Instagram ajuda muito), muda o **Status** para *Aprovado* ou *Recusado* e, depois de mandar o convite do grupo pelo WhatsApp, marca *Convite enviado*.
5. O link do grupo **não aparece na página**. Ele só é enviado pela equipe, depois da triagem.

## Configurar a planilha (uma vez, ~10 minutos)

1. Crie uma planilha no Google Sheets, com a conta da Belnic, chamada por exemplo **Green Week — Cadastros**.
2. Abra **Extensões → Apps Script**, apague o conteúdo e cole o arquivo [docs/greenweek-apps-script.gs](docs/greenweek-apps-script.gs).
   - Opcional: em `EMAIL_AVISO`, coloque um e-mail para receber um aviso a cada cadastro.
3. Clique em **Implantar → Nova implantação → tipo App da Web**:
   - Executar como: **Eu**
   - Quem pode acessar: **Qualquer pessoa**
4. Autorize o acesso quando o Google pedir e copie a **URL do app da Web** (termina em `/exec`).
5. Cole essa URL em `greenweek.endpoint`, no arquivo `src/site.mjs`, rode `node build.mjs` e publique.

A aba **Cadastros** é criada sozinha no primeiro envio. Para testar, faça um cadastro na página e confira se a linha apareceu.

Enquanto `endpoint` estiver vazio (como na prévia da Vercel), o formulário abre o WhatsApp da Belnic com os dados já preenchidos, para nenhum cadastro se perder.

## Data e contagem regressiva

Preencha `greenweek.inicio` em `src/site.mjs` com a data e a hora de início, por exemplo `'2026-11-23T09:00:00-03:00'`. A página passa a mostrar a contagem regressiva. Vazio, ela mostra "Data anunciada primeiro no Grupo VIP".

## Divulgação e medição

- Use links com UTM para saber de onde vêm os cadastros. Eles vão para as colunas de origem da planilha. Exemplos:
  - Instagram (bio/stories): `https://belniccosmeticos.com/greenweek/?utm_source=instagram&utm_medium=social&utm_campaign=greenweek`
  - Representantes no WhatsApp: `...?utm_source=whatsapp&utm_medium=representante&utm_campaign=greenweek`
- Eventos enviados ao dataLayer/GA4 (veja [MEDICAO.md](MEDICAO.md)):
  - `greenweek_inicio_cadastro`: a pessoa começou a preencher
  - `greenweek_cadastro` (parâmetros `perfil`, `ja_cliente`, `cidade`): cadastro enviado. Marque como **evento principal** no GA4.
- Com o Meta Pixel instalado pelo GTM, o envio também dispara `Lead`.
- As URLs antigas `/green-friday/`, `/green-friday-2023/`, `/24-com-24-off/` e `/promocoes-vip/` redirecionam para `/greenweek/`.

## Dados pessoais (LGPD)

O formulário tem aceite obrigatório e link para a política de privacidade. A planilha deve ficar compartilhada só com quem faz a triagem. Para atender um pedido de exclusão, basta apagar a linha.
