'use strict';

const test = require('tape');

test('Check if something is a plain-old object', t => {
  function isObject(obj, strict) {
    if (strict) {
      return (typeof obj === 'object') && (obj !== null) && (toString.call(obj) !== '[object Array]') && (toString.call(obj) !== '[object Function]');
    }
    return (typeof obj === 'object') && (obj !== null) || (toString.call(obj) === '[object Function]');
  }
  console.log(isObject(function(){}));

  t.ok(isObject({}), 'Should work on pojos');
  t.ok(isObject([]), 'Should also work with arrays');
  t.ok(isObject(function(){}), 'Should work on functions');
  t.notOk(isObject([], true), 'Should not work on arrays with strict toggled on');
  t.notOk(isObject(function(){}, true), 'Should not work on functions with strict toggled on');
  t.notOk(isObject('A String'), 'Should not work with strings');
  t.end();
});