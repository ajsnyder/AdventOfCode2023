/*  Global Variables    */
var ss = SpreadsheetApp.getActive();
var sheetDummy = ss.getSheetByName('Dummy');
var sheetDataInput = ss.getSheetByName('Input');
var sheetD1P1 = ss.getSheetByName('D1P1');
var sheetD1P2 = ss.getSheetByName('D1P2');

/* Setup Google Sheets document with clean worksheets */

// Create Dummy Sheet            -- Prevents GAS from throwing cannot delete all sheets error
var sheets = ss.getSheets();
if (sheets.length == 1) {
    ss.insertSheet('Dummy');
}

// Clear and initialize the data input worksheet
if (sheetDataInput) {
    ss.deleteSheet(sheetDataInput);
}
ss.insertSheet('Input');


// Clear and initialize the Day 1 Puzzle 1 worksheet
if (sheetD1P1) {
    ss.deleteSheet(sheetD1P1);
}
ss.insertSheet('D1P1');

// Clear and initialize the Day 1 Puzzle 2 worksheet
if (sheetD1P2) {
    ss.deleteSheet(sheetD1P2);
}
ss.insertSheet('D1P2');

// Delete the Dummy sheet (if exists)
if (sheetDummy) {
    ss.deleteSheet(sheetDummy);
}


/* Import data into Google Sheet */

function convert_txt_gsheets(){
    var file = DriveApp.getFilesByName('AoC2023_D1P1.txt').next();
    var body = file.getBlob().getDataAsString().split(/\n/);
    var result = body.map( r => r.split(/\t/));
    ss.getSheetByName('Input').getRange(1,1,result.length,result[0].length).setValues(result);
    return;
  }