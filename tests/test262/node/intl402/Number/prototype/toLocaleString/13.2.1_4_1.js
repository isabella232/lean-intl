function assert(mustBeTrue, message) {
  if (mustBeTrue === true) {
    return;
  }

  if (message === undefined) {
    message = 'Expected true but got ' + String(mustBeTrue);
  }
  throw new Error(message);
}

assert._isSameValue = function (a, b) {
  if (a === b) {
    // Handle +/-0 vs. -/+0
    return a !== 0 || 1 / a === 1 / b;
  }

  // Handle NaN vs. NaN
  return a !== a && b !== b;
};

assert.sameValue = function (actual, expected, message) {
  if (assert._isSameValue(actual, expected)) {
    return;
  }

  if (message === undefined) {
    message = '';
  } else {
    message += ' ';
  }

  message += 'Expected SameValue(«' + String(actual) + '», «' + String(expected) + '») to be true';

  throw new Error(message);
};

assert.notSameValue = function (actual, unexpected, message) {
  if (!assert._isSameValue(actual, unexpected)) {
    return;
  }

  if (message === undefined) {
    message = '';
  } else {
    message += ' ';
  }

  message += 'Expected SameValue(«' + String(actual) + '», «' + String(unexpected) + '») to be false';

  throw new Error(message);
};

assert.throws = function (expectedErrorConstructor, func, message) {
  if (typeof func !== "function") {
    throw new Error('assert.throws requires two arguments: the error constructor ' +
      'and a function to run');
    return;
  }
  if (message === undefined) {
    message = '';
  } else {
    message += ' ';
  }

  try {
    func();
  } catch (thrown) {
    if (typeof thrown !== 'object' || thrown === null) {
      message += 'Thrown value was not an object!';
      throw new Error(message);
    } else if (thrown.constructor !== expectedErrorConstructor) {
      message += 'Expected a ' + expectedErrorConstructor.name + ' but got a ' + thrown.constructor.name;
      throw new Error(message);
    }
    return;
  }

  message += 'Expected a ' + expectedErrorConstructor.name + ' to be thrown but no exception was thrown at all';
  throw new Error(message);
};

assert.throws.early = function(err, code) {
  let wrappedCode = `function wrapperFn() { ${code} }`;
  let ieval = eval;

  assert.throws(err, () => { Function(wrappedCode); }, `Function: ${code}`);
};

"use strict";var __globalObject = Function("return this;")();function fnGlobalObject() {    return __globalObject;}function Test262Error(message) {  this.message = message || "";}IntlPolyfill.__applyLocaleSensitivePrototypes();function runner() {    var passed = false;    runTheTest();    passed = true;    return passed;}function runTheTest () {// Copyright 2012 Mozilla Corporation. All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/*---
es5id: 13.2.1_4_1
description: >
    Tests that Number.prototype.toLocaleString throws the same
    exceptions as IntlPolyfill.NumberFormat.
author: Norbert Lindenberg
---*/

var locales = [null, [NaN], ["i"], ["de_DE"]];
var options = [
    {localeMatcher: null},
    {style: "invalid"},
    {style: "currency"},
    {style: "currency", currency: "ßP"},
    {maximumSignificantDigits: -Infinity}
];

locales.forEach(function (locales) {
    var referenceError, error;
    try {
        var format = new IntlPolyfill.NumberFormat(locales);
    } catch (e) {
        referenceError = e;
    }
    assert.notSameValue(referenceError, undefined, "Internal error: Expected exception was not thrown by IntlPolyfill.NumberFormat for locales " + locales + ".");

    assert.throws(referenceError.constructor, function() {
        var result = (0).toLocaleString(locales);
    }, "Number.prototype.toLocaleString didn't throw exception for locales " + locales + ".");
});

options.forEach(function (options) {
    var referenceError, error;
    try {
        var format = new IntlPolyfill.NumberFormat([], options);
    } catch (e) {
        referenceError = e;
    }
    assert.notSameValue(referenceError, undefined, "Internal error: Expected exception was not thrown by IntlPolyfill.NumberFormat for options " + JSON.stringify(options) + ".");

    assert.throws(referenceError.constructor, function() {
        var result = (0).toLocaleString([], options);
    }, "Number.prototype.toLocaleString didn't throw exception for options " + JSON.stringify(options) + ".");
});
 }