module.exports = function(url, callback) {
  var request = new XMLHttpRequest();
  request.open('GET', url, true);
  request.addEventListener('load', function() {
     callback(request.responseText);
  });
  request.send();
}
