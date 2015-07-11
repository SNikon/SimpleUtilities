/**
 * @name obj_iterator.js
 * @desc Iterates through an object's properties using a callback provided
 * @author Jorge Martins
 * @version 0.1.0
 * @license
 * Copyright (c) 2015 Jorge Martins
 */
define(function () {
    "use strict";
    /**
     * Iterates through object
     * @param {object} object Object to iterate on
     * @param {function=} f Function to run for every key-value tuple
     * @param {function=} cond - Condition under which the function will run
     */
    return function (object, f, cond) {
        for (var key in object) {
            if (object.hasOwnProperty(key) && (cond && cond(key, object[key]))) {
                f(key, object[key]);
            }
        }
    }
});