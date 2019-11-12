"use strict";

// manually-set base variable for use in function
var precisionBase = 0;

// checkPrecision from accounting.js. Helper.
function checkPrecision(val, base) {
  val = Math.round(Math.abs(val));
  return isNaN(val)? base : val;
}

/**
 * Rounds a number to certain `precision` and returns number as a string. It will pad the returned decimal string 
 * to fix it on the exact number of decimal points specified by `precision`.
 * 
 * @param {number} value 
 * @param {number} precision
 * 
 * @return {string}
 */
 
function toFixed(value, precision) {
  precision = checkPrecision(precision, precisionBase);
  
  var strValue = String(value); 
  var decimalIndex = strValue.indexOf('.');
  var afterLength = strValue.substr(decimalIndex+1).length
  
  // Limitation of this method of decimal placement. Cannot calculate places longer than string
  if (precision > afterLength) {
    strValue = strValue + '0'.repeat(precision - afterLength);
  }

  // Move decimal `precision` places
  strValue = strValue.substr(0,decimalIndex) + strValue.substr(decimalIndex + 1);
  strValue = strValue.substr(0, decimalIndex + precision) + '.' + strValue.substr(decimalIndex + precision);
  
  // Round to whole number
  value = Math.round(parseFloat(strValue));
  strValue = String(value);

  // Return decimal to original location
  if (precision > 0) {
    strValue = strValue.substr(0, strValue.length - precision) + '.' + strValue.substr(strValue.length - precision);
  } else {
    strValue = strValue.substr(0, strValue.length - precision);
  }
  return strValue;  
}

tests({

  'It should return `strValue` rounded to `precision` decimal places.': function() {
    var resultNum = toFixed(1.149, 2);
    eq(resultNum, '1.15');
  },
  'If `precision` is NaN, it should reference the default base precision.': function() {
    var resultNum = toFixed(1.5, NaN);
    eq(resultNum, '2');
  },
  'If `precision` is negative, it should convert to a positive precision.': function() {
    var resultNum = toFixed(1.555, -2);
    eq(resultNum, '1.56');
  },
  'It should work with very large decimals': function() {
    var resultNum = toFixed(12345.12345, 2);
    eq(resultNum, '12345.12');
  },
  'It should round `0.615` to `0.62`.': function() {
    var resultNum = toFixed(.615, 2);
    eq(resultNum, '.62');
  },
  'It should round `10.235` to `10.24`.': function() {
    var resultNum = toFixed(10.235, 2);
    eq(resultNum, '10.24');
  },
  'It should round `1.005` to `1.01`.': function() {
    var resultNum = toFixed(1.005, 2);
    eq(resultNum, '1.01');
  },
  'If `precision > afterStr.length`, pad result decimal places to match precision required.': function() {
    debugger;
    var resultNum = toFixed(1.125, 6);
    eq(resultNum, '1.125000');
  }, 
  'If run on a 10,000,000 random floats, it should work. (thanks @jxofficial for this idea!)': function() {
    function randomFloatBetween(minValue, maxValue) {
        return parseFloat(Math.min(minValue + (Math.random() * (maxValue - minValue)), maxValue));
      }
    var arr = [];
    var mappedArr = [];
    for (var i = 0; i < 10000000; i++) {
        arr.push(randomFloatBetween(1, 9999));
    }
    
    var expected = arr.map(num => toFixed(num, 4));
    mappedArr.forEach((num, i) => eq(num, expected[i]));
  }

});

