/**
 * @name template.js
 * @desc Template loader and manager
 * @author Jorge Martins
 * @version 0.1.0
 * @license
 * Copyright (c) 2015 Jorge Martins
 */
define(['./debug','./xhr'], function(debug, xhrUtils){
    "use strict";

    var _index = {};
    // this == xhr
    function _onSuccess(url, result) {
        _index[url] = result;
    }

    // this == xhr;
    function _onError(url) {
        debug.log('failed to get url: '+url);
    }

    function _load(url, async, succ, err) {
        var xhr = xhrUtils('GET', url);
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

    var module = {};
    module.getAsync = function(url, succ, err) {
        if (_index[url] == null)
            _load(url, true, succ, err);
        else if (typeof succ == 'function')
            succ(_get(url));
        else
            debug.log('Unable to return template data to requester');
    };
    module.get = function(url, err) {
        var ret = _get(url);
        if(ret == null) {
            _load(url, false, function(dt) {
                ret = dt;
            }, err);
        }
        return ret;
    };

    return module;
});
