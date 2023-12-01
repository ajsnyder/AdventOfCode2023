/*  Global Variables    */
var ss = SpreadsheetApp.getActive();
var sheetDummy = ss.getSheetByName('Dummy');
var sheetDataInput = ss.getSheetByName('Input');
var sheetD1P1 = ss.getSheetByName('D1P1');
var sheetD1P2 = ss.getSheetByName('D1P2');

function Day1SolveAll () {
    SetupWorksheets();
    Day1Puzzle1();
    Day1Puzzle2();
};

/*  Day 1, Puzzle 1 */
function Day1Puzzle1() {

    /* D1P1:  Find sum of all of the calibration values */

    // Note:    Calibration value for each row is two-digit value
    //          Tens digit of calibration value is the first digit value found in string
    //          Ones digit of calibration value is the last digit value found in string

    // 1) Find number of rows of input data

    var rangeInputData = sheetDataInput.getDataRange();
    var lastrowInputData = rangeInputData.getLastRow();
    var valuesInputData = sheetDataInput.getRange(1, 1, lastrowInputData, 1).getValues();
    var valueNumberInputRows = valuesInputData.length;
    //Logger.log(valueNumberInputRows);

    // 2)  Find the calibration value in each row of input data and add to grand total calibration value

    var totalCalibrationValues = 0;                                              // Reset running total
    //Logger.log(totalCalibrationValues);

    for (var i = 1; i <= valueNumberInputRows; i++) {
    //for (var i = 1; i <= 5; i++) {                                            // Used for testing
        var currentRow = valuesInputData[i-1];
        //Logger.log(currentRow);

        // 2a)  Find the tens digit
        var regExpFirstDigit = new RegExp('([0-9]{1}).*', 'gmi');
        var FirstDigit = regExpFirstDigit.exec(currentRow)[1];
        //Logger.log(FirstDigit);

        // 2b)  Find the ones digit
        var regExpLastDigit = new RegExp('.*([0-9]{1})', 'gmi');
        var LastDigit = regExpLastDigit.exec(currentRow)[1];
        //Logger.log(LastDigit);

        // 2c)  Create calibration value
        FirstDigit = parseInt(FirstDigit);
        LastDigit = parseInt(LastDigit);
        
        var rowCalibrationValue = 10 * FirstDigit + LastDigit
        //Logger.log(rowCalibrationValue);

        // 2d)  Add row-level calibration value to grand total of all calibration values

        totalCalibrationValues = totalCalibrationValues + rowCalibrationValue;
        //Logger.log(totalCalibrationValues);

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

    // 0)  Create new copy of input data 
    convert_txt_gsheets('AoC2023_D1P1.txt', 'D1P2');
    sheetDataInput = ss.getSheetByName('D1P2');

    // 1)  Find and convert all values stated as words to their numerical form.
    //var wordvalues = ['one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine'];
    //var numvalues = ['1', '2', '3', '4', '5', '6', '7', '8', '9'];

    // 1a)  Testing new "blended" word values, searching from left side only
    var wordvalues = ['eighthree', 'eightwo', 'fiveight', 'nineight', 'oneight', 'sevenine', 'threeight', 'twone', 'nine', 'eight', 'seven', 'six', 'five', 'four', 'three', 'two', 'one'];
    var numvalues = ['8', '8', '5', '9', '1', '7', '3', '2', '9', '8', '7', '6', '5', '4', '3', '2', '1'];

    for (var i = 1; i <= wordvalues.length; i++) {
        var wordvalue = wordvalues[i-1];
        var numvalue = numvalues[i-1];
        word_values_to_numbers(wordvalue, numvalue);    
        //Logger.log(wordvalue);
        //Logger.log(numvalue);

    }

    // 2) Find number of rows of input data
    var rangeInputData = sheetDataInput.getDataRange();
    var lastrowInputData = rangeInputData.getLastRow();
    var valuesInputData = sheetDataInput.getRange(1, 1, lastrowInputData, 1).getValues();
    var valueNumberInputRows = valuesInputData.length;
    Logger.log(valueNumberInputRows);

    // 3)  Find the calibration value in each row of input data and add to grand total calibration value

    var totalCalibrationValues = 0;                                              // Reset running total
    //Logger.log(totalCalibrationValues);

    for (var i = 1; i <= valueNumberInputRows; i++) {
    //for (var i = 1; i <= 10; i++) {                                            // Used for testing
        var currentRow = valuesInputData[i-1];
        //Logger.log(currentRow);

        // 3a)  Find the tens digit
        var regExpFirstDigit = new RegExp('([0-9]{1}).*', 'gmi');
        var FirstDigit = regExpFirstDigit.exec(currentRow)[1];
        //Logger.log(FirstDigit);

        // 3b)  Find the ones digit
        var regExpLastDigit = new RegExp('.*([0-9]{1})', 'gmi');
        var LastDigit = regExpLastDigit.exec(currentRow)[1];
        //Logger.log(LastDigit);

        //Logger.log(currentRow + " | " + FirstDigit + " | " + LastDigit);

        // 3c)  Create calibration value
        FirstDigit = parseInt(FirstDigit);
        LastDigit = parseInt(LastDigit);
        
        var rowCalibrationValue = 10 * FirstDigit + LastDigit
        //Logger.log(rowCalibrationValue);

        // 3d)  Add row-level calibration value to grand total of all calibration values

        totalCalibrationValues = totalCalibrationValues + rowCalibrationValue;
        Logger.log(currentRow + " | " + FirstDigit + " | " + LastDigit + " | " + totalCalibrationValues);

        //Logger.log(totalCalibrationValues);
    }

    // 4)  Output sum of all calibration vales to solution sheet

    sheetD1P2.getRange('C2').setValue('Answer:');
    sheetD1P2.getRange('D2').setValue(totalCalibrationValues);

};

/*  Setup Worksheets */
function SetupWorksheets() {

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

    convert_txt_gsheets('AoC2023_D1P1.txt', 'Input');

};

/* Helper Functions */

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

