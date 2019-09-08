"use strict"; // interpret document contents in JavaScript strict mode 

/* global variables */ 
var formValidity = true;

/* validate Personal Info */
function validatePersonalInfo() {
var errorDiv = document.querySelectorAll("div.errorMessage"); 
var nameField = document.getElementById("field1");
var emailField = document.getElementById("field2");
try {
// reset styles to valid state 	
nameField.style.background = "";
emailField.style.background = "";
errorDiv[0].style.display = "none";
	if (!(nameField.value || emailField.value)) {
	nameField.style.background = "rgb(255,233,233)";
	emailField.style.background = "rgb(255,233,233)";
	throw "Please fill out all Personal Info fields";
	} 
	else if (!(emailField.value)) {
	emailField.style.background = "rgb(255,233,233)";
	throw "Please Enter Your Email address";
	}
	else if (!(nameField.value)) {
	nameField.style.background = "rgb(255,233,233)";
	throw "Please Enter Your Name";}
	}
catch(msg) { 
	errorDiv[0].style.display = "block";   
	errorDiv[0].innerHTML = msg;    
	formValidity = false;} 
}

/* validate form */ 
function validateForm(evt) { 
	if (evt.preventDefault) { 
	evt.preventDefault(); // prevent form from submitting 
	} 
	else { 
	evt.returnValue = false; // prevent form from submitting in IE8 8   
	} 
	formValidity = true; // reset value for revalidation
	// add calls below to validation functions
	validatePersonalInfo();
	if (formValidity === true) { 
	document.getElementById("errorText").innerHTML = ""; 
	document.getElementById("errorText").style.display = "none"; 
	document.getElementsByTagName("form")[0].submit(); 
	} 
	else {
	document.getElementById("errorText").innerHTML = "Please fix the indicated problems and then resubmit your form.";
    document.getElementById("errorText").style.display = "block"; 
	} 
}

/* create event listeners */ 
function createEventListeners() { 
var form = document.getElementsByTagName("form")[0]; 
	if (form.addEventListener) { 
	form.addEventListener("submit", validateForm, false); 
	} else if (form.attachEvent) { 
	form.attachEvent("onsubmit", validateForm); 
	}
}

function setUpPage() { 
createEventListeners();

}

/* run setup function when page finishes loading */ 
if (window.addEventListener) { 
window.addEventListener("load", setUpPage, false); 
} else if (window.attachEvent) { 
window.attachEvent("onload", setUpPage); 
}