var colourLookup;
(function () {
  var colourMap = {
    'red': 0xFF0000,
    'green': 0x00FF00,
    'blue': 0x0000FF
  };
  colourLookup = function (colourString) {
    return colourMap[colourString];
  };
}());

// another approach
(function () {
  var colourMap = {
    'red': 0xFF0000,
    'green': 0x00FF00,
    'blue': 0x0000FF
  };
  window.colourLookup = function (colourString) {
    return colourMap[colourString];
  };
}());

// one more idea
var colourLookup = (function () {
  var colourMap = {
    'red': 0xFF0000,
    'green': 0x00FF00,
    'blue': 0x0000FF
  };
  return function (colourString) {
    return colourMap[colourString];
  };
}());

// dirty (but it works)
(function () {
  var colourMap = {
    'red': 0xFF0000,
    'green': 0x00FF00,
    'blue': 0x0000FF
  };
  colourLookup = function (colourString) {
    return colourMap[colourString];
  };
}());
