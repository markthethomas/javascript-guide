'use strict';
const test = require('tape');

test('Palindrome', t => {
  function isPalindrome(string) {
    // regex matches any whitespace, global match, and joins them together; then lowercase everything
    string = string.replace(/\W/g, '').toLowerCase();
    return (str == str.split('').reverse());
  }
});