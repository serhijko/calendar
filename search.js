function onSearchChange() {
  var searchTerm = document.getElementById('searchInput').value;
  var a = document.getElementById('dropdownList');
  var div = '';
  
  events.filter(isSearched(searchTerm)).map(item =>
    div += '<div id="' + item.date + '">' +
            '<p class="event">'+ item.event + '</p>' +
            '<p>' + (new Date(item.date)).getDate() + ' ' +
            months[(new Date(item.date)).getMonth()] + '</p></div>'
  );

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
