/**
 * @name xhr.js
 * @desc Simplification of some xhr calls for low-resource environments
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
(function(){
    "use strict";
    if(window.utils==null)
        /** @global **/
        window.utils={};
    if(window.utils.xhr==null) {
        window.utils.xhr = function ( method, url ) {
            var _xhr = null;
            var _method = null;
            var _url = null;
            var _query = null;
            var _body = null;
            var _headers = {};
            var _onSuccess = [];
            var _onError = [];
            var _onComplete = [];
            var _async = true;
            var _mimeOverride = null;

            function _addFunction(f, dest) {
                if(typeof f == "string")
                    dest.push(function() { window.utils.call(f); });
                else
                    dest.push(f);
            }

            function _collectEvents() {
                if(_xhr) {
                    // Finished
                    if(_xhr.readyState == 4) {

                    }
                }
            }

            return {
                /**
                 * Adds a single custom header
                 * @param {string} h header name
                 * @param {string|number} v header value
                 */
                header: function(h,v) { _headers[h] = v; return this; },
                headers: function(h) { window.utils.iterate(h, this.header.bind(this)); return this; },
                query: function(o) { _query = window.utils.string.stringifyAsQuery(o); return this; },
                form: function(o) { _body = window.utils.string.stringifyAsForm(o); this.header('Content-Type', 'application/x-www-form-urlencoded'); return this; },
                JSON: function(o) { _body = window.utils.string.stringifyAsJSON(o); this.header('Content-Type', 'application/json'); return this; },
                success: function(f) { _addFunction(f, _onSuccess); _collectEvents(); return this; },
                error: function(f) { _addFunction(f, _onError); _collectEvents(); return this; },
                finally: function(f) { _addFunction(f, _onComplete); _collectEvents(); return this; },
                async: function(v) { _async = v; return this; },
                responseAs: function(t) { _mimeOverride = t; return this; },
                send: function () {
                    _xhr = new XMLHttpRequest();
                    _xhr.open(_method, _url + _query, _async);
                    _xhr.onload = _collectEvents;
                    if(_mimeOverride)
                        _xhr.overrideMimeType(_mimeOverride);


                    window.utils.iterate(_headers, function(nm,val) {
                        _xhr.setRequestHeader(nm,val);
                    });

                    _xhr.send(_body);

                    return this;
                },
                abort: function() { if(_xhr) _xhr.abort(); return this;},

                // NON CHAINABLE
                state: function() {
                    if(_xhr)
                        return _xhr.readyState;
                    return 0;
                },
                status: function() {
                    if(this.state() == 4)
                        return _xhr.status;
                    else
                        return -1;
                }
            }
        };
    }
})();
