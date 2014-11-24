A few quick JS ideas
===
shamelessly stolen from Angular source code
---


Who am I?
===

Damjan Vujnovic
---

damjan@samuraiprinciple.com

@returnthis



IIFE
---
angular.prefix:
````javascript
/**
 * @license AngularJS v"NG_VERSION_FULL"
 * (c) 2010-2014 Google, Inc. http://angularjs.org
 * License: MIT
 */
(function(window, document, undefined) {
````
angular.suffix:
````javascript
  if (window.angular.bootstrap) {
    //AngularJS is already loaded, so we can return here...
    console.log('WARNING: Tried to load angular more than once.');
    return;
  }
  //try to bind to jquery now so that one can write jqLite(document).ready()
  //but we will rebind on bootstrap again.
  bindJQuery();
  publishExternalAPI(angular);
  jqLite(document).ready(function() {
    angularInit(document, bootstrap);
  });
})(window, document);
````



Revealing module pattern
---

````javascript
//refactor this so that object with mapping is not created every time (i.e. it is created at most once)
//however, make sure nothing else goes into global namespace (except colorLookup function)
var colorLookup = function (colorString) {
  return {
    'red': 0xFF0000,
    'green': 0x00FF00,
    'blue': 0x0000FF
  }[colorString];
};
//test should remain the same
describe('Module pattern', function () {
  it('1 - should understand revealing module pattern', function () {
    expect(colorLookup('red')).toBe(0xFF0000);
    expect(colorLookup('unknown color')).toBeUndefined();
  });
});
````



(One) Solution
---

````javascript
var colorLookup;
(function () {
  var colorMap = {
    'red': 0xFF0000,
    'green': 0x00FF00,
    'blue': 0x0000FF
  };
  colorLookup = function (colorString) {
    return colorMap[colorString];
  };
}());
````




Scope.prototype.$new
---

````javascript
Scope.prototype.$new: function(isolate) {
  var ChildScope,
      child;

  if (isolate) {
    child = new Scope();
    child.$root = this.$root;
    // ensure that there is just one async queue per $rootScope and its children
    child.$$asyncQueue = this.$$asyncQueue;
    child.$$postDigestQueue = this.$$postDigestQueue;
  } else {
    // Only create a child scope class if somebody asks for one,
    // but cache it to allow the VM to optimize lookups.
    if (!this.$$childScopeClass) {
      this.$$childScopeClass = function() {
        this.$$watchers = this.$$nextSibling =
            this.$$childHead = this.$$childTail = null;
        this.$$listeners = {};
        this.$$listenerCount = {};
        this.$id = nextUid();
        this.$$childScopeClass = null;
      };
      this.$$childScopeClass.prototype = this;
    }
    child = new this.$$childScopeClass();
  }
  child['this'] = child;
  child.$parent = this;
  child.$$prevSibling = this.$$childTail;
  if (this.$$childHead) {
    this.$$childTail.$$nextSibling = child;
    this.$$childTail = child;
  } else {
    this.$$childHead = this.$$childTail = child;
  }
  return child;
};
````


fn.toString()
---

````javascript
var FN_ARGS = /^function\s*[^\(]*\(\s*([^\)]*)\)/m;
var FN_ARG_SPLIT = /,/;
var FN_ARG = /^\s*(_?)(\S+?)\1\s*$/;
var STRIP_COMMENTS = /((\/\/.*$)|(\/\*[\s\S]*?\*\/))/mg;
var $injectorMinErr = minErr('$injector');
function annotate(fn) {
  var $inject,
      fnText,
      argDecl,
      last;

  if (typeof fn === 'function') {
    if (!($inject = fn.$inject)) {
      $inject = [];
      if (fn.length) {
        fnText = fn.toString().replace(STRIP_COMMENTS, '');
        argDecl = fnText.match(FN_ARGS);
        forEach(argDecl[1].split(FN_ARG_SPLIT), function(arg){
          arg.replace(FN_ARG, function(all, underscore, name){
            $inject.push(name);
          });
        });
      }
      fn.$inject = $inject;
    }
  } else if (isArray(fn)) {
    last = fn.length - 1;
    assertArgFn(fn[last], 'fn');
    $inject = fn.slice(0, last);
  } else {
    assertArgFn(fn, 'fn', true);
  }
  return $inject;
}
````



Function as a result
---

````javascript
function $ExceptionHandlerProvider() {
  this.$get = ['$log', function($log) {
    return function(exception, cause) {
      $log.error.apply($log, arguments);
    };
  }];
}
````



JavaScript HashMap
---

````javascript
function HashMap(array, isolatedUid) {
  if (isolatedUid) {
    var uid = 0;
    this.nextUid = function() {
      return ++uid;
    };
  }
  forEach(array, this.put, this);
}
HashMap.prototype = {
  put: function(key, value) {
    this[hashKey(key, this.nextUid)] = value;
  },
  get: function(key) {
    return this[hashKey(key, this.nextUid)];
  },
  remove: function(key) {
    var value = this[key = hashKey(key, this.nextUid)];
    delete this[key];
    return value;
  }
};
````



Hash function
---

````javascript
var uid = 0;
function nextUid() {
  return ++uid;
}
function hashKey(obj, nextUidFn) {
  var objType = typeof obj, key;
  if (objType == 'function' || (objType == 'object' && obj !== null)) {
    if (typeof (key = obj.$$hashKey) == 'function') {
      // must invoke on object to keep the right this
      key = obj.$$hashKey();
    } else if (key === undefined) {
      key = obj.$$hashKey = (nextUidFn || nextUid)();
    }
  } else {
    key = obj;
  }
  return objType + ':' + key;
}
````
