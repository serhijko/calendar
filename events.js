Storage.prototype.setObj = function(key, obj) {
  return this.setItem(key, JSON.stringify(obj))
}

Storage.prototype.getObj = function(key) {
  return JSON.parse(this.getItem(key))
}

var events = (localStorage.getObj('events')) ? localStorage.getObj('events') : [];

function localStorageClear() {
  if (localStorage.getObj('events') === undefined) {
    var div = document.getElementById('quickAddRenew');
    var p = document.createElement('p');
    p.innerHTML = "Ваш браузер не поддерживает localStorage";
    div.appendChild(p);
  }
  else localStorage.clear();
}
