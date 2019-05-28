function Calendar(year, month) {
  var d = new Date(year, month, 1), // set variable d to the first day of the month
  today = new Date(),
  lastDay = new Date(year, month + 1, 0), // the last day of the month
  calendarHead = '<tr>',
  calendarBody = '',
  months = ["Январь", "Февраль", "Март", "Апрель", "Май", "Июнь",
  "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"], // month names instead of numbers 0-11
  days = ["Воскресенье", "Понедельник", "Вторник", "Среда", "Четверг", "Пятница", "Суббота"]; // the weekday names

  if (d.getDay()) { // reset d to monday preceding the first day of the month
    d.setDate(d.getDate() - d.getDay() + 1);
  } else {
    d.setDate(d.getDate() - 6);
  }

  var todayBool = false;
  var eventBool = false;
  // the first week of the current month (with the days of this week of the previous month)
  for(var i = 1; i <= 7; i++, d.setDate(d.getDate() + 1)) {
    if (d.getFullYear() == today.getFullYear() && d.getMonth() == today.getMonth() && d.getDate() == today.getDate()) {
      todayBool = true;
    }
    for (var j = 0; j < events.length; j++) {
      var date = new Date(events[j].date);
      if (date.getFullYear() == d.getFullYear() && date.getMonth() == d.getMonth() && date.getDate() == d.getDate()) {
        eventBool = true;
        break;
      }
    }
    
    if (todayBool && eventBool) {
      calendarHead += '<th class="event"><p class="today">' + days[d.getDay()] + ', '
        + d.getDate() + '</p>'; // to set CSS style for today's date and date with event
    } else if (todayBool) {
      calendarHead += '<th class="today"><p class="today">' + days[d.getDay()] + ', '
        + d.getDate() + '</p>'; // to set CSS style for today's date
    } else if (eventBool) {
      calendarHead += '<th class="event"><p>' + days[d.getDay()] + ', '
        + d.getDate() + '</p>'; // to set CSS style for date with event
    } else {
      calendarHead += '<th><p>' + days[d.getDay()] + ', ' + d.getDate() + '</p>';
    }
    if (eventBool) {
      calendarHead += '<p class="event">' + events[j].event + '</p><p>' + events[j].participants + '</p>';
    }
    calendarHead += '</th>';
    todayBool = false;
    eventBool = false;
  }

  calendarHead += '</tr>';

  // the remaining days of the month (with the days of the next month belonging to the last week of this month)
  for(; d <= lastDay || d.getDay() != 1; d.setDate(d.getDate() + 1)) {
    if (d.getDay() == 1) {
      calendarBody += '<tr>';
    }

    if (d.getFullYear() == today.getFullYear() && d.getMonth() == today.getMonth() && d.getDate() == today.getDate()) {
      todayBool = true;
    }
    for (var j = 0; j < events.length; j++) {
      date = new Date(events[j].date);
      if (date.getFullYear() == d.getFullYear() && date.getMonth() == d.getMonth() && date.getDate() == d.getDate()) {
        eventBool = true;
        break;
      }
    }

    if (todayBool && eventBool) {
      calendarBody += '<td class="event"><p class="today">' + d.getDate() + '</p>'; // to set CSS style for today's date
      // and date with event
    } else if (todayBool) {
      calendarBody += '<td class="today"><p class="today">' + d.getDate() + '</p>'; // to set CSS style for today's date
    } else if (eventBool) {
      calendarBody += '<td class="event"><p>' + d.getDate() + '</p>'; // to set CSS style for date with event
    } else {
      calendarBody += '<td><p>' + d.getDate() + '</p>';
    }
    if (eventBool) {
      calendarBody += '<p class="event">' + events[j].event + '</p><p>' + events[j].participants + '</p>';
    }
    calendarBody += '</td>';
    todayBool = false;
    eventBool = false;

    if (d.getDay() == 0) {
      calendarBody += '</tr>';
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

// today button
document.querySelector('#today').onclick = function() {
  var today = new Date();
  Calendar(today.getFullYear(), today.getMonth());
}
