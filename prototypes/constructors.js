'use strict';

const test = require('tape');

test('Classes and constructors should yield equivalent prototypes', t => {
  function ForceUser(side) {
    this.side = side;
  }
  let sith = new ForceUser('sith');
  t.equals(sith.side, 'sith');
  t.end();
});

test('Using the prototype property of a constructor', t => {
  function Appliance(name, power) {
    this.name = name || 'something';
    this.power = power || 'a lot';
    this.running = false;
  }

  Appliance.prototype.toggle = function () {
    this.running = !this.running;
  }

  Appliance.prototype.rename = function (name) {
    this.name = name;
  }

  let Blender = new Appliance('blender', );

  t.assert()
  t.end();
});