'use strict';

const test = require('tape');

test('this in the global context', t => {
  function GlobalThis() {
    return this;
  }
  t.equals(GlobalThis(), undefined, '`this` should be undefined in strict mode');
  t.end();
});

test('this within an IIFE function call', t => {
  let IIFEthis = (function() {
    return this;
  })();
  t.equals(IIFEthis, undefined, 'Should be undefined in an IIFE, too')
  t.end();
});

test('this within a regular function call', t => {
  function regularFn() {
    return this;
  }
  t.equals(regularFn(), undefined), 'Should be undefined in strict mode';
  t.end();
});


test('this within an arrow function', t => {
  // this gets set as undefined in strict mode bc the enclosing execution context is global/window
  const arrow = (() => this);
  t.equals(arrow(), this, 'Should be undefined when an arrow function returns');
  t.end();
});

test('this when called from arrow function as property of an object', t => {
  // this Gets set to the enclosing this, which would be undefined in strict mode
  const arrowWithinObject = {
    func: () => this
  }
  t.equals(arrowWithinObject.func(), this, 'Should equal an object when called as an object property');
  t.end();
});

test('this when called from arrow function via call/apply/bind', t => {
  const anObject = {};
  const arrow = (() => this);
  t.equals(arrow.call(anObject), this, 'The lexical this cannot be overriden with call');
  t.equals(arrow.apply(anObject), this, 'The lexical this cannot be overriden with apply');
  t.equals(arrow.bind(anObject)(), this, 'The lexical this cannot be overriden with bind');
  t.end();
});

test('this inside of an object', t => {
  const anotherObject = {
    returnInnerThis: function() {
      return this;
    },
    returnFromArrow: () => this
  }
  t.equals(anotherObject.returnInnerThis(), anotherObject, 'Non-arrow functions should have a this of the surrounding object');
  t.equals(anotherObject.returnFromArrow(), this, 'Should have the same this as the surrounding context');
  t.end();
});


test('this as an object method', t => {
  const monkey = {
    tails: 1,
    howManyTails: function() {
      return this.tails
    },
  }
  t.equals(monkey.howManyTails(), 1, 'this is set to the calling object; you can access other props on the object on it')

  const tiger = {
    tails: 1,
  }

  function countTails() {
    return this.tails;
  }

  tiger.count = countTails;

  t.equals(tiger.count(), 1, 'Execution site is what matters, not definition site')
  t.end();
});

test('this should only follow the most immediate reference', t => {
  function getTheTruth() {
    return this.truth;
  }
  const deepObject = {
    a: {
      b: {
        truth: false,
        c: {
          truth: true,
          d: {
            truth: null
          }
        }
      }
    }
  }

  // Assign our method to the various levels of the object
  deepObject.a.b.getTheTruth = getTheTruth;
  deepObject.a.b.c.getTheTruth = getTheTruth;
  deepObject.a.b.c.d.getTheTruth = getTheTruth;

  // Only the latest member matters for this
  t.equal(deepObject.a.b.getTheTruth(), false, 'Should be false');
  t.equal(deepObject.a.b.c.getTheTruth(), true, 'Should be true');
  t.equal(deepObject.a.b.c.d.getTheTruth(), null, 'Should be null');
  t.end();
});

test("this on the object's prototype chain", t => {
  const animal = {
    sound: 'mooooooooooooo',
    makeSound: function() {
      return this.sound;
    }
  }

  let Cow = Object.create(animal);
  Cow.spots = 3;
  Cow.hooves = 3; // sorry, Cow
  t.equals(Cow.makeSound(), 'mooooooooooooo');
  t.end();
});

