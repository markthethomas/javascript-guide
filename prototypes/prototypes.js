'use strict';

const test = require('tape');

test('You should be able to inherit methods from prototypes', t => {
  const foo = {
    bar: 1,
  };
  const baz = Object.create(foo);
  t.assert(foo.bar, 'Should have a defined bar property that it has on the lookup');
  t.false(baz.hasOwnProperty('bar'), 'Should not have an own property');
  t.equals(Object.getPrototypeOf(baz), foo), 'Should have foo as its prototype';
  t.end();
});

test('`this` should still behave normally even when used w/ prototypal inheritance', t => {
  const foo = {
    a: 1,
    myFunc: function() {
      return this.a += 1;
    }
  }
  let bar = Object.create(foo);
  bar.a = 2;

  t.assert(foo.myFunc(), 2, '`this` should refer to foo');
  t.assert(bar.myFunc(), 3, '`this` should refer to bar since it is called on bar');
  t.end();
});

test('Creating prototypes with syntax consctucts', t => {
  const foo = {
    a: true
  };
  const myArray = [];

  function fx() {
    return true;
  }

  t.assert(Object.getPrototypeOf(myArray), Array, 'Arrays should inherit from Array');
  t.assert(Object.getPrototypeOf(Array), Object, 'Array should inherit from Object');
  t.assert(Object.getPrototypeOf(foo), Object, 'Objects created with the object literal syntax should inherit from Object');
  t.assert(Object.getPrototypeOf(fx), Function, 'Functions should inherit from Function')
  t.end();
});

test('Prototypes with contructors', t => {
  function Store(options) {
    this.name = options.name
  }
  const Walmart = new Store({
    name: 'Apple'
  });
  t.assert(Object.getPrototypeOf(Walmart), Store, 'Walmart should have Store as its prototype');
  t.end();
});

test('Prototypes with the class keyword', t => {
  class Store {
    constructor(name) {
      this.open = false;
      this.name = name;
    }
    unlock(){
      this.open = !this.open;
    }
  }
  class WholeFoods extends Store {
    constructor(name){
      super(name);
    }
    unlock(){
      super.unlock();
    }
  }

  class FailedWholeFoods extends Store {
  }

  let Store12 = new WholeFoods('Whole Foods');
  let Store13 = new FailedWholeFoods();

  t.assert(Object.getPrototypeOf(Store12), Store, 'WholeFoods should have Store as its prototype');
  t.equals(Store12.name, 'Whole Foods');
  t.throws(FailedWholeFoods, 'ReferenceError');

  Store12.unlock();
  t.assert(Store12.open, true, 'Acessing parent methods via a super call');

  
  t.end();
});