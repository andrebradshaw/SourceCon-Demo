
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
