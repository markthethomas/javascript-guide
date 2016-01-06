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
  t.equals(arrow.call(anObject), this);
  t.end();
});