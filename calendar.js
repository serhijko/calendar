function Calendar(year, month) {
  var d = new Date(year, month, 1), // set variable d to the first day of the month
  today = new Date(),
  lastDay = new Date(year, month + 1, 0), // the last day of the month
  calendarHead = '<tr>',
  calendarBody = '',
  months = ["Январь", "Февраль", "Март", "Апрель", "Май", "Июнь",
  "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"], // month names instead of numbers 0-11
  days = ["Воскресенье", "Понедельник", "Вторник", "Среда", "Четверг", "Пятница", "Суббота"]; // the weekday names

  if (d.getDay()) {  // reset d to monday preceding the first day of the month
    d.setDate(d.getDate() - d.getDay() + 1);
  } else {
    d.setDate(d.getDate() - 6);
  }

  // the first week of the current month (with the days of this week of the previous month)
  for(var i = 1; i <= 7; i++, d.setDate(d.getDate() + 1)) {
    if (d.getFullYear() == today.getFullYear() && d.getMonth() == today.getMonth() && d.getDate() == today.getDate()) {
      calendarHead += '<th class="today">' + days[d.getDay()] + ', ' + d.getDate() + '</th>'; // to set CSS style for today's date
    } else {
      calendarHead += '<th>' + days[d.getDay()] + ', ' + d.getDate() + '</th>';
    }
  }

  calendarHead += '</tr>';

  // the remaining days of the month (with the days of the next month belonging to the last week of this month)
  for(; d <= lastDay || d.getDay() != 1; d.setDate(d.getDate() + 1)) {
    if (d.getDay() == 1) {
      calendarBody += '<tr>';
    }

    if (d.getFullYear() == today.getFullYear() && d.getMonth() == today.getMonth() && d.getDate() == today.getDate()) {
      calendarBody += '<td class="today">' + d.getDate() + '</td>'; // to set CSS style for today's date
    } else {
      calendarBody += '<td>' + d.getDate() + '</td>';
    }

    if (d.getDay() == 0) {
      calendarBody += '</tr>'
    }
  }

  document.querySelector('#calendar thead').innerHTML = calendarHead;
  document.querySelector('#calendar tbody').innerHTML = calendarBody;
  document.querySelector('#monthYear').innerHTML = months[lastDay.getMonth()] + ' ' + lastDay.getFullYear();
  document.querySelector('#monthYear').dataset.month = lastDay.getMonth();
  document.querySelector('#monthYear').dataset.year = lastDay.getFullYear();
}

Calendar(new Date().getFullYear(), new Date().getMonth());

// minus month button
document.querySelector('#minusMonth').onclick = function() {
  Calendar(document.querySelector('#monthYear').dataset.year,
  parseFloat(document.querySelector('#monthYear').dataset.month)-1);
}

// plus month button
document.querySelector('#plusMonth').onclick = function() {
  Calendar(document.querySelector('#monthYear').dataset.year,
  parseFloat(document.querySelector('#monthYear').dataset.month)+1);
}

// today button hover
document.querySelector('#today').mouseover = function() {
  var days = ["Воскресенье", "Понедельник", "Вторник", "Среда", "Четверг", "Пятница", "Суббота"], // the weekday names
  months = ["января", "февраля", "марта", "апреля", "мая", "июня",
  "июля", "августа", "сентября", "октября", "ноября", "декабря"], // month names instead of numbers 0-11
  today = new Date();
  var fadeSpeed = 25;
  var tip = document.createElement("span");
  tip.id = "tip";
  tip.innerHTML = "" + days[today.getDay()] + ", " + today.getDate() + " " + months[today.getMonth()] + " " + today.getFullYear() + " г.";
  div.appendChild(tip);
  tip.style.opacity="0";
  var intId = setInterval(function() {
    newOpacity = parseFloat(tip.style.opacity) + 0.1;
    tip.style.opacity = newOpacity.toString();
    if (tip.style.opacity == "1") {
      clearInterval(intId);
    }
  }, fadeSpeed);
}

// today button click
document.querySelector('#today').onclick = function() {
  var today = new Date();
  Calendar(today.getFullYear(), today.getMonth());
}
