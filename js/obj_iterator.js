/**
 * @name obj_iterator.js
 * @desc Iterates through an object's properties using a callback provided
 * @author Jorge Martins
 * @namespace window.utils
 * @version 0.1.0
 * @license
 * Copyright (c) 2015 Jorge Martins
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.

 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */
(function () {
    "use strict";
    if (!window.utils)
        window.utils = {};

    /**
     * Iterates through object
     * @param {object} object Object to iterate on
     * @param {function=} f Function to run for every key-value tuple
     * @param {function=} cond - Condition under which the function will run
     */
    window.utils.iterate = function (object, f, cond) {
        for (var key in object) {
            if (object.hasOwnProperty(key) && (cond && cond(key, object[key]))) {
                f(key, object[key]);
            }
        }
    }
})();