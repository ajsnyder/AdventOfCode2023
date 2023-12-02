// Spreadsheet URL:  https://docs.google.com/spreadsheets/d/1gJYW1Mq_HGGDhcDWm58NGVclT5ePDsANfKGkAkVSHdo/edit#gid=27229910

/*  Global Variables    */
var ss = SpreadsheetApp.getActive();
var sheetDummy = ss.getSheetByName('Dummy');
var sheetDataInput = ss.getSheetByName('D1Input');
var sheetD1P1 = ss.getSheetByName('D1P1');
var sheetD1P2 = ss.getSheetByName('D1P2');

function Day1SolveAll () {
    SetupWorksheets('D1Input');
    SetupWorksheets('D1P1');
    SetupWorksheets('D1P2');

    sheetDataInput = ss.getSheetByName('D1Input');
    sheetD1P1 = ss.getSheetByName('D1P1');
    sheetD1P2 = ss.getSheetByName('D1P2');

    Day1Puzzle1();
    Day1Puzzle2();
};

/*  Day 1, Puzzle 1 */
function Day1Puzzle1() {

    /* D1P1:  Find sum of all of the calibration values */

    // Note:    Calibration value for each row is two-digit value
    //          Tens digit of calibration value is the first digit value found in string
    //          Ones digit of calibration value is the last digit value found in string

    // 0) Import data into Google Sheet
    convert_txt_gsheets('AoC2023_D1P1.txt', 'D1Input');

    // 1) Find number of rows of input data
    var rangeInputData = sheetDataInput.getDataRange();
    var lastrowInputData = rangeInputData.getLastRow();
    var valuesInputData = sheetDataInput.getRange(1, 1, lastrowInputData, 1).getValues();
    var valueNumberInputRows = valuesInputData.length;

    // 2)  Find the calibration value in each row of input data and add to grand total calibration value
    var totalCalibrationValues = 0;                                              // Reset running total

    for (var i = 1; i <= valueNumberInputRows; i++) {
    //for (var i = 1; i <= 5; i++) {                                            // Used for testing
        var currentRow = valuesInputData[i-1];

        // 2a)  Find the tens digit
        var regExpFirstDigit = new RegExp('([0-9]{1}).*', 'gmi');
        var FirstDigit = regExpFirstDigit.exec(currentRow)[1];

        // 2b)  Find the ones digit
        var regExpLastDigit = new RegExp('.*([0-9]{1})', 'gmi');
        var LastDigit = regExpLastDigit.exec(currentRow)[1];

        // 2c)  Create calibration value
        FirstDigit = parseInt(FirstDigit);
        LastDigit = parseInt(LastDigit);
        var rowCalibrationValue = 10 * FirstDigit + LastDigit

        // 2d)  Add row-level calibration value to grand total of all calibration values
        totalCalibrationValues = totalCalibrationValues + rowCalibrationValue;
    }

    // 3)  Output sum of all calibration vales to solution sheet
    sheetD1P1.getRange('B2').setValue('Answer:');
    sheetD1P1.getRange('C2').setValue(totalCalibrationValues);
};

