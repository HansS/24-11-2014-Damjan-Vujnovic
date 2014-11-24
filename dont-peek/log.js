Function.prototype.log = function () {
  'use strict';
  var fn = this, args = Array.prototype.slice.apply(arguments);
  return function () {
    console.log.apply(console, Array.prototype.concat.apply(args, arguments));
    return fn.apply(undefined, arguments);
  };
};
