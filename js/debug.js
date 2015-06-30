/**
 * @name debug.js
 * @desc Logging helper
 * @author Jorge Martins
 * @namespace window.debug
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
    if (!window.debug)
        window.debug = {};

    var _console = false;
    var _screen = false;

    var dbg = window.debug;
    dbg.log = function(any) {
        var type = typeof any;
        if(type == 'string' || type == 'number')
            window.console.log(any + "\n");
        if(type == 'function' || type == 'object')
            window.console.log( window.utils.string.stringifyAsJSON(any) + "\n");

        // Visual helper
    };
    dbg.isLogging = function() { return _console || _screen; };
    dbg.setLoggingToConsole = function(val) { _console = val; return this; };
    dbg.isLoggingToConsole = function () { return _console; };
    dbg.setLoggingToScreen = function(val) { _screen = val; return this; };
    dbg.isLoggingToScreen = function () { return _screen; };
})();