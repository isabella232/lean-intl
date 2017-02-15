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

"use strict";var __globalObject = Function("return this;")();function fnGlobalObject() {    return __globalObject;}function Test262Error(message) {  this.message = message || "";}IntlPolyfill.__applyLocaleSensitivePrototypes();function runner() {    var passed = false;    runTheTest();    passed = true;    return passed;}function runTheTest () {// Copyright 2013 Mozilla Corporation. All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/*---
es5id: 11.1.1_32
description: >
    Tests that the options minimumSignificantDigits and
    maximumSignificantDigits are read in the right sequence.
author: Norbert Lindenberg
---*/

var read = 0;

function readMinimumSignificantDigits() {
    ++read;
    if (read === 1) {
        return 0; // invalid value, but on first read that's OK
    } else if (read === 3) {
        return 1; // valid value
    } else {
        throw new Error("minimumSignificantDigits read out of sequence: " + read + ".");
    }
}

function readMaximumSignificantDigits() {
    ++read;
    if (read === 2) {
        return 0; // invalid value, but on first read that's OK
    } else if (read === 4) {
        return 1; // valid value
    } else {
        throw new Error("maximumSignificantDigits read out of sequence: " + read + ".");
    }
}

var options = {};
Object.defineProperty(options, "minimumSignificantDigits",
    { get: readMinimumSignificantDigits });
Object.defineProperty(options, "maximumSignificantDigits",
    { get: readMaximumSignificantDigits });

new IntlPolyfill.NumberFormat("de", options);

if (read !== 4) {
    throw new Error("insuffient number of property reads: " + read + ".");
}
 }