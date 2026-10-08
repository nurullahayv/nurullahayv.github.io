/**
 * Test cevaplarını toplayan Google Apps Script.
 *
 * Sitedeki test sayfası "Gönder" düğmesine basıldığında cevapları bu betiğe
 * gönderir; betik de onları bağlı olduğu Google Sheets tablosuna satır olarak yazar.
 * Her test kendi sayfasında (sekmesinde) toplanır. Tabloyu paylaşmadığın sürece
 * cevapları yalnızca sen görürsün.
 *
 * Kurulum adımları için: content/README.md > "Öğrenci cevaplarını toplamak".
 *
 * Hücre işaretleri (renkleriyle birlikte):
 *   ✓  ilk denemede doğru             (yeşil)
 *   ↻  birkaç denemede doğru          (sarı)
 *   👁  cevabı açıp baktı              (turuncu)
 *   ✗  yanlış                         (kırmızı)
 *      boş                            (gri)
 */

var MARKS = { first: '✓', later: '↻', revealed: '👁', wrong: '✗', empty: '' };
var COLORS = { first: '#d9f2e1', later: '#fff2c4', revealed: '#ffe0c7', wrong: '#f9d6d1', empty: '#eeeeee' };
var FIXED_HEADERS = ['Zaman', 'Öğrenci No', 'Son puan', 'İlk denemede doğru', 'Cevabı açılan', 'Boş'];

function doPost(e) {
  var lock = LockService.getScriptLock();
  lock.waitLock(15000);
  try {
    var data = JSON.parse(e.postData.contents);
    var student = String(data.student || '').trim();
    if (!/^[0-9]{3,15}$/.test(student)) throw new Error('Geçersiz öğrenci numarası');
    if (!data.quiz || !Array.isArray(data.questions)) throw new Error('Eksik veri');

    var ss = SpreadsheetApp.getActiveSpreadsheet();
    var name = String(data.quiz).replace(/[\[\]*?:\/\\]/g, '-').slice(0, 90);
    var sheet = ss.getSheetByName(name) || ss.insertSheet(name);
    writeHeader(sheet, data.questions);

    var row = buildRow(data, new Date());
    sheet.appendRow(row.values);
    var r = sheet.getLastRow();
    sheet.getRange(r, 1, 1, row.colors.length).setBackgrounds([row.colors]);
    return json({ ok: true, row: r });
  } catch (err) {
    return json({ ok: false, error: String(err && err.message || err) });
  } finally {
    lock.releaseLock();
  }
}

/* Adresin çalıştığını tarayıcıdan denemek için. */
function doGet() {
  return json({ ok: true, message: 'Test cevap toplayıcı çalışıyor.' });
}

/* İlk satır: sabit sütunlar + her soru için bir sütun. Soru metni ve doğru cevap
   başlık hücresinin notunda durur (fareyle üzerine gelince görünür). */
function writeHeader(sheet, questions) {
  var headers = FIXED_HEADERS.concat(questions.map(function (q) {
    return 'S' + q.n + (q.source ? ' · ' + q.source : '');
  }));
  var notes = FIXED_HEADERS.map(function () { return ''; }).concat(questions.map(function (q) {
    return clip(q.text, 500) + '\n\nDoğru cevap: ' + clip(q.key, 200);
  }));
  var current = sheet.getLastColumn() ? sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0] : [];
  if (current.join('|') === headers.join('|')) return;
  sheet.getRange(1, 1, 1, headers.length).setValues([headers]).setNotes([notes]).setFontWeight('bold');
  sheet.getRange('B:B').setNumberFormat('@');   // baştaki sıfırlar kaybolmasın
  sheet.setFrozenRows(1);
  sheet.setFrozenColumns(2);
}

function buildRow(data, now) {
  var count = { first: 0, later: 0, revealed: 0, wrong: 0, empty: 0 };
  var cells = [], colors = [];
  data.questions.forEach(function (q) {
    var st = MARKS.hasOwnProperty(q.status) ? q.status : 'empty';
    count[st]++;
    var text = st === 'empty' ? '' : (MARKS[st] + ' ' + clip(q.answer, 200)).trim();
    if (st === 'later') text += ' (' + q.attempts + '. deneme)';
    cells.push(safe(text));
    colors.push(COLORS[st]);
  });
  var total = data.questions.length;
  var finalRight = data.questions.filter(function (q) { return q.correct === true; }).length;
  var values = [now, String(data.student).trim(), finalRight + ' / ' + total, count.first, count.revealed, count.empty].concat(cells);
  return { values: values, colors: FIXED_HEADERS.map(function () { return '#ffffff'; }).concat(colors) };
}

function clip(v, n) { v = String(v == null ? '' : v); return v.length > n ? v.slice(0, n) + '…' : v; }

/* = + - @ ile başlayan metin tabloda formül sanılmasın. */
function safe(v) { return /^[=+\-@]/.test(v) ? "'" + v : v; }

function json(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON);
}
