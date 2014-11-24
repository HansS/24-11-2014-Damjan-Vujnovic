/*global describe, expect, it*/
//refactor this so that object with mapping is not created every time (i.e. it is created at most once)
//however, make sure nothing else goes into global namespace (except colourLookup function)
var colourLookup = function (colourString) {
  return {
    'red': 0xFF0000,
    'green': 0x00FF00,
    'blue': 0x0000FF
  }[colourString];
};
//test should remain the same
describe('Module pattern', function () {
  it('1 - should understand revealing module pattern', function () {
    expect(colourLookup('red')).toBe(0xFF0000);
    expect(colourLookup('unknown color')).toBeUndefined();
  });
});
