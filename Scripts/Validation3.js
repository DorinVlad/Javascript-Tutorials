"use strict"; // interpret document contents in JavaScript strict mode 

/* global variables */ 
var formValidity = true;

/* remove default values and formatting from Brand of Choice selection lists */ 
function removeSelectDefaults() {
var emptyBoxes = document.getElementById("field7");
emptyBoxes.selectedIndex = -1;
}

/* validate Personal Info */
function validatePersonalInfo() {
var errorDiv = document.querySelectorAll("div.errorMessage"); 
var nameField = document.getElementById("field1");
var emailField = document.getElementById("field2");
var namePattern = /^([A-Za-z ]{2,} )([A-Za-z]{2,})$/;
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
	else if (namePattern.test(nameField.value) === false) {
	nameField.style.background = "rgb(255,233,233)";
	throw "Name must contain a-z/A-Z only and a space separator";}
	}
catch(msg) { 
	errorDiv[0].style.display = "block";   
	errorDiv[0].innerHTML = msg;    
	formValidity = false; } 
}

function validateCPU() {
var fieldsetValidity = true; 
var errorDiv = document.querySelectorAll("div.componentsErrorMessage"); 
var cpu = document.getElementsByName("CPU");
try {
// reset styles to valid state
for (i = 0; i < cpu.length; i++) { cpu[i].style.outline = ""; }
errorDiv[0].style.display = "none";	
if (!cpu[0].checked && !cpu[1].checked) {  
// verify that a cpu is selected 
	for ( var i = 0; i < cpu.length; i++) {
	cpu[i].style.outline = "1px solid red";}
	throw "Please Select A CPU";
	} 	
} 
catch(msg) { 
errorDiv[0].style.display = "block"; 
errorDiv[0].innerHTML = msg; 
formValidity = false; }
}

function validateGPU() {
var fieldsetValidity = true; 
var errorDiv = document.querySelectorAll("div.componentsErrorMessage"); 
var gpu = document.getElementsByName("GPU");	
try { 
// reset styles to valid state
for (i = 0; i < gpu.length; i++) { gpu[i].style.outline = ""; }
errorDiv[1].style.display = "none"; 
if (!gpu[0].checked && !gpu[1].checked) {  
// verify that a grapics card is selected 
	for ( var i = 0; i < gpu.length; i++) {
	gpu[i].style.outline = "1px solid red";}
	throw "Please Select A Graphics Card";
	} 	
} 
catch(msg) { 
errorDiv[1].style.display = "block"; 
errorDiv[1].innerHTML = msg; 
formValidity = false; }
}

function validateBrand() {
var fieldsetValidity = true; 
var errorDiv = document.querySelectorAll("div.componentsErrorMessage"); 
var brandOfChoice = document.getElementById("field7")	
try {
// reset styles to valid state
brandOfChoice.style.border = "";
errorDiv[2].style.display = "none"; 
errorDiv[2].innerHTML = "";
	if (brandOfChoice.selectedIndex === -1) {
	throw "Please Specify Your Brand Of Choice";
	}  
}
catch(msg) {
	errorDiv[2].style.display = "block";
	errorDiv[2].innerHTML = msg;  
	formValidity = false;}	
}

function validateStorage() {
var fieldsetValidity = true; 
var errorDiv = document.querySelectorAll("div.errorMessage"); 
var storage = document.getElementsByName("Preferred-Storage");
try {
// reset styles to valid state
for (i = 0; i < storage.length; i++) { storage[i].style.outline = ""; } 
errorDiv[1].style.display = "none"; 
errorDiv[1].innerHTML = "";
if (!storage[0].checked && !storage[1].checked && !storage[2].checked && !storage[3].checked)  {
	for ( var i = 0; i < storage.length; i++) {
	storage[i].style.outline = "1px solid red";} 
throw "Please Specify One or More Storage Devices";	
	}
  }
catch(msg) {
	errorDiv[1].style.display = "block";
	errorDiv[1].innerHTML = msg;  
	formValidity = false;}  
}	

function validateContact() { 
var errorDiv = document.querySelectorAll("div.errorMessage"); 
var phone = document.getElementById("telephone")
var date = document.getElementById("tripDate")
var phonePattern = /^(\([0-9]{3}\))([0-9]{3})(\-[0-9]{4})$/; 
try {
// reset styles to valid state 
phone.style.background = "";
date.style.background = "";
errorDiv[2].style.display = "none";
if ((phone.value !== "" && date.value !== "")) {
// all fields are filled 
	if (phonePattern.test(phone.value) === false) {
		phone.style.background = "rgb(255,233,233)";
		throw "Please use the exact format for phone field: (###)###-####";}	
	} 
	else if (!(phone.value === "" && date.value === "")) {
	// not all fields are blank
	throw "For Phone Appointment please fill both fields or leave both fields blank";}
	}
catch(msg) {
	if (phone.value === "") {phone.style.background = "rgb(255,233,233)";}	
	else if (date.value === "") {date.style.background = "rgb(255,233,233)";}
	errorDiv[2].style.display = "block";
	errorDiv[2].innerHTML = msg;  
	formValidity = false;
	}  
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
	validateCPU();
	validateGPU();
	validateBrand();
	validateStorage();
	validateContact();
	if (formValidity === true) { 
	document.getElementById("errorText").innerHTML = ""; 
	document.getElementById("errorText").style.display = "none"; 
	document.getElementsByTagName("form")[0].submit(); 
	} 
	else {
	document.getElementById("errorText").innerHTML = "Please fix the indicated problems and then resubmit your form.";
    document.getElementById("errorText").style.display = "block"; 
	document.getElementById("formTop").scrollIntoView({behavior: "smooth"});
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
removeSelectDefaults();
}

/* run setup function when page finishes loading */ 
if (window.addEventListener) { 
window.addEventListener("load", setUpPage, false); 
} else if (window.attachEvent) { 
window.attachEvent("onload", setUpPage); 
}