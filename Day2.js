// Spreadsheet URL:  https://docs.google.com/spreadsheets/d/1gJYW1Mq_HGGDhcDWm58NGVclT5ePDsANfKGkAkVSHdo/edit#gid=27229910

/*  Global Variables    */
var ss = SpreadsheetApp.getActive();
var sheetDummy = ss.getSheetByName('Dummy');
var sheetDataInput = ss.getSheetByName('D2Input');
var sheetD1P1 = ss.getSheetByName('D2P1');
var sheetD1P2 = ss.getSheetByName('D2P2');

SetupWorksheets('D2Input');
SetupWorksheets('D2P1');
SetupWorksheets('D2P2');

sheetD2DataInput = ss.getSheetByName('D2Input');
sheetD2P1 = ss.getSheetByName('D2P1');
sheetD2P2 = ss.getSheetByName('D2P2');

convert_txt_gsheets('AoC2023_D2.txt', 'D2Input');


/* Helper Functions */
// Setup Worksheets
function SetupWorksheets(sheetname) {

    /* Setup Google Sheets document with clean worksheets */

    // Create Dummy Sheet            -- Prevents GAS from throwing cannot delete all sheets error
    var sheets = ss.getSheets();
    if (sheets.length == 1) {
        ss.insertSheet('Dummy');
    }
    sheetDummy = ss.getSheetByName('Dummy');

    // Clear and initialize the data input worksheet
    if (ss.getSheetByName(sheetname)) {
        ss.deleteSheet(ss.getSheetByName(sheetname));
    }
    ss.insertSheet(sheetname);

    // Delete the Dummy sheet (if exists)
    if (sheetDummy) {
        ss.deleteSheet(sheetDummy);
    }

};

// Import data into Google Sheet
function convert_txt_gsheets(filename, sheetname){
    var file = DriveApp.getFilesByName(filename).next();
    var body = file.getBlob().getDataAsString().split(/\n/);
    var result = body.map( r => r.split(/\t/));
    ss.getSheetByName(sheetname).getRange(1,1,result.length,result[0].length).setValues(result);
    return;
};
