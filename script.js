var hourHand = document.getElementById('hourHand');
var minuteHand = document.getElementById('minuteHand');
var secondHand = document.getElementById('secondHand');

function updateDate() {
	var d = new Date();
	var weekday = new Array(7);
	weekday[0] = "Domenica";
	weekday[1] = "Luned&igrave;";
	weekday[2] = "Marted&igrave;";
	weekday[3] = "Mercoled&igrave;";
	weekday[4] = "Gioved&igrave;";
	weekday[5] = "Venerd&igrave;";
	weekday[6] = "Sabato";

	var month = new Array(12);
	month[0] = "Gennaio";
	month[1] = "Febbraio";
	month[2] = "Marzo";
	month[3] = "Aprile";
	month[4] = "Maggio";
	month[5] = "Giugno";
	month[6] = "Luglio";
	month[7] = "Agosto";
	month[8] = "Settembre";
	month[9] = "Ottobre";
	month[10] = "Novembre";
	month[11] = "Dicembre";
  
	var minutes = d.getMinutes();
	if(minutes<10)
		minutes="0"+minutes;
	var n = weekday[d.getDay()]+" "+d.getDate()+" "+month[d.getMonth()]+" "+d.getFullYear()+"<br/>"+"Ore "+d.getHours()+":"+minutes;
	document.getElementById("currentDate").innerHTML = n;
  }

function initClock()
{
	var date = new Date();
	var hour = date.getHours() % 12; // 0 - 23
	var minute = date.getMinutes();
	var second = date.getSeconds();

	var hourDeg = (hour * 30) + (0.5 * minute); // every hour, 30 deg. 30 / 60
	var minuteDeg = (minute * 6) + (0.1 * second); // every minute, 6 deg. 6 / 60
	var secondDeg = second * 6; // 360 / 60

	hourHand.style.transform = 'rotate(' + hourDeg + 'deg)';
	minuteHand.style.transform = 'rotate(' + minuteDeg + 'deg)';
	secondHand.style.transform = 'rotate(' + secondDeg + 'deg)';
	updateDate();
}

function updateClock() {
	var date = new Date();
	var second = date.getSeconds();
	
	if(second == 0 || second == 30)
	{
		var hour = date.getHours() % 12; // 0 - 23
		var minute = date.getMinutes();
		var hourDeg = (hour * 30) + (0.5 * minute); // every hour, 30 deg. 30 / 60
		var minuteDeg = (minute * 6) + (0.1 * second); // every minute, 6 deg. 6 / 60
		hourHand.style.transform = 'rotate(' + hourDeg + 'deg)';
		minuteHand.style.transform = 'rotate(' + minuteDeg + 'deg)';
		updateDate();
	}
	var secondDeg = second * 6; // 360 / 60
	secondHand.style.transform = 'rotate(' + secondDeg + 'deg)';

	setTimeout(updateClock, 1000);
};

initClock();
updateClock();