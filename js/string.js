/**
 * @name string.js
 * @desc String utilities
 * @author Jorge Martins
 * @version 0.1.0
 * @license
 * Copyright (c) 2015 Jorge Martins
 */
define(function(){
    "use strict";

    function _stringifyObjectRecursive(path, q) {
        var res = '';
        if(typeof q == "object") {
            for(var p in q) {
                if(q.hasOwnProperty((p)))
                    res += _stringifyObjectRecursive( path + '["'+p+'"]', q[p] );
            }
        } else {
            res += path+'='+encodeURIComponent(q);
        }
        return res;
    }

    var module = {};
    /**
     * Parses a variable into a valid string to use as body data.
     * @param {object} q Object to be parsed
     * @returns {string} Valid URL encoded string
     * @private
     */
    module.stringifyAsForm = function(q){
        var res = '';
        if (q != null) {
            if (typeof q == "string")
                res += encodeURIComponent(q);
            else if (typeof q == "object") {
                res +=  _stringifyObjectRecursive( p, q[p] );
            }
        }
        return res;
    };
    module.stringifyAsQuery = function(q) {
        return "?" + _stringifyForm(q);
    };
    module.stringifyAsJSON = function(q) {
        if(window.JSON) {
            return JSON.stringify(q);
        } else {
            throw "JSON not present. Not implemented exception";
        }
    };
    module.format = function() {
        var str = arguments[0];
        var len = arguments.length;
        for(var i = 1; i < len; i++) {
            var regex = new RegExp('\\{'+ (i-1) + '\\}', 'g')
            str = str.replace(regex, arguments[i]);
        }
        return str;
    };
    module.asFunction = function(str) {
        return eval(str);
    };

    return module;
});