"use strict";

/**
 * 
 * Requirements:
 * 
 * - If `arguments.length > 1`, it should create new library property on `librarySystem`.
 * - If `arguments.length === 1`, it should return library referenced by `library` parameter.
 * - If `arguments.length > 2`, `deps` items should be accessible to `libraryCallback`.
 * 
 * - It should be have a mechanism to define required libraries.
 * - If dependency(s) missing, throw ReferenceError and the name of missing library.
 * - It should support any number of dependencies.
 * 
 * - If `library`, should be a string.
 * - If `deps`, should be an Array.
 * 
 */

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
 * @return {object} Returns library object.
 */


(function() {
  var libraryStorage = {};
  //maybe the easiest thing here is going to be to just change the format of the storage.
  // New potential structure:
  //
  // libraryStorage = {
  //   name: {
  //     libraryDeps: libraryDeps,
  //     libraryCallback: libraryCallback
  //   }
  // }

  function librarySystem(libraryName, libraryDeps, libraryCallback) {
    if (typeof libraryName !== 'string') {
      throw new TypeError;
    }

    if (arguments.length > 1) {
      if (!Array.isArray(libraryDeps)) {
        throw new TypeError('libraryDeps must be an Array.');
      } else {
        if (libraryDeps.length > 0) {
          var libArray = libraryDeps.map(function(value, index) {
            if (!librarySystem(value)) {
              throw new ReferenceError('Missing Dependency: ' + value);
            } else {
              return librarySystem(value);
            }
          });
          
          // Add another thing here to store the deps, and then bind the stored deps to it.
          libraryCallback = libraryCallback.apply.bind(libraryCallback, null, libArray);
        } 
      }

      // libraryStorage[libraryName][libraryDeps] = libraryDeps; // This should be string containing library names
      // libraryStorage[libraryName][libraryCallback] = libraryCallback(); // This should contain the callback function. 
      libraryStorage[libraryName] = libraryCallback();       
    } else {
      return libraryStorage[libraryName];
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
  'It should reference libraries in array `libraryDeps`.': function() {
    librarySystem('nameLib', [], nameLib);
    librarySystem('companyLib', [], companyLib);
    librarySystem('workBlurb', ['nameLib', 'companyLib'], workBlurbLib);
    eq(librarySystem('workBlurb'), "Gordon works at Watch and Code");
  },
  'It should be have a mechanism to define required libraries.': function() {
    librarySystem('workBlurb', ['nameLib', 'companyLib'], workBlurbLib);
    eq(librarySystem('workBlurb'), "Gordon works at Watch and Code");
  },
  'If dependency(s) missing, throw ReferenceError and the name of missing library.': function() {
    try {
      librarySystem('workBlurb', ['nameLib1'], workBlurbLib);
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
      librarySystem('workBlurb', 42, workBlurbLib);
    } catch(e) {
      eq(e.name, 'TypeError');
    }
  },
  'The order of dependencies should not matter': function() {
    // Verbatim, this is the case that Gordon requested.

    librarySystem('workBlurb', ['name', 'company'], function(name, company) {
      return name + ' works at ' + company;
    });

    librarySystem('name', [], function() {
      return 'Gordon';
    });

    librarySystem('company', [], function() {
      return 'Watch and Code';
    });

    librarySystem('workBlurb'); // 'Gordon works at Watch and Code'
  },
  'It should only run each callback function one time': function() {
    fail();
  },

});

