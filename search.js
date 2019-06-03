function onSearchChange() {
  var searchTerm = document.getElementById('searchInput').value;
  var a = document.getElementById('dropdownList');
  var div = '';
  var sq = "'";
  
  events.filter(isSearched(searchTerm)).map(item => 
    div += '<hr class="list" /><div class="list" onClick="toEvent(' + (new Date(item.date)).getFullYear() +
            ', ' + (new Date(item.date)).getMonth() + ', ' + sq + item.date + sq + ')">' +
            '<p class="event">'+ item.event + '</p>' +
            '<p class="date">' + (new Date(item.date)).getDate() + ' ' +
            months[(new Date(item.date)).getMonth()] + '</p></div>'
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

function toEvent(eventYear, eventMonth, eventISODate) {
  Calendar(eventYear, eventMonth);

  // color mark out the event in the table
  var f = document.getElementById(eventISODate).parentNode;
  f.style.border = '2px solid rgb(135, 194, 241)';
  f.style.backgroundColor = 'rgb(229, 241, 250)';
}
