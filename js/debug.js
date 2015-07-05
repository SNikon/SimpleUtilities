/**
 * @name debug.js
 * @desc Logging helper
 * @author Jorge Martins
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
define(['./string'], function (stringUtils) {
    "use strict";


    var _console = false;
    var _screen = false;
    var _target = null;

    var module = {};
    module.log = function(any) {
        if(dbg.isLogging()) {
            var type = typeof any;
            if (type == 'string' || type == 'number') {
                if (_console)
                    window.console.log(any + "\n");
                if (_screen && _target != null) {
                    var p = document.createElement('p');
                    p.innerText = any;
                    _target.appendChild(p);
                }
            }
            if (type == 'function' || type == 'object') {
                var line = stringUtils.stringifyAsJSON(any);
                if(_console)
                    window.console.log( line + "\n");
                if (_screen && _target != null) {
                    var p = document.createElement('p');
                    p.innerText = line;
                    _target.appendChild(p);
                }
            }
        }
    };
    module.isLogging = function() { return _console || _screen; };
    module.setLoggingToConsole = function(val) { _console = val; return this; };
    module.isLoggingToConsole = function () { return _console; };
    module.setScreenTarget = function(id) { _target = document.getElementById(id); return this; }
    module.setLoggingToScreen = function(val) { _screen = val; return this; };
    module.isLoggingToScreen = function () { return _screen; };
});