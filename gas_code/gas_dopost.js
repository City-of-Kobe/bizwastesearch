// 参考:http://derax.hateblo.jp/entry/2015/09/25/170829
function doPost(e) {
  addLog(e);
  var g = e.parameter.g;
  var spreadsheetId = variable("spreadsheetId");
  var ss = SpreadsheetApp.openById(spreadsheetId);
  var sheet;
  var uId = e.parameter.uId; /*user’s ID*/
  var uNo = e.parameter.uNo; /*user’s NO*/
  if (g === "a") {
    sheet = ss.getSheetByName("AllLog");
    var lHr = e.parameter.lHr; /*location.href*/
    lHr = decodeURIComponent(lHr);
    var lPa = e.parameter.lPa; /*location.pathname*/
    var act = e.parameter.action; /*action*/
    var eve = e.parameter.event; /*event*/
    var lSe = e.parameter.lSe; /*location.search*/
    lSe = decodeURIComponent(lSe);
    var lHa = e.parameter.lHa; /*location.hash*/
    var dTi = e.parameter.dTi; /*document.title*/
    var dRe = e.parameter.dRe; /*document.referrer*/
    var dev = e.parameter.dev; /*Device*/
    var nAc = e.parameter.nAc; /*navigator.appCodeName*/
    var nAn = e.parameter.nAn; /*navigator.appName*/
    var nAv = e.parameter.nAv; /*navigator.appVersion*/
    var nCe = e.parameter.nCe; /*navigator.cookieEnabled*/
    var nPl = e.parameter.nPl; /*navigator.platform*/
    var nUa = e.parameter.nUa; /*navigator.userAgent*/
    var nCp = e.parameter.nCp; /*navigator.cpuClass*/
    var uLa = e.parameter.uLa; /*language*/
    var cLa = e.parameter.cLa; /*client language*/
    var sWi = e.parameter.sWi; /*screen.width*/
    var sHe = e.parameter.sHe; /*screen.height*/
    var wAv = e.parameter.wAv; /*screen.availWidth*/
    var sAl = e.parameter.sAl; /*screen.availHeight*/
    var sCl = e.parameter.sCl; /*screen.colorDepth*/
    var sPi = e.parameter.sPi; /*screen.pixelDepth*/
    sheet.appendRow([
      new Date(),
      uId,
      uNo,
      lHr,
      lPa,
      act,
      eve,
      lSe,
      lHa,
      dTi,
      dRe,
      dev,
      nAc,
      nAn,
      nAv,
      nCe,
      nPl,
      nUa,
      nCp,
      uLa,
      cLa,
      sWi,
      sHe,
      wAv,
      sAl,
      sCl,
      sPi
    ]);
  } else if (g === "b") {
    sheet = ss.getSheetByName("SearchLog");
    var sWd = e.parameter.sWd; /*search Word（変換前）*/
    var tWd = e.parameter.tWd; /*search Word（変換後）*/
    var sRs = e.parameter.sRs; /*search Result*/
    sheet.appendRow([new Date(), uId, uNo, sWd, tWd, sRs]);
  } else if (g === "c") {
    sheet = ss.getSheetByName("SelectLog");
    var sNo = e.parameter.sNo; /*select No*/
    var sNa = e.parameter.sNa; /*select Name*/
    var sSf = e.parameter.sSf; /*select suffix*/
    var sMn = e.parameter.sMn; /*select Menu*/
    sheet.appendRow([new Date(), uId, uNo, sNo, sNa, sSf, sMn]);
  } else if (g === "d") {
    sheet = ss.getSheetByName("Questionaire");
    var q1 = e.parameter.q1; /*Q1's answer*/
    var q2 = e.parameter.q2; /*Q2's answer*/
    sheet.appendRow([new Date(), uId, uNo, q1, q2]);
  }
}
function addLog(text) {
  var spreadsheetId = variable("spreadsheetId");
  var sheetName = "doPostLog";
  var spreadsheet = SpreadsheetApp.openById(spreadsheetId);
  var sheet = spreadsheet.getSheetByName(sheetName);
  sheet.appendRow([new Date() /*タイムスタンプ*/, text]);
  return text;
}
