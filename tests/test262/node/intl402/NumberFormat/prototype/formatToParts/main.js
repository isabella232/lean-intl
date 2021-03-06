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

"use strict";var __globalObject = Function("return this;")();function fnGlobalObject() {    return __globalObject;}function Test262Error(message) {  this.message = message || "";}IntlPolyfill.__applyLocaleSensitivePrototypes();function runner() {    var passed = false;    runTheTest();    passed = true;    return passed;}function runTheTest () {// Copyright 2016 Mozilla Corporation. All rights reserved.
// This code is governed by the license found in the LICENSE file.

/*---
description: Tests for existance and behavior of IntlPolyfill.NumberFormat.prototype.formatToParts
---*/

function reduce(parts) {
  return parts.map(part => part.value).join('');
}

function compareFTPtoFormat(locales, options, value) {
  const nf = new IntlPolyfill.NumberFormat(locales, options);
  assert.sameValue(
    nf.format(value),
    reduce(nf.formatToParts(value)),
    `Expected the same value for value ${value},
     locales: ${locales} and options: ${options}`
  );
}

const num1 = 123456.789;
const num2 = 0.123;

compareFTPtoFormat();
compareFTPtoFormat('pl');
compareFTPtoFormat(['pl']);
compareFTPtoFormat([]);
compareFTPtoFormat(['de'], undefined, 0);
compareFTPtoFormat(['de'], undefined, -10);
compareFTPtoFormat(['de'], undefined, 25324234235);
compareFTPtoFormat(['de'], undefined, num1);
compareFTPtoFormat(['de'], {
  style: 'percent'
}, num2);
compareFTPtoFormat(['de'], {
  style: 'currency',
  currency: 'EUR'
}, num1);
compareFTPtoFormat(['de'], {
  style: 'currency',
  currency: 'EUR',
  currencyDisplay: 'code'
}, num1);
compareFTPtoFormat(['de'], {
  useGrouping: true
}, num1);
compareFTPtoFormat(['de'], {
  useGrouping: false
}, num1);
compareFTPtoFormat(['de'], {
  minimumIntegerDigits: 2
}, num2);
compareFTPtoFormat(['de'], {
  minimumFractionDigits: 6
}, num2);
compareFTPtoFormat(['de'], {
  maximumFractionDigits: 1
}, num2);
compareFTPtoFormat(['de'], {
  maximumSignificantDigits: 3
}, num1);
compareFTPtoFormat(['de'], {
  maximumSignificantDigits: 5
}, num1);
 }