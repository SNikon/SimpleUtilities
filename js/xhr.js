/**
 * @name xhr.js
 * @desc Simplification of some xhr calls for low-resource environments
 * @author Jorge Martins
 * @namespace window.utils
 * @version 0.1.0
 * @license
 * Copyright (c) 2015 Jorge Martins
 */
define(['./string', './obj_iterator'], function(stringUtils, objIterator){
    "use strict";
    return function ( method, url ) {
        var _xhr = null;
        var _method = method;
        var _url = url;
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
                dest.push(function() { stringUtils.asFunction(f); });
            else
                dest.push(f);
        }

        function _collectEvents() {
            if(_xhr) {
                // Finished
                if(_xhr.readyState == 4) {
                    var st = _xhr.status;
                    // OK states
                    if(st >= 200 && st <= 299) {
                        while(_onSuccess.length > 0) {
                            var f = _onSuccess.pop();
                            if(typeof f == 'function')
                                f( _xhr.responseText );
                        }
                    } else {
                        while(_onError.length > 0) {
                            var f = _onError.pop();
                            if(typeof f == 'function')
                                f( _xhr.responseText );
                        }
                    }
                    while(_onComplete.length > 0) {
                        var f = _onComplete.pop();
                        if(typeof f == 'function')
                            f( _xhr.responseText );
                    }
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
            headers: function(h) { objIterator(h, this.header.bind(this)); return this; },
            query: function(o) { _query = stringUtils.stringifyAsQuery(o); return this; },
            form: function(o) { _body = stringUtils.stringifyAsForm(o); this.header('Content-Type', 'application/x-www-form-urlencoded'); return this; },
            JSON: function(o) { _body = stringUtils.stringifyAsJSON(o); this.header('Content-Type', 'application/json'); return this; },
            success: function(f) { _addFunction(f, _onSuccess); _collectEvents(); return this; },
            error: function(f) { _addFunction(f, _onError); _collectEvents(); return this; },
            finally: function(f) { _addFunction(f, _onComplete); _collectEvents(); return this; },
            async: function(v) { _async = v; return this; },
            responseAs: function(t) { _mimeOverride = t; return this; },
            send: function () {
                _xhr = new XMLHttpRequest();
                var target = _url;
                if(_query != null)
                    target += _query;
                _xhr.open(_method, target, _async);
                _xhr.onload = _collectEvents;
                if(_mimeOverride)
                    _xhr.overrideMimeType(_mimeOverride);


                objIterator(_headers, function(nm,val) {
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
});