/* Day 1, Puzzle 2 */
function Day1Puzzle2()  {
    /* D1P2:  Find sum of all of the calibration values */

    // Note:    Calibration value for each row is two-digit value
    //          Tens digit of calibration value is the first digit value found in string
    //          Ones digit of calibration value is the last digit value found in string
    //          Numbers are written out as words (e.g. 'one', 'two') in some of the rows
    //          These word numbers must be accounted for when determining first and last digit value in each string


    // 0)  Reset variable for grand total of all calibration numbers
    var totalCalibrationValues = 0;                                              // Reset running total

    // 1)  Calculate first digit contribution to calibration total

    // 1a)  Create new copy of input data
    convert_txt_gsheets('AoC2023_D1P1.txt', 'D1P2');
    sheetDataInput = ss.getSheetByName('D1P2');

    // 1b)  Find / replace values, taking the value from the left-most found word in "blended words" 
    var wordvalues = ['eighthree', 'eightwo', 'fiveight', 'nineight', 'oneight', 'sevenine', 'threeight', 'twone', 'nine', 'eight', 'seven', 'six', 'five', 'four', 'three', 'two', 'one'];
    var numvalues = ['8', '8', '5', '9', '1', '7', '3', '2', '9', '8', '7', '6', '5', '4', '3', '2', '1'];

    for (var i = 1; i <= wordvalues.length; i++) {
        var wordvalue = wordvalues[i-1];
        var numvalue = numvalues[i-1];
        word_values_to_numbers(wordvalue, numvalue);    
    }

    // 1c) Find number of rows of input data
    var rangeInputData = sheetDataInput.getDataRange();
    var lastrowInputData = rangeInputData.getLastRow();
    var valuesInputData = sheetDataInput.getRange(1, 1, lastrowInputData, 1).getValues();
    var valueNumberInputRows = valuesInputData.length;

    // 2)  Find the calibration value in each row of input data for TENS DIGIT ONLY and add to grand total calibration value
    for (var i = 1; i <= valueNumberInputRows; i++) {
    //for (var i = 1; i <= 10; i++) {                                            // Used for testing
        var currentRow = valuesInputData[i-1];

        // 2a)  Find the tens digit
        var regExpFirstDigit = new RegExp('([0-9]{1}).*', 'gmi');
        var FirstDigit = regExpFirstDigit.exec(currentRow)[1];

        // 2b)  Create calibration value
        FirstDigit = parseInt(FirstDigit);
        LastDigit = 0;
        var rowCalibrationValue = 10 * FirstDigit + LastDigit;

        // 2c)  Add row-level calibration value to grand total of all calibration values
        totalCalibrationValues = totalCalibrationValues + rowCalibrationValue;
        Logger.log(currentRow + " | " + FirstDigit + " | " + LastDigit + " | " + totalCalibrationValues);
    }

    // 3)  Calculate last digit contribution to calibration total

    // 3a)  Create new copy of input data
    convert_txt_gsheets('AoC2023_D1P1.txt', 'D1P2');
    sheetDataInput = ss.getSheetByName('D1P2');

    // 3b)  Find / replace values, taking the value from the left-most found word in "blended words" 
    var wordvalues = ['eighthree', 'eightwo', 'fiveight', 'nineight', 'oneight', 'sevenine', 'threeight', 'twone', 'nine', 'eight', 'seven', 'six', 'five', 'four', 'three', 'two', 'one'];
    var numvalues = ['3', '2', '8', '8', '8', '9', '8', '1', '9', '8', '7', '6', '5', '4', '3', '2', '1'];

    for (var i = 1; i <= wordvalues.length; i++) {
        var wordvalue = wordvalues[i-1];
        var numvalue = numvalues[i-1];
        word_values_to_numbers(wordvalue, numvalue);    
    }

    // 3c) Find number of rows of input data
    var rangeInputData = sheetDataInput.getDataRange();
    var lastrowInputData = rangeInputData.getLastRow();
    var valuesInputData = sheetDataInput.getRange(1, 1, lastrowInputData, 1).getValues();
    var valueNumberInputRows = valuesInputData.length;

    // 4)  Find the calibration value in each row of input data for ONES DIGIT ONLY and add to grand total calibration value
    for (var i = 1; i <= valueNumberInputRows; i++) {
    //for (var i = 1; i <= 10; i++) {                                            // Used for testing
        var currentRow = valuesInputData[i-1];

        // 4a)  Find the ones digit
        var regExpLastDigit = new RegExp('.*([0-9]{1})', 'gmi');
        var LastDigit = regExpLastDigit.exec(currentRow)[1];

        // 4b)  Create calibration value
        FirstDigit = 0;
        LastDigit = parseInt(LastDigit);
        var rowCalibrationValue = 10 * FirstDigit + LastDigit;

        // 4c)  Add row-level calibration value to grand total of all calibration values
        totalCalibrationValues = totalCalibrationValues + rowCalibrationValue;
        Logger.log(currentRow + " | " + FirstDigit + " | " + LastDigit + " | " + totalCalibrationValues);
    }

    // 5)  Output sum of all calibration vales to solution sheet
    sheetD1P2.getRange('C2').setValue('Answer:');
    sheetD1P2.getRange('D2').setValue(totalCalibrationValues);
};

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

//  Helper Function to Convert Word Values to Traditional Values 
function word_values_to_numbers(wordvalue, numbervalue){
    var textFinder = sheetDataInput.createTextFinder(wordvalue);
    textFinder.replaceAllWith(numbervalue);
};

// Import data into Google Sheet
function convert_txt_gsheets(filename, sheetname){
    // var file = DriveApp.getFilesByName('AoC2023_D1P1.txt').next();
    var file = DriveApp.getFilesByName(filename).next();
    var body = file.getBlob().getDataAsString().split(/\n/);
    var result = body.map( r => r.split(/\t/));
    // ss.getSheetByName('Input').getRange(1,1,result.length,result[0].length).setValues(result);
    ss.getSheetByName(sheetname).getRange(1,1,result.length,result[0].length).setValues(result);
    return;
};

