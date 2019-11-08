"use strict";

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
 */

function sayFullName(first, last) {
  if (arguments.length === 0) {
    console.log('No name!');
  } else {
    console.log(first + ' ' + last);
  }
}

/**
  * Run a provided function through the debugger and provide optional arguments for debugged
  * function.
  * 
  * Requirements: 
  *   - It should run `debugCallback` through the debugger.
  *   - It should use optional `callbackArgs` array to provide arguments to `debugCallback`.
  * 
  * @param {function} debugCallback function to be run through debugger.
  * @param {array} callbackArgs Array containing arguments to pass into debugged function
  */

function runWithDebugger(debugCallback, callbackArgs) {
  if (arguments.length > 1) {
    debugger;
    debugCallback.apply(this, callbackArgs);
  } else {
    debugger;
    debugCallback();
  }
}

// Test run
runWithDebugger(sayFullName, ['Richard', 'Sherman']);
runWithDebugger(sayFullName, ['gordon', 'zhu']);
runWithDebugger(sayFullName);