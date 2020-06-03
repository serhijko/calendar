function onSearchChange() {
  const searchTerm = document.getElementById('searchInput').value;
  const a = document.getElementById('dropdownList');
  let div = '';
  
  events.filter(isSearched(searchTerm)).map(item => {
    const { date, event } = item;
    const dateObj = new Date(date);
    const fullYear = dateObj.getFullYear();
    const currentMonth = dateObj.getMonth();
    const dateInNumber = dateObj.getDate();
    div += `
      <hr class="list" />
      <div class="list" onClick="toEvent(${fullYear}, ${currentMonth}, '${date}')">
        <p class="event">${event}</p>
        <p class="date">${dateInNumber} ${months[currentMonth]}</p>
      </div>
    `;
  });

  if (div == '') div += '<p>Нет соответствий</p>';

  document.querySelector('#dropdownList').innerHTML = div;

  if ( searchTerm )
    a.style.display = 'block';
  else
    a.style.display = 'none';
}

function isSearched(searchTerm) {
  const searchterm = searchTerm.toLowerCase();
  return function({ date, event, participants }) {
    const dateObj = new Date(date);
    const dateStr = dateObj.getDate() + ' ' + months[dateObj.getMonth()];
    return event.toLowerCase().includes(searchterm) ||
      dateStr.includes(searchterm) ||
      participants.toLowerCase().includes(searchterm);
  }
}

function toEvent(eventYear, eventMonth, eventISODate) {
  Calendar(eventYear, eventMonth);

  // color mark out the event in the table
  const f = document.getElementById(eventISODate).parentNode;
  f.style.border = '2px solid rgb(135, 194, 241)';
  f.style.backgroundColor = 'rgb(229, 241, 250)';
}
