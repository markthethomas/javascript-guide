'use strict';
const test = require('tape');

// Normally, you don't want to manually implement a builtin, but this is here just
// for fun and learning purposes

// basically just JSON.stringify()
function toJson() {
  let stringifiedObject = '{';
  const keysLength = Object.keys(this).length;
  const conditionalComma = keysLength > 1 ? ',' : '';
  for (const prop in this) {
    if (this.hasOwnProperty(prop)) {
      const formattedProp = (typeof this[prop] === 'string') ? `"${this[prop]}"` : this[prop];
      stringifiedObject += `"${prop}":${formattedProp}${conditionalComma}`;
    }
  }
  if (conditionalComma) {
    stringifiedObject = stringifiedObject.slice(0, -1);
  }
  stringifiedObject += '}';
  return stringifiedObject;
}

test('Should properly stringify objects', t => {
  const a = {
    a: 1
  };
  t.equals(toJson.call(a), JSON.stringify(a));
  t.end();
});

test('Should be properly objects with more than one property', t => {
  const a = {
    a: 1,
    v: 6
  };
  t.equals(toJson.call(a), JSON.stringify(a));
  t.end();
});

test('Should properly handle string properties', t => {
  const a = {
    a: 1,
    b: 3,
    c: 'a',
  };
  t.equals(toJson.call(a), JSON.stringify(a));
  t.end();
});