/*jslint nomen: true*/
/*global describe, expect, it, __*/
describe('prototype', function () {
  it('1 - should understand prototype', function () {
    var Person = function () {
    }, instance;
    Person.prototype.name = 'default name';
    instance = new Person();
    expect(instance.name).toBe(__);
    expect(Person.prototype.isPrototypeOf(instance)).toBe(__);
  });
  it('2 - should understand prototype', function () {
    var Person = function () {
    }, instance;
    instance = new Person();
    Person.prototype.name = 'default name';
    expect(instance.name).toBe(__);
    expect(Person.prototype.isPrototypeOf(instance)).toBe(__);
  });
  it('3 - should understand prototype', function () {
    var Person = function () {
    }, instance;
    Person.prototype = {
      name: 'default name'
    };
    instance = new Person();
    expect(instance.name).toBe(__);
    expect(Person.prototype.isPrototypeOf(instance)).toBe(__);
  });
  it('4 - should understand prototype', function () {
    var Person = function () {
    }, instance;
    instance = new Person();
    Person.prototype = {
      name: 'default name'
    };
    expect(instance.name).toBe(__);
    expect(Person.prototype.isPrototypeOf(instance)).toBe(__);
  });
  it('5 - should understand prototype', function () {
    var Person = function () {
    }, firstInstance = new Person(), secondInstance, thirdInstance;
    expect(firstInstance.name).toBe(__);
    Person.prototype.name = 'before';
    secondInstance = new Person();
    expect(firstInstance.name).toBe(__);
    expect(secondInstance.name).toBe(__);
    Person.prototype = {
      name: 'after'
    };
    thirdInstance = new Person();
    expect(firstInstance.name).toBe(__);
    expect(secondInstance.name).toBe(__);
    expect(thirdInstance.name).toBe(__);
    Person.prototype.name = 'even more after';
    expect(firstInstance.name).toBe(__);
    expect(secondInstance.name).toBe(__);
    expect(thirdInstance.name).toBe(__);

    expect(Person.prototype.isPrototypeOf(firstInstance)).toBe(__);
    expect(Person.prototype.isPrototypeOf(secondInstance)).toBe(__);
    expect(Person.prototype.isPrototypeOf(thirdInstance)).toBe(__);
  });

  it('6 - should understand prototype', function () {
    var Scope = function () {
    }, firstInstance, secondInstance;
    Scope.prototype.depositAmount = 100;
    Scope.prototype.deposit = {
      amount: 100
    };
    firstInstance = new Scope();
    secondInstance = new Scope();
    firstInstance.depositAmount = 200;
    firstInstance.deposit.amount = 200;
    expect(secondInstance.depositAmount).toBe(__);
    expect(secondInstance.deposit.amount).toBe(__);
  });
  it('7 - should understand prototypes - angularjs scopes (Scope.prototype.$new)', function () {
    var parentScope = {
        depositAmount: 100,
        deposit: {
          Amount: 100
        }
      },
      createChildScope = function (parentScope) {
        var ChildScopeConstructor = function () {
        };
        ChildScopeConstructor.prototype = parentScope;
        return new ChildScopeConstructor();
      },
      childScope = createChildScope(parentScope);

    expect(parentScope.depositAmount).toBe(__);
    expect(childScope.depositAmount).toBe(__);
    childScope.depositAmount = 200;
    expect(parentScope.depositAmount).toBe(__);
    expect(childScope.depositAmount).toBe(__);

    expect(parentScope.deposit.Amount).toBe(__);
    expect(childScope.deposit.Amount).toBe(__);
    childScope.deposit.Amount = 200;
    expect(parentScope.deposit.Amount).toBe(__);
    expect(childScope.deposit.Amount).toBe(__);
  });
});
