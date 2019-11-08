/**
 * 2. Improving runWithDebugger
 * 
 * Your task is to rewrite runWithDebugger so it can take an optional array that contains 
 * any arguments you want to pass into the callback function.
 * 
 * More specifically, your new and improved runWithDebugger should be able to do this.
 * ---------------------------------------------------------------------------------------
 * runWithDebugger(sayHiTo, ['gordon']); // 'hi gordon'
 * ---------------------------------------------------------------------------------------
 * 
 * And of course, you should be able to pass multiple arguments into the array. Here's an example.
 * ---------------------------------------------------------------------------------------
 * function sayFullName(first, last) {
 *   console.log(first + ' '  + last);
 * }
 * 
 * runWithDebugger(sayFullName, ['gordon', 'zhu']); // 'gordon zhu'
 * ---------------------------------------------------------------------------------------
 * /

"use strict";

/**
  * Run a provided function through the debugger, allowing for debugged function to 
  * have a callback function.
  * 
  * Requirements: 
  *   - It should run `debugFunction` in the debugger.
  *   - It should work with functions that include a callback.
  *   - It should use optional `callbackArgs` array to provide arguments to function.
  * 
  * @param {function} debugFunction function to be run through debugger.
  * @param {array} callbackArgs Array containing arguments to pass into debugged function
  */

function runWithDebugger() {

}

tests({
  'It should run `debugFunction` in the debugger.': function() {
    fail();
  },
  'It should work with functions that include a callback.': function() {
    fail();
  },
  'It should use optional `callbackArgs` array to provide arguments to function.': function() {
    fail();
  },
});