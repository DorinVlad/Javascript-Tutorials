"use strict"; // interpret contents in JavaScript strict mode

// global variables 
var dateObject = new Date();
var countdown;

function displayCalendar(whichMonth) { 
var date; 
var dateToday = new Date(); 
var dayOfWeek; 
var daysInMonth; 
var dateCells; 
var captionValue; 
var month; 
var year; 
var monthArray = ["January","February","March","April","May","June","July","August","September","October","November", 				   "December"];
if (whichMonth === -1) {
dateObject.setMonth(dateObject.getMonth() - 1); 
} else if (whichMonth === 1) { 
dateObject.setMonth(dateObject.getMonth() + 1);} 

month = dateObject.getMonth();
year = dateObject.getFullYear(); 
dateObject.setDate(1); 
dayOfWeek = dateObject.getDay(); 
captionValue = monthArray[month] + " " + year; 
document.querySelector("#cal table caption").innerHTML = captionValue;

if (month === 0 || month === 2 || month === 4 || month === 6 || month === 7 || month === 9 || month === 11) { 
// Jan, Mar, May, Jul, Aug, Oct, Dec
daysInMonth = 31;} 
else if (month === 1) { // Feb    
	if (year % 4 === 0) { // leap year test 
	if (year % 100 === 0) { 		
	if (year % 400 === 0) { daysInMonth = 29; 
	// year ending in 00 not a leap year unless divisible by 400 
	} 
	else { daysInMonth = 28;} 
	} 
	else { daysInMonth = 29; }
	} 
	else { daysInMonth = 28; } 
	} 
	else {daysInMonth = 30;} // Apr, Jun, Sep, Nov
	
dateCells = document.querySelectorAll("#cal td"); 
for (var i = 0; i < dateCells.length; i++) {
// clear existing table dates 
dateCells[i].innerHTML = ""; 
dateCells[i].className = "";}

for (var i = dayOfWeek; i < daysInMonth + dayOfWeek; i++) { 
// add dates to days cells 
dateCells[i].innerHTML = dateObject.getDate();
dateCells[i].className = "date"; 
	if (dateToday < dateObject) { 
	dateCells[i].className = "futuredate";
	} 
	date = dateObject.getDate() + 1; 
	dateObject.setDate(date); 
	}
dateObject.setMonth(dateObject.getMonth() - 1); 
// reset month to month shown 
document.getElementById("cal").style.display = "block"; 
// display calendar if it’s not already visible 
}

function selectDate(event) { 
if (event === undefined) { // get caller element in IE8 
event = window.event;} 
var callerElement = event.target || event.srcElement; 
if (callerElement.innerHTML === "") { 
// cell contains no date, so don’t close the calendar 
document.getElementById("cal").style.display = "block"; 
return false;}
dateObject.setDate(callerElement.innerHTML);
var fullDateToday = new Date(); 
var dateToday = Date.UTC(fullDateToday.getFullYear(), fullDateToday.getMonth(), fullDateToday.getDate()); 
var selectedDate = Date.UTC(dateObject.getFullYear(), dateObject.getMonth(), dateObject.getDate());
if (selectedDate <= dateToday) {
	document.getElementById("cal").style.display = "block"; 
	return false;} 
document.getElementById("tripDate").value = dateObject.toLocaleDateString(); 
hideCalendar(); 
countdown = setInterval(updateCountdown, 1000); 
document.getElementById("countdownSection").style.display = "block"; 
} 

function hideCalendar() {   
document.getElementById("cal").style.display = "none"; 
}

function prevMo() {
displayCalendar(-1); 
} 

function nextMo() { 
displayCalendar(1);
}

function updateCountdown() { 
var dateToday = new Date();
var dateFrom = Date.UTC(dateToday.getFullYear(), dateToday.getMonth(), dateToday.getDate(), dateToday.getHours(), 				dateToday.getMinutes(), dateToday.getSeconds());
// Contact will take place at 8am MST or 2pm UTC
var dateTo = Date.UTC(dateObject.getFullYear(), dateObject.getMonth(), dateObject.getDate(), 14, 0, 0); 
if ((dateTo - dateFrom) < 1000) { 
// time will be less than 0 when setInterval runs next 
clearInterval(countdown); 
document.getElementById("countdownSection").style.display = "none";} 
// days
var daysUntil = Math.floor((dateTo - dateFrom) / 86400000);  
document.getElementById("countdown").innerHTML = " " + daysUntil; 
// hours 
var fractionalDay = (dateTo - dateFrom) % 86400000; 
var hoursUntil = Math.floor(fractionalDay / 3600000); 
if (hoursUntil < 10) { hoursUntil = "0" + hoursUntil;} 
document.getElementById("countdown").innerHTML += ":" + hoursUntil;
// minutes 
var fractionalHour = fractionalDay % 3600000; 
var minutesUntil = Math.floor(fractionalHour / 60000); 
if (minutesUntil < 10) {minutesUntil = "0" + minutesUntil;} 
document.getElementById("countdown").innerHTML += ":" + minutesUntil; 
// seconds 
var fractionalMinute = fractionalHour % 60000; 
var secondsUntil = Math.floor(fractionalMinute / 1000); 
if (secondsUntil < 10) {secondsUntil = "0" + secondsUntil;} 
document.getElementById("countdown").innerHTML += ":" + secondsUntil; 
}

function createEventListeners() {
var dateField = document.getElementById("tripDate"); 
if (dateField.addEventListener) { dateField.addEventListener("click", displayCalendar, false); 
} else if (dateField.attachEvent) { 
dateField.attachEvent("onclick", displayCalendar);}

var dateCells = document.getElementsByTagName("td"); 
	if (dateCells[0].addEventListener) { 
	for (var i = 0; i < dateCells.length; i++) {
		dateCells[i].addEventListener("click", selectDate, false); }
	} else if (dateCells[0].attachEvent) { 
	for (var i = 0; i < dateCells.length; i++) {
	dateCells[i].attachEvent("onclick", selectDate);} 
	} 
	
var closeButton = document.getElementById("close");
if (closeButton.addEventListener) { 
closeButton.addEventListener("click", hideCalendar, false); 
} else if (closeButton.attachEvent) {
closeButton.attachEvent("onclick", hideCalendar);} 	

var prevLink = document.getElementById("prev"); 
var nextLink = document.getElementById("next"); 
if (prevLink.addEventListener) { 
prevLink.addEventListener("click", prevMo, false); 
nextLink.addEventListener("click", nextMo, false); 
} else if (prevLink.attachEvent) {
prevLink.attachEvent("onclick", prevMo);
nextLink.attachEvent("onclick", nextMo);}

$('#tripDate').keypress(function(e) {
    e.preventDefault();
});
}

if (window.addEventListener) { window.addEventListener("load", createEventListeners, false); 
} else if (window.attachEvent) { 
window.attachEvent("onload", createEventListeners); }