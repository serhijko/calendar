function onSearchChange() {
  var searchTerm = document.getElementById('searchInput').value;
  var a = document.getElementById('dropdownList');
  var div = '';
  
  events.filter(isSearched(searchTerm)).map(item => 
    div += '<div class="list" onClick="toEvent(' + (new Date(item.date)).getFullYear() +
            ', ' + (new Date(item.date)).getMonth() + ')">' +
            '<p class="event">'+ item.event + '</p>' +
            '<p class="date">' + (new Date(item.date)).getDate() + ' ' +
            months[(new Date(item.date)).getMonth()] + '</p></div><hr class="list" />'
  );

  if (div == '') div += '<p>Нет соответствий</p>';

  document.querySelector('#dropdownList').innerHTML = div;

  if ( searchTerm )
    a.style.display = 'block';
  else
    a.style.display = 'none';
}

function isSearched(searchTerm) {
  return function(item) {
    return item.event.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1 ||
    ((new Date(item.date)).getDate() + ' ' + 
      months[(new Date(item.date)).getMonth()]).indexOf(searchTerm.toLowerCase()) !== -1 ||
    item.participants.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1;
  }
}

function toEvent(eventYear, eventMonth) {
  Calendar(eventYear, eventMonth);
}
