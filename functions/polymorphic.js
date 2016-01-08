'use strict';

const test = require('tape');

// We can implement an aspect of polymorphism by having
// our functions behave differently based different
// aspects of the arguments supplied — how many, which type, &c.

test('Polymorphic branching', t => {
  // fly(opts, mph) -> String
  function fly(direction) {
    // Turn the arguments into an array
    let args = [].slice.call(arguments, 0);
    // We specify a default direction to be used in case of non-string 1st param
    let defaultDirection = 'up';

    // If the options is just one string
    if (typeof direction === 'string') {
      // We assume that we're using just the string argument
      defaultDirection = direction;
      // shift out the first argument so we can use the rest
      args.shift();
    }

    return `We are flying ${defaultDirection} at ${args}mph!`;
  }
  t.equals(fly('down', 20), 'We are flying down at 20mph!', 'Can handle extra params');
  t.equals(fly(20), 'We are flying up at 20mph!', 'Should use the default direction');
  t.end();
});

test('Dynamic Dispatch', t => {
  const moves = {
    init: () => {
      return 'getting things ready...';
    },
    left: (speed) => {
      return `Moving left at ${speed}mph`;
    },
    right: (speed) => {
      return `Moving right at ${speed}mph`;
    },
  }
  function move(options) {
    // Convert arguments to array like before
    let args = [].slice.call(arguments, 0);
    let action = 'init' // <- the default action

    // check to see if the passed arg is a string and it corresponds to a prop on methods
    if (typeof options === 'string' && typeof moves[options] === 'function') {
        // Set the action to be the passed option
        action = options;
        // We're done with it, so remove from the front of array
        args.shift();
    }
    return moves[action](args);
  }

  t.equals(move('left', 20), 'Moving left at 20mph');
  t.equals(move('right', 30), 'Moving right at 30mph');
  t.equals(move(), 'getting things ready...', 'Should use the default w/o params');
  t.end()
});