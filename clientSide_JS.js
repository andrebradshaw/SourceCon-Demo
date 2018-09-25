
//first we declare an html element
var popContainer = document.createElement("div");
//next we append that element to the body of the current page html
document.body.appendChild(popContainer);
//add an attribute, "id", and a name for that id, "pop_container"
popContainer.setAttribute("id", "pop_container");
//then we style that element
popContainer.style.display = "inline-block";
popContainer.style.position = "fixed";
popContainer.style.top = "300px";
popContainer.style.left = "70%";
popContainer.style.width = "26%";
popContainer.style.height = "20%";
popContainer.style.border = "1px solid DarkSlateGrey ";
popContainer.style.background = "DarkSlateGrey";
popContainer.style.borderRadius = "1em";
popContainer.style.padding = "3px";
popContainer.style.zIndex = "10000";
popContainer.style.fontFamily = '"Courier New", monospace';



//now we will create a button which will be used to close this element following the same steps as above
var closeBtn = document.createElement("button");
closeBtn.setAttribute("id", "note_btn_close");
document.getElementById("pop_container").appendChild(closeBtn);
document.getElementById("note_btn_close").innerText = "+";
//with some different styling
closeBtn.style.position = "absolute";
closeBtn.style.background = "transparent";
closeBtn.style.display = "inline-block";
closeBtn.style.width = "1%";
closeBtn.style.height = "2%";
closeBtn.style.transform = "scale(4.5, 4.5) translate(3px, -6px) rotate(45deg)";
closeBtn.style.borderRadius = "1em";
closeBtn.style.transition = "all 366ms";
closeBtn.style.transitionTimingFunction = "cubic-bezier(1,-1.12,.18,1.93)";
closeBtn.style.padding = "0px";
closeBtn.style.boxShadow = "0px";
closeBtn.style.border = "0px";
closeBtn.style.cursor = "pointer";
closeBtn.style.userSelect = "none";
closeBtn.style.fontFamily = '"Courier New", monospace';
closeBtn.style.fontWeight = "bold";
closeBtn.style.color = "Crimson";


//next up, lets create some input elements for a link, a name, and a note. This can be changed and expanded simply by adding to the placeHoldArr
var placeHoldArr = ["Link","Name","Note"];
//here we will create a loop which will create three elements for us. 
for(i = 0; i<placeHoldArr.length; i++) {
  var inputElm = document.createElement("input");
  document.getElementById("pop_container").appendChild(inputElm);
	//unique ids for each element "i" is = to the index number of the placeholder name.
  inputElm.setAttribute("id", "put_box_" + i);
	//placeholder is filled with the current item looping in the array
  inputElm.setAttribute("placeholder", placeHoldArr[i]);
  inputElm.style.width = "100%";
  inputElm.style.height = "23%"; 
  inputElm.style.padding = "6px";
  inputElm.style.border = "1px solid DarkSlateGrey";
  inputElm.style.background = "white";
  inputElm.style.borderRadius = "1em";
  inputElm.style.fontFamily = '"Courier New", monospace';
}


//and the last element we create will be a button to save this data

var saveBtn = document.createElement("button");
document.getElementById("pop_container").appendChild(saveBtn);
saveBtn.setAttribute("id", "savebtn_box");
document.getElementById("savebtn_box").innerText = "send2Sheets";
saveBtn.style.background = "DarkCyan";
saveBtn.style.border = "1px solid DarkSlateGrey";
saveBtn.style.width = "100%";
saveBtn.style.height = "24%";
saveBtn.style.borderRadius = "1em";
saveBtn.style.cursor = "pointer";
saveBtn.style.color = "white";
saveBtn.style.fontFamily = '"Courier New", monospace';


//that was all html in JavaScript.
//now we need a couple of functions to handle button clicks

//one for the close
function close(){
  document.body.removeChild(document.getElementById("pop_container"));
}

//but how does our application know when to invoke this function?
//we need an event listener
document.getElementById("note_btn_close").addEventListener("click", close);


//and now the function which will send our data to Google Apps Script for processing, "send2Sheets"
function send2Sheets(){
//lets assign the contents of the input elements to some variables for ease of calling them

  var link = translate(document.getElementById("put_box_0").value);
  var name = translate(document.getElementById("put_box_1").value);
  var note = translate(document.getElementById("put_box_2").value);
  var webAppUrl = "https://script.google.com/macros/s/AKfycbz9GT4EwU4anvC3_jEZ-Li_0zUVaE9g4XTUVHFFxpCJjSBA_Hk/exec";  

  //variable with the above items merged together
  var jsonp = webAppUrl+'?lnk='+link+'&nam='+name+'&not='+note;

  console.log(jsonp);
  window.open(jsonp);  
}
//and an event lister for this save button
document.getElementById("savebtn_box").addEventListener("click", send2Sheets);



//this method for sending data requires that we remove some characters that can throw errors.
//we can use regular expressions to handle this problem. we will repalce those characters with something else before sending the request, and then convert them back to the orginal on the server side.
//lets build a function to handle this.


//this function will take an argument (a string), and return a cleansed version of that string
function translate(str){
									//question marks are meta chars in Regex, so we have to escape it.
	return str.replace(/&/g, '_AMP_').replace(/\?/g, '_QST_').replace(/#/g, '_HSH_');
}
