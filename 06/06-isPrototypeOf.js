"use strict";

/**
 * isPrototypeOf() Docs:
 * The isPrototypeOf() function checks if an object exists in another object's prototype chain.
 * 
 * Syntax:
 * isPrototypeOf(prototypeObj, object)
 * 
 * Parameters:
 * - `prototypeObject`
 * - `object`
 * 
 * Return Value:
 * Returns a Boolean indicating whether or not the calling object lies in the prototype chain 
 * of the specified object. 
 * 
 * Requirements:
 * 
 * - If `Object.getPrototypeOf(object) === prototypeObject`, it should return true. 
 * - If `Object.getPrototypeOf(object) !== prototypeObject`, it should recurse until it returns true.
 * - If `Object.getPrototypeOf(object)` never matches `prototypeObject`, it should return false.
 *
 * - If `prototypeObject` is undefined or null, a `TypeError` should be thrown.
 * - If `object` is undefined or null, a `TypeError` should be thrown.
 * 
 * - It should return true for `isPrototypeOf(Object.prototype, object)`.
 * 
 */
 
var canine = {
  bark: function() {
    console.log('bark');
    return 'bark';
  }
};

var dog = Object.create(canine);

dog.fetch = function() {
  console.log('fetch');
  return 'fetch';
};

var myDog = Object.create(dog);
var empty = Object.create(null);

/**
 * 
 */

function isPrototypeOf(prototypeObject, object) {
  if (prototypeObject === null || prototypeObject === undefined) {
    throw new TypeError('Cannot run function `isPrototypeOf()` on `null` or `undefined` values.');
  }

  if (object === null || object === undefined) {
    return false;
  }
  
  // return true always if object is an object and prototype is Object.prototype
  if (prototypeObject === Object.prototype && typeof object === 'object') {
    return true;
  }
  
  if (Object.getPrototypeOf(object) === prototypeObject) {
    return true;
  } else {
    if (Boolean(Object.getPrototypeOf(object)) === false) {
      return false;
    }

    return isPrototypeOf(Object.getPrototypeOf(prototypeObject), prototypeObject);
  }
}

tests({
  
  'If `Object.getPrototypeOf(object) === prototypeObject`, it should return true.': function() {
    // Native Case
    eq(canine.isPrototypeOf(dog), true);
    eq(dog.isPrototypeOf(myDog), true);
    
    // RS Case
    eq(isPrototypeOf(canine, dog), true);
    eq(isPrototypeOf(dog, myDog), true);
  },
  'If `Object.getPrototypeOf(object) !== prototypeObject`, it should recurse until it returns true.': function() {
    // Native Case
    eq(canine.isPrototypeOf(myDog), true);

    // RS Case
    eq(isPrototypeOf(canine, myDog), true);
  },
  'If `Object.getPrototypeOf(object)` never matches `prototypeObject`, it should return false.': function() {
    // Native Case
    eq(dog.isPrototypeOf(empty), false);

    // RS Case
    eq(isPrototypeOf(dog, empty), false);
  },
  'If `prototypeObject` is undefined or null, a `TypeError` should be thrown.': function() {
    // Native Case
    try {
      null.isPrototypeOf(dog);
    } catch(e) {
      eq(e.name, 'TypeError');
    }
    
    // RS Case
    try {
      isPrototypeOf(null, dog);
    } catch(e) {
      eq(e.name, 'TypeError');
    }
  },
  'If `object` is undefined or null, `false` should be returned': function() {
    // Native Case
    eq(dog.isPrototypeOf(null), false);
    eq(dog.isPrototypeOf(undefined), false);
    
    // RS Case
    eq(isPrototypeOf(dog, null), false);
    eq(isPrototypeOf(dog, undefined), false);
  },
  'It should return true for `isPrototypeOf(Object.prototype, object)`.': function() {
    // Native Case
    eq(Object.prototype.isPrototypeOf(dog), true);
    debugger;
    // RS Case
    eq(isPrototypeOf(Object.prototype, dog), true);
  },

});

