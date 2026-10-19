/**
 * Belnic — Green Week: recebe os cadastros da página /greenweek/ e grava na planilha.
 * Instalação: veja GREENWEEK.md na raiz do projeto.
 *
 * Cada cadastro vira uma linha com uma PRIORIDADE sugerida para a triagem:
 *   Alta  = já é cliente Belnic
 *   Média = profissional (salão, clínica, estúdio, barbearia, autônomo, terapeuta capilar)
 *   Baixa = estudante ou consumidor(a) final
 * A equipe muda a coluna STATUS (Novo → Aprovado / Recusado → Convite enviado).
 */

// E-mail que recebe um aviso a cada cadastro. Deixe '' para não enviar.
const EMAIL_AVISO = '';
const ABA = 'Cadastros';
const COLUNAS = [
  'Data', 'Nome', 'WhatsApp', 'Perfil', 'Cidade', 'Negócio', 'Instagram', 'Já é cliente',
  'Prioridade', 'Status', 'Observações', 'Origem (utm_source)', 'Mídia (utm_medium)', 'Campanha (utm_campaign)', 'Página',
];

function doPost(e) {
  const lock = LockService.getScriptLock();
  lock.waitLock(10000);
  try {
    const d = JSON.parse(e.postData.contents || '{}');
    if (!d.nome || !d.whatsapp) return resposta({ ok: false, erro: 'dados incompletos' });

    const aba = obterAba();
    const whatsapp = String(d.whatsapp).replace(/\D/g, '');
    const duplicado = aba.getLastRow() > 1 &&
      aba.getRange(2, 3, aba.getLastRow() - 1, 1).getValues().some((l) => String(l[0]).replace(/\D/g, '') === whatsapp);

    aba.appendRow([
      new Date(), limpa(d.nome), "'" + d.whatsapp, limpa(d.perfil), limpa(d.cidade), limpa(d.negocio),
      limpa(d.instagram), limpa(d.ja_cliente), prioridade(d), duplicado ? 'Duplicado' : 'Novo', '',
      limpa(d.utm_source), limpa(d.utm_medium), limpa(d.utm_campaign), limpa(d.pagina),
    ]);

    if (EMAIL_AVISO) {
      MailApp.sendEmail(EMAIL_AVISO, `Green Week: novo cadastro (${prioridade(d)}) — ${limpa(d.nome)}`,
        `${limpa(d.nome)} · ${limpa(d.perfil)} · ${limpa(d.cidade)}\nWhatsApp: ${d.whatsapp}\nInstagram: ${limpa(d.instagram)}\nJá é cliente: ${limpa(d.ja_cliente)}`);
    }
    return resposta({ ok: true });
  } catch (err) {
    return resposta({ ok: false, erro: String(err) });
  } finally {
    lock.releaseLock();
  }
}

function prioridade(d) {
  if (d.ja_cliente === 'Sim') return 'Alta';
  if (/estudante|consumidor/i.test(d.perfil || '')) return 'Baixa';
  return 'Média';
}

function obterAba() {
  const planilha = SpreadsheetApp.getActiveSpreadsheet();
  let aba = planilha.getSheetByName(ABA);
  if (!aba) {
    aba = planilha.insertSheet(ABA);
    aba.appendRow(COLUNAS);
    aba.setFrozenRows(1);
    aba.getRange(1, 1, 1, COLUNAS.length).setFontWeight('bold').setBackground('#667B68').setFontColor('#FFFFFF');
    const status = SpreadsheetApp.newDataValidation()
      .requireValueInList(['Novo', 'Duplicado', 'Aprovado', 'Recusado', 'Convite enviado'], true).build();
    aba.getRange('J2:J').setDataValidation(status);
  }
  return aba;
}

// Evita fórmulas injetadas e textos enormes
function limpa(v) {
  const s = String(v || '').slice(0, 200).trim();
  return /^[=+\-@]/.test(s) ? "'" + s : s;
}

function resposta(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON);
}
