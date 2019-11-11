"use strict";

function bikeLib() {
  var models = {
    santaCruz: "Santa Cruz",
    yeti: "Yeti"
  };

  var colors = {
    blue: 'Yeti Blue',
    orange: 'Yeti Orange',
    green: 'Santa Cruz Green'
  };

  var bikeLibrary = {
    models: models,
    colors: colors
  };
  
  return bikeLibrary;
}

function nameLib() {
  return 'Gordon';
}

function companyLib() {
  return 'Watch and Code';
}

function workBlurbLib(name, company) {
  return name + ' works at ' + company;
}

/**
 * Creates new librarySystem for managing multiple libraries and their dependencies
 * stored as a single method on the Window object.
 * 
 * @param {string} libraryName Name of library to process
 * @param {array} libraryDeps Array of dependent library names. 
 * @param {function} libraryCallback Callback containing library to be stored/referenced.
 * 
 * @return {object} Returns library callback.
 */


(function() {

  var libraryStorage = {};

  function librarySystem(libraryName, libraryDeps, libraryCallback) {
    if (typeof libraryName !== 'string') {
      throw new TypeError;
    }

    if (arguments.length >1) {
      // Check if library exists
      if (libraryStorage[libraryName]) {
        throw new ReferenceError('Library ' + libraryName + ' already exists.');
      }

      // Check if it's an array
      // TODO: Allow for single element string to be passed into deps
      if (!Array.isArray(libraryDeps)) {
        throw new TypeError('libraryDeps must be an Array.');
      }

      // Store library on the object
      libraryStorage[libraryName] = {
        libraryDeps: libraryDeps,
        libraryCallback: libraryCallback
      }      
    } else {
      // Check if library exists
      if (!libraryStorage[libraryName]) {
        throw new ReferenceError('Library ' + libraryName + ' not found.');
      }

      var currentLibrary = libraryStorage[libraryName];
      var currentLibraryCallback = currentLibrary.libraryCallback;

      // Check if it has dependents
      if (currentLibrary.libraryDeps.length > 0) {
        var libBindArray = currentLibrary.libraryDeps.map(function(value) {
          if (!libraryStorage[value]) {
            throw new ReferenceError('Missing Dependency: ' + value);
          } else {
            return libraryStorage[value].libraryCallback();
          }
        });
        currentLibraryCallback = currentLibraryCallback.apply.bind(currentLibraryCallback, null, libBindArray);
      }
      // return library function call
      return currentLibraryCallback();
    }
  }

  window.librarySystem = librarySystem;
})();
 

tests({
  'If `arguments.length > 1`, it should create new library property on `librarySystem`.': function() {
    librarySystem('bikeLibrary', [], bikeLib);
    eq(librarySystem('bikeLibrary').models.yeti, "Yeti");
  },
  'If `arguments.length === 1`, it should return library referenced by `libraryName` parameter.': function() {
    var resultLibrary = librarySystem('bikeLibrary');
    eq(resultLibrary.colors.blue, 'Yeti Blue');
  },
  'It should reference dependent library names in array `libraryDeps`.': function() {
    librarySystem('nameLib', [], nameLib);
    librarySystem('companyLib', [], companyLib);
    librarySystem('workBlurb', ['nameLib', 'companyLib'], workBlurbLib);
    eq(librarySystem('workBlurb'), "Gordon works at Watch and Code");
  },
  'If dependency(s) missing, throw ReferenceError and the name of missing library.': function() {
    librarySystem('workBlurb2', ['nameLib1'], workBlurbLib);
    try {
      librarySystem('workBlurb2');
    } catch(e) {
      eq(e.message, 'Missing Dependency: nameLib1');
    }
  },
  'If `library`, should be a string.': function() {
    try {
      librarySystem(42, ['nameLib1'], workBlurbLib);
    } catch(e) {
      eq(e.name, 'TypeError');
    }
  },
  'If `deps`, should be an Array.': function() {
    try {
      librarySystem('workBlurb3', 42, workBlurbLib);
    } catch(e) {
      eq(e.name, 'TypeError');
    }
  },
  'If libraryName exists, throw ReferenceError': function() {
    try {
      librarySystem('workBlurb', [], workBlurbLib);
    } catch(e) {
      eq(e.name, 'ReferenceError');
    }
  },
  'If try to run on nonexistant library, throw ReferenceError': function() {
    // debugger;
    try {
      librarySystem('sprinkles');
    } catch(e) {
      eq(e.name, 'ReferenceError');
    }
  },
  'The order of dependencies should not matter': function() {
    // Verbatim, this is the case that Gordon requested.

    librarySystem('workBlurbTest', ['name', 'company'], function(name, company) {
      return name + ' works at ' + company;
    });

    librarySystem('name', [], function() {
      return 'Gordon';
    });

    librarySystem('company', [], function() {
      return 'Watch and Code';
    });

    librarySystem('workBlurbTest'); // 'Gordon works at Watch and Code'
  },
  'It should only run each callback function one time': function() {
    var callbackCount = 0;
    librarySystem('workBlurbCallbackTest', ['name1', 'company2'], function(name, company) {
      callbackCount++;
      return name + ' works at ' + company;
    });

    librarySystem('name1', [], function() {
      callbackCount++;
      return 'Gordon';
    });

    librarySystem('company2', [], function() {
      callbackCount++;
      return 'Watch and Code';
    });
    eq(callbackCount, 0);
    librarySystem('workBlurbCallbackTest'); // 'Gordon works at Watch and Code'
    eq(callbackCount, 3);
  },
});

