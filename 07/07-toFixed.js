"use strict";

// manually-set base variable for use in function
var precisionBase = 0;

// checkPrecision from accounting.js. Helper.
function checkPrecision(val, base) {
  val = Math.round(Math.abs(val));
  return isNaN(val)? base : val;
}

/**
 * Rounding a decimal to certain precision. This implementation is limited by 
 * available digits, and will not compute additional decimal places if required. 
 * 
 * @param {number} value 
 * @param {number} precision
 * 
 * @return {number}
 */
 
function toFixed(value, precision) {
  precision = checkPrecision(precision, precisionBase);
  
  var strValue = String(value); 
  var decimalIndex;

  decimalIndex = strValue.indexOf('.');
  
  // Limitation of this method of decimal placement. Cannot calculate places longer than string
  if (precision > strValue.substr(decimalIndex+1).length) {
    return value;
  }

  // Move decimal `precision` places
  strValue = strValue.substr(0,decimalIndex) + strValue.substr(decimalIndex + 1);
  strValue = strValue.substr(0, decimalIndex + precision) + '.' + strValue.substr(decimalIndex + precision);
  
  // Round to whole number
  value = Math.round(parseFloat(strValue));
  strValue = String(value);

  // Return decimal to original location
  strValue = strValue.substr(0, strValue.length - precision) + '.' + strValue.substr(strValue.length - precision);

  return parseFloat(strValue);  
}

tests({

  'It should return `value` rounded to `precision` decimal places.': function() {
    var resultNum = toFixed(1.149, 2);
    eq(resultNum, 1.15);
  },
  'If `precision` is NaN, it should reference the default base precision.': function() {
    var resultNum = toFixed(1.5, (0/1));
    eq(resultNum, 2);
  },
  'If `precision` is negative, it should convert to a positive precision.': function() {
    var resultNum = toFixed(1.555, -2);
    eq(resultNum, 1.56);
  },
  'It should work with very large decimals': function() {
    var resultNum = toFixed(12345.12345, 2);
    eq(resultNum, 12345.12);
  },
  'It should round `0.615` to `0.62`.': function() {
    var resultNum = toFixed(.615, 2);
    eq(resultNum, .62);
  },
  'It should round `10.235` to `10.24`.': function() {
    var resultNum = toFixed(10.235, 2);
    eq(resultNum, 10.24);
  },
  'It should round `1.005` to `1.01`.': function() {
    var resultNum = toFixed(1.005, 2);
    eq(resultNum, 1.01);
  },
  'If `precision > afterStr.length`, return value': function() {
    debugger;
    var resultNum = toFixed(1.125, 6);
    eq(resultNum, 1.125);
  }

});
