/**
 * @name debug.js
 * @desc Logging helper
 * @author Jorge Martins
 * @version 0.1.0
 * @license
 * Copyright (c) 2015 Jorge Martins
 */
define(['./string'], function (stringUtils) {
    "use strict";


    var _console = false;
    var _screen = false;
    var _target = null;

    var module = {};
    module.log = function(any) {
        if(this.isLogging()) {
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
    return module;
});