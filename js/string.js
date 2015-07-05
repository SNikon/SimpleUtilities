/**
 * @name string.js
 * @desc String utilities
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