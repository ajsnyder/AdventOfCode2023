/*  Global Variables    */
var ss = SpreadsheetApp.getActive();
var sheetDummy = ss.getSheetByName('Dummy');
var sheetDataInput = ss.getSheetByName('Input');
var sheetD1P1 = ss.getSheetByName('D1P1');
var sheetD1P2 = ss.getSheetByName('D1P2');


function Day1Puzzle() {
    /* Setup Google Sheets document with clean worksheets */

    // Create Dummy Sheet            -- Prevents GAS from throwing cannot delete all sheets error
    var sheets = ss.getSheets();
    if (sheets.length == 1) {
        ss.insertSheet('Dummy');
    }
    sheetDummy = ss.getSheetByName('Dummy');

    // Clear and initialize the data input worksheet
    if (sheetDataInput) {
        ss.deleteSheet(sheetDataInput);
    }
    ss.insertSheet('Input');
    sheetDataInput = ss.getSheetByName('Input');

    // Clear and initialize the Day 1 Puzzle 1 worksheet
    if (sheetD1P1) {
        ss.deleteSheet(sheetD1P1);
    }
    ss.insertSheet('D1P1');
    sheetD1P1 = ss.getSheetByName('D1P1');

    // Clear and initialize the Day 1 Puzzle 2 worksheet
    if (sheetD1P2) {
        ss.deleteSheet(sheetD1P2);
    }
    ss.insertSheet('D1P2');
    sheetD1P2 = ss.getSheetByName('D1P2');

    // Delete the Dummy sheet (if exists)
    if (sheetDummy) {
        ss.deleteSheet(sheetDummy);
    }

    /* Import data into Google Sheet */

    convert_txt_gsheets();

    /* D1P1:  Find sum of all of the calibration values */

    // Note:    Calibration value for each row is two-digit value
    //          Tens digit of calibration value is the first digit value found in string
    //          Ones digit of calibration value is the last digit value found in string

    // 1) Find number of rows of input data

    var rangeInputData = sheetDataInput.getDataRange();
    var lastrowInputData = rangeInputData.getLastRow();
    var valuesInputData = sheetDataInput.getRange(1, 1, lastrowInputData, 1).getValues();
    var valueNumberInputRows = valuesInputData.length;
    Logger.log(valueNumberInputRows);

    // 2)  Find the calibration value in each row of input data

    // for (var i = 1; i <= valueNumberInputRows; i++) {
    for (var i = 1; i <= 5; i++) { 
        var currentRow = valuesInputData[i-1];
        Logger.log(currentRow);

        // 2a)  Find the tens digit
        var regExpFirstDigit = new RegExp('([0-9]{1}).*', 'gmi');
        var FirstDigit = regExpFirstDigit.exec(currentRow)[1];
        Logger.log(FirstDigit);

        // 2b)  Find the ones digit
        var regExpLastDigit = new RegExp('.*([0-9]{1})', 'gmi');
        var LastDigit = regExpLastDigit.exec(currentRow)[1];
        Logger.log(LastDigit);

        // 2c)  Create calibration value
        FirstDigit = parseInt(FirstDigit);
        LastDigit = parseInt(LastDigit);
        
        var rowCalibrationValue = 10 * FirstDigit + LastDigit
        Logger.log(rowCalibrationValue);

    }
};


/*  Generalized function to setup new worksheet */
// TODO 


/* Import data into Google Sheet */

function convert_txt_gsheets(){
    var file = DriveApp.getFilesByName('AoC2023_D1P1.txt').next();
    var body = file.getBlob().getDataAsString().split(/\n/);
    var result = body.map( r => r.split(/\t/));
    ss.getSheetByName('Input').getRange(1,1,result.length,result[0].length).setValues(result);
    return;
}