/**
 * @name template.js
 * @desc Template loader and manager
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

    if(window.utils.template==null)
        window.utils.template={};

    var _index = {};
    // this == xhr
    function _onSuccess(url, result) {
        _index[url] = result;
    }

    // this == xhr;
    function _onError(url) {
        window.console.log('failed to get url: '+url);
    }

    function _load(url, async, succ, err) {
        var xhr = window.utils.xhr('GET', url);
        xhr.responseAs('text/plain').async(async).send();

        xhr.success(_onSuccess.bind(xhr, url)).error(_onError.bind(xhr, url));

        if(typeof succ == 'function')
            xhr.success(succ);

        if(typeof err == 'function')
            xhr.error(err);
    }

    function _get(url) {
        return _index[url];
    }

    var tp = window.utils.template;
    tp.getAsync = function(url, succ, err) {
        if (_index[url] == null)
            _load(url, true, succ, err);
        else if (typeof succ == 'function')
            succ(_get(url));
        else
            window.debug.log('Unable to return template data to requester');
    };
    tp.get = function(url, err) {
        var ret = _get(url);
        if(ret == null) {
            _load(url, function(dt) {
                ret = dt;
            }, err);
        }
        return ret;
    };
})();
