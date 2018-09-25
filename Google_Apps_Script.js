  //this variable will hold our SpreadsheetId. The spreadsheet id is located in the URL of your spreadsheet 
  //https://docs.google.com/spreadsheets/d/YourSpr34dsh33t-id_is_L0CAT3TED_here/edit#gid=0
  var sheetId = "1n4JD4PRYL6uIMnzMbes8tHmaGIlJBUP-RG4ENd3DCeU";
  
  
  //this variable will call up our speadsheet using the Google Apps Script function.
  //https://developers.google.com/apps-script/reference/spreadsheet/spreadsheet-app#openById(String)
  var ss = SpreadsheetApp.openById(sheetId)
  
  
  //this variable will call up the specific sheet by name.
  //https://developers.google.com/apps-script/reference/spreadsheet/spreadsheet#getSheetByName(String)
  var s1 = ss.getSheetByName("Sheet1");
  
  
  
  //anway. you get the idea. cool stuff. pretty handy. the next step is a little web form. we allow a user input, 
  //boolean if we want to get fancy. then we pass that through a doGet() and return and HTML page with the matching data. you can get as specific as you like. Your only restrictions is your ability to do math...
var searchterm = "Google Apps Script";
var now = new Date().getTime();
var searchDateStart = new Date("08/28/2018").getTime();
var searchDateEnd = new Date("08/29/2018").getTime()+86400000; // It is about 20 - 30 minutes of time to write some conditions which allow for any date formate. I have some advanced functions to handle this from a calendar project. 
function q_test(){
  var numRows = s1.getLastRow();
  var numCols = s1.getLastColumn();
  var sheet2dArr = s1.getRange(1, 1, numRows, numCols).getValues();

  for(i=0; i<sheet2dArr.length; i++){ //now we will create a loop based on the length of rows in the sheet
     var timestamp = new Date(sheet2dArr[i][0]).getTime();
     var link = sheet2dArr[i][1];
     var name = sheet2dArr[i][2];
     var note = sheet2dArr[i][3];
     var search2RegX = new RegExp(searchterm, "i");
//     if(search2RegX.test(note) === true){
     if(timestamp > searchDateStart && timestamp < searchDateEnd){//okay, so we need to add a day to the end date. 
     Logger.log(sheet2dArr[i]);
    }

  }

}


function translate(str){
	return str.replace(/_AMP_/g, '&').replace(/_QST_/g, '?').replace(/_HSH_/g, '#');
}


//this function will handle our clientside request
//https://developers.google.com/apps-script/guides/web
function doGet(req) {
  
  //this variable will hold our SpreadsheetId. The spreadsheet id is located in the URL of your spreadsheet 
  //https://docs.google.com/spreadsheets/d/YourSpr34dsh33t-id_is_L0CAT3TED_here/edit#gid=0
  var sheetId = "1n4JD4PRYL6uIMnzMbes8tHmaGIlJBUP-RG4ENd3DCeU";
  
  
  //this variable will call up our speadsheet using the Google Apps Script function.
  //https://developers.google.com/apps-script/reference/spreadsheet/spreadsheet-app#openById(String)
  var ss = SpreadsheetApp.openById(sheetId)
  
  
  //this variable will call up the specific sheet by name.
  //https://developers.google.com/apps-script/reference/spreadsheet/spreadsheet#getSheetByName(String)
  var s1 = ss.getSheetByName("Sheet1");
  
  
  //getLastRow() will return the number of the last row containing data within the specified sheet. 
  //https://developers.google.com/apps-script/reference/spreadsheet/spreadsheet#getLastRow()
  //we add 1 to the returned number to get the starting row where we would like to point for our data to be placed
  var nextRow = s1.getLastRow()+1;


  //now we can organize the data coming from our client request
  //wrapping the data in our translate function
  var link = translate(req.parameter.lnk);
  var name = translate(req.parameter.nam);
  var note = translate(req.parameter.not);
  //I like to know when I added a record, so we will use the new Date() function to get the current date/time
  //https://www.w3schools.com/js/js_dates.asp
  var now = new Date();

  //now we use the getRange() function to specify where we want to put our data
  //starting with the first empty row, and the first column
  //using the setValue() function to assign the data we wish to put into our cell
  s1.getRange(nextRow,1).setValue(now);
  s1.getRange(nextRow,2).setValue(link);
  s1.getRange(nextRow,3).setValue(name);
  s1.getRange(nextRow,4).setValue(note);

  //finally, lets return some information to let ourselves know the information was saved
  //https://developers.google.com/apps-script/reference/content/content-service
  var html = '<div><p>Yay! your stuff was added to the <a href="https://docs.google.com/spreadsheets/d/'+sheetId+'">spreadsheet</a>!<\/p></li></div>';
  
  return HtmlService.createHtmlOutput(html)
}
