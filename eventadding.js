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
  var isoDate = document.getElementById("dateInput").value;
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

function openQuickAddForm() {
  var quickAddButton = document.getElementById('add');
  var quickAddForm = document.getElementById('quickAddForm');
  /*
  var addButton = document.getElementById('add');
  var form = document.createElement('div');
  form.id = "quickAdd";
  var closeButton = '<div id="closeForm" onClick="closeQuickAdd()">×</div>';
  var input = '<input class="eventForm" id="quickInput" placeholder="5 марта, 14:00, День рождения" />';
  var createButton = '<button type="button" onClick="eventAdd()">Создать</button>';
  form.innerHTML = closeButton + input + createButton;
  addButton.appendChild(form);
  */
  quickAddButton.style.backgroundColor = 'rgb(0, 91, 166)';
  quickAddButton.style.border = '1px solid rgb(0, 69, 125)';
  quickAddButton.style.color = 'rgb(194, 208, 227)';
  quickAddButton.style.textShadow = '0px 2px 2px rgb(0, 80, 146)';
  quickAddButton.style.padding = '4px 9px';

  quickAddForm.style.visibility = 'visible';
  document.getElementById('quickInput').focus();
}

function eventQuickAdd() {
  var eventStr = document.getElementById("quickInput").value;
  var day = eventStr.slice(0, 1) / 1;
  if (day === NaN) {
    alert("Введите число даты события!");
  }
  if (day < 10) {
    var res = eventStr.slice(2);
  } else {
    res = eventStr.slice(3);
  }
  var month = -1, monthCheckString = res.slice(0, 8);
  do {
    month++;
    var pos = monthCheckString.indexOf(months[month]);
  } while (pos === -1 && month < 12)
  if (pos === -1) {
    alert("Введите месяц после числа даты события!");
  }
  if (day !== NaN && pos !== -1) {
    var date = new Date(today.getFullYear(), month, day);
    var isoDate = toISODateFormat(date);

    pos = pos + months[month].length;
    while (res.charAt(pos) === ',' || res.charAt(pos) === ' ') {
      pos++;
    }

    var eventName = res.slice(pos);
    var participants = "";
    var description = "";

    events.push(
      {
        date: isoDate,
        event: eventName,
        participants: participants,
        description: description,
      }
    );
    closeQuickAdd();
    eventDisplay(isoDate);
  }
}

function closeQuickAdd() {
  var quickAddForm = document.getElementById('quickAddForm');
  var quickAddButton = document.getElementById('add');

  document.getElementById('quickInput').value = '';
  quickAddForm.style.visibility = 'hidden';

  quickAddButton.style.backgroundColor = 'rgb(0, 111, 202)';
  quickAddButton.style.border = 'none';
  quickAddButton.style.color = 'white';
  quickAddButton.style.textShadow = '0px 2px 2px rgb(0, 92, 168)';
  quickAddButton.style.padding = '5px 10px';
}