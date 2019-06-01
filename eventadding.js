function onOpenEventAdd(id) {
  var formContainer = document.getElementById(id);

  var sq = "'";
  // creating elements of the form
  var closeButton = '<div id="closeForm" onClick="onCloseEventAdd(' + sq + id + sq + ')">×</div>';
  var form = document.createElement('div');
  form.id = "eventAdd";
  var eventInput = '<input class="eventForm" id="eventInput" type="text" name="event" placeholder="Событие" />';
  var dateInput = '<input class="eventForm" id="dateInput" type="date" name="date" placeholder="День, месяц, год" value="' + id + '" />';
  var participantsInput = '<input class="eventForm" id="participants" type="text" name="participants" placeholder="Имена участников" />';
  var description = '<textarea class="eventForm" id="description" name="description" rows="7" placeholder="Описание"></textarea>';
  var submitButton = '<button type="button" onClick="eventAdd(' + sq + id + sq + ')">Готово</button>';
  var resetButton = '<input type="reset" value="Удалить" />';
  form.innerHTML = eventInput + dateInput + participantsInput + description
    + '<div class="submit">' + submitButton + resetButton + '</div>';
  form.name = "eventAdd";
  // form.onsubmit = "eventAdd()";

  formContainer.innerHTML = closeButton;
  formContainer.appendChild(form);
  // set visibility of the event add form
  formContainer.style.visibility = 'visible';
}

function eventAdd(id) {
  var eventName = document.getElementById("eventInput").value;
  console.log(eventName);
  var isoDate = document.getElementById("dateInput").value;
  console.log(isoDate);
  var participants = document.getElementById("participants").value;
  var description = document.getElementById("description").value;
  events.push(
    {
      date: isoDate,
      event: eventName,
      participants: participants,
      description: description,
    }
  );
  onCloseEventAdd(id);
  eventDisplay(isoDate);
}

function onCloseEventAdd(id) {
  var formContainer = document.getElementById(id);
  var closeButton = document.getElementById("closeForm");
  var form = document.getElementById("eventAdd");
  
  formContainer.style.visibility = 'hidden';
  // removing elements of the form
  formContainer.removeChild(closeButton);
  formContainer.removeChild(form);
}

// display new event in the calendar / jump to the date
function eventDisplay(isoDate) {
  var date = new Date(isoDate);
  Calendar(date.getFullYear(), date.getMonth());
}

function toISODateFormat(date) {
  var year = date.getFullYear();
  var month = date.getMonth() + 1;
  var day = date.getDate();

  var ins1, ins2;
  if (month < 10)
    ins1 = '-0';
  else
    ins1 = '-';
  
  if (day < 10)
    ins2 = '-0';
  else
    ins2 = '-';

  const isoDate = year.toString().concat(
    ins1, month, ins2, day
  )

  return isoDate;
}