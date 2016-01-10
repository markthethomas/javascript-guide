'use strict';
const test = require('tape');

function fib(nthFibonacci, returnAll) {
  let base = [0, 1, 1, 2];
  for (let i = base.length - 1; base.length < nthFibonacci + 1; i++) {
    base.push(base[i] + base[i - 1]);
  }
  return returnAll ? base.slice(0, nthFibonacci) : base[nthFibonacci];
}

test('Generating the nth fibonacci number in sequence', t => {
  t.equals(fib(4), 3);
  t.equals(fib(5), 5);
  t.equals(fib(6), 8);
  t.equals(fib(7), 13);
  t.equals(fib(8), 21);
  t.end();
});


test('The returnAll fibonacci toggle', t => {
  const returnedFib = fib(5, true);
  t.equals(returnedFib[4], 3, 'The fifth fib number should be 3');
  t.equals(returnedFib.length, 5, 'The returned array should have 5 items in it');
  t.end();
});
