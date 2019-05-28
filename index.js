var div = document.getElementById('wrapper');
var btn = document.getElementById("today");
var fadeSpeed = 50; // a value between 1 and 1000 where 1000 will take 10
                    // seconds to fade in and out and 1 will take 0.01 sec.
var days = ["Воскресенье", "Понедельник", "Вторник", "Среда", "Четверг", "Пятница", "Суббота"], // the weekday names
months = ["января", "февраля", "марта", "апреля", "мая", "июня",
  "июля", "августа", "сентября", "октября", "ноября", "декабря"], // month names instead of numbers 0-11
today = new Date();
var tipMessage = days[today.getDay()] + ", " +
  today.getDate() + " " + months[today.getMonth()] + " " + today.getFullYear() + " г.";

var showTip = function(){    
  var tip = document.createElement("span");
  tip.className = "tooltip";
  tip.id = "tip";
  tip.innerHTML = tipMessage;
  div.appendChild(tip);
  tip.style.opacity="0"; // to start with...
  var intId = setInterval(function(){
    newOpacity = parseFloat(tip.style.opacity)+0.1;
    tip.style.opacity = newOpacity.toString();
    if(tip.style.opacity == "1"){
      clearInterval(intId);
    }
  }, fadeSpeed);
};

var hideTip = function(){
  var tip = document.getElementById("tip");
  var intId = setInterval(function(){
    newOpacity = parseFloat(tip.style.opacity)-0.1;
    tip.style.opacity = newOpacity.toString();
    if(tip.style.opacity == "0"){
      clearInterval(intId);
      tip.remove();
    }
  }, fadeSpeed);
  tip.remove();
};

btn.addEventListener("mouseover", showTip, false);
btn.addEventListener("mouseout", hideTip, false);
