"use strict";

/**
 * isPrototypeOf():
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
 * - If `object.__proto__ === prototypeObject`, it should return true. 
 * - If `object.__proto__ !== prototypeObject`, it should recurse until it returns true.
 * - If `object.__proto__` never matches `prototypeObject`, it should return false.
 *
 * - If `prototypeObject` is undefined or null, a `TypeError` should be thrown.
 * - If `object` is undefined or null, a `TypeError` should be thrown.
 * 
 * - It should return true for `isPrototypeOf(Object.prototype, object)`.
 * 
 */

tests({
  
  'If `object.__proto__ === prototypeObject`, it should return true.': function() {
    fail();
  },
  'If `object.__proto__ !== prototypeObject`, it should recurse until it returns true.': function() {
    fail();
  },
  'If `object.__proto__` never matches `prototypeObject`, it should return false.': function() {
    fail();
  },
  'If `prototypeObject` is undefined or null, a `TypeError` should be thrown.': function() {
    fail();
  },
  'If `object` is undefined or null, a `TypeError` should be thrown.': function() {
    fail();
  },
  'It should return true for `isPrototypeOf(Object.prototype, object)`.': function() {
    fail();
  },

});

