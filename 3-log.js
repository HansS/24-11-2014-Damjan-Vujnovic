window.__ = 'Fill this value in so the test is passing';
Function.prototype.log = function () {
  //TODO
};
Function.prototype.log = function () {
  'use strict';
  var fn = this, args = Array.prototype.slice.apply(arguments);
  return function () {
    console.log.apply(console, Array.prototype.concat.apply(args, arguments));
    return fn.apply(undefined, arguments);
  };
};
describe('Function.prototype.log', function () {
  var myFn, myFnWithLogging;
  beforeEach(function () {
    myFn = jasmine.createSpy().and.returnValue(42);
    spyOn(console, 'log');
  });
  it('should return function as a result', function () {
    myFnWithLogging = myFn.log();

    expect(typeof myFnWithLogging).toBe('function');
  });
  it('should invoke the original function when invoked', function () {
    myFnWithLogging = myFn.log();

    var result = myFnWithLogging('first', 'second', 'third');

    expect(myFn).toHaveBeenCalledWith('first', 'second', 'third');
    expect(result).toBe(42);
  });
  it('should log the specified prefix when invoked', function () {
    myFnWithLogging = myFn.log('myFn');

    myFnWithLogging();

    expect(console.log).toHaveBeenCalledWith('myFn');
  });
  it('should log the specified prefix and all the parameter it was invoked with', function () {
    myFnWithLogging = myFn.log('myFn');

    myFnWithLogging('Hello', 'World');

    expect(console.log).toHaveBeenCalledWith('myFn', 'Hello', 'World');
  });
  it('should understand intercepting methods', function () {
    var person = {};
    person.setName = function (name) {
      this.name = name;
    }.bind(person).log('setName');

    person.setName('Myamoto');

    expect(console.log).toHaveBeenCalledWith(__, __);

    // what would happen here if we remove .bind(person)?
    expect(person.name).toBe(__);
  });
});
