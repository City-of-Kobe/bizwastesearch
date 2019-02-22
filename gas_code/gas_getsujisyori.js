// https://www.indetail.co.jp/blog/171223/
// https://qiita.com/soundTricker/items/21d3a39222fb1edbce57
// https://qiita.com/J_3woo86/items/4fb7dcbde8a5e87ba480
function createSheet() {
  var oldfileId = variable("spreadsheetId");
  var newfolderId = variable("newfolderId");
  //STEP1:現在の「アクセスログ」ファイルを月次ファイルとして保存（保存ファイル名:yyyymm（例:2018年4月分→201804））
  var templateFile = DriveApp.getFileById(oldfileId); // コピー元
  var OutputFolder = DriveApp.getFolderById(newfolderId); // コピー先ディレクトリ
  var now = new Date();
  var datesery = new Date(now.getFullYear(), now.getMonth() - 1, now.getDate());
  var OutputFileName = Utilities.formatDate(datesery, "Asia/Tokyo", "yyyyMM"); // 出力ファイル名
  templateFile.makeCopy(OutputFileName, OutputFolder);
  //STEP2:「アクセスログ」の内容をクリア
  // https://qiita.com/negito6/items/c64a7a8589faaffcfdcf
  // https://excel-ubara.com/apps_script1/GAS012.html
  var spreadsheet = SpreadsheetApp.openById(oldfileId);
  var sheetName, sheet, lastRow, lastCol, i;
  i = 0;
  sheetName = "AllLog";
  while (i < 1) {
    sheet = spreadsheet.getSheetByName(sheetName);
    lastRow = sheet.getLastRow();
    lastCol = sheet.getLastColumn();
    sheet.getRange(2, 1, lastRow, lastCol).clearContent();
    if (sheetName == "AllLog") {
      sheetName = "SearchLog";
    } else if (sheetName == "SearchLog") {
      sheetName = "SelectLog";
    } else if (sheetName == "SelectLog") {
      sheetName = "doPostLog";
    } else {
      i = 1;
    }
  }
  //STEP3:STEP1で作成したスプレッドシートをExcel変換→メール送信
  // https://apps.qiite.net/gas/gas_gmail/
  // フォルダ・メール関連
  var objFiles;
  var objFile;
  var fileName;
  var key;
  // メール関係
  var mailto = "bizwaste-search@office.city.kobe.lg.jp";
  var m = Utilities.formatDate(datesery, "Asia/Tokyo", "M");
  var y = Utilities.formatDate(datesery, "Asia/Tokyo", "yyyy");
  var subject =
    "分別検索サイトアクセスログ（自動配信） " + y + "年" + m + "月分";
  var body =
    "分別検索サイトの" +
    y +
    "年" +
    m +
    "月分のアクセスログです。\n添付のログファイルをダウンロード・保存してください。\n\nなお、アクセスログはGoogleドライブに常時保存しています。\n最新のログ・過去のログは以下からも確認できます。\n\n○最新のログ\nhttps://drive.google.com/open?id=1l9XLVgqbNyMeOrXRPr1psjGspcX-QN7DfEeWjcKypTk\n※直接編集厳禁\n\n○過去のログ\nhttps://drive.google.com/open?id=1J7ndldQ6vw-Ck4kpk6h5DS-D3SUhwQpy\n\n○Googleアカウント\nkobe.bizwaste@gmail.com\nログインは、\nhttps://www.google.co.jp\nから。";
  // その他
  var fetchUrl;
  var fetchOpt = {
    headers: { Authorization: "Bearer " + ScriptApp.getOAuthToken() },
    muteHttpExceptions: true
  };
  var xlsxName;
  var attachmentFiles = new Array();
  try {
    folderName = OutputFolder.getName();
    objFiles = OutputFolder.getFilesByType(MimeType.GOOGLE_SHEETS);
    while (objFiles.hasNext()) {
      objFile = objFiles.next();
      fileName = objFile.getName();
      if (fileName == OutputFileName) {
        key = objFile.getId();
        xlsxName = fileName + ".xlsx";
        fetchUrl =
          "https://docs.google.com/feeds/download/spreadsheets/Export?key=" +
          key +
          "&exportFormat=xlsx";
        attachmentFiles.push(
          UrlFetchApp.fetch(fetchUrl, fetchOpt)
            .getBlob()
            .setName(xlsxName)
        );
      }
    }
  } catch (e) {
    var newlog = variable("newlog");
    var kakolog = variable("kakolog");
    var gaccount = variable("gaccount");
    subject = "分別検索サイトアクセスログ（自動配信）　処理エラー";
    body =
      "このメールはGoogleドライブを活用した自動配信です。\n\n最新月のアクセスログの配信に際し、以下のエラーにより正しく実行されませんでした。\n" +
      e.message +
      "\n\nなお、最新のログ・過去のログは以下からも確認できます。\n\n○最新のログ\n" +
      newlog +
      "\n\n○過去のログ\n" +
      kakolog +
      "\n\n○Googleアカウント\n" +
      gaccount +
      "\nログインは、\nhttps://www.google.co.jp\nから。";
  }
  // メール送信
  MailApp.sendEmail(mailto, subject, body, { attachments: attachmentFiles });
}
