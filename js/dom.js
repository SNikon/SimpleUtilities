/**
 * @name dom.js
 * @desc Dom manipulation wrapper
 * @author Jorge Martins
 * @version 0.1.0
 * @license
 * Copyright (c) 2015 Jorge Martins
 */
define(function () {
    "use strict";

    var mdl = {};

    mdl.getStyle = function( target, attr, pseudo ) {
        if(attr == 'top')
            return this.getTop(target);
        if(attr == 'left')
            return this.getLeft(target);

        // Pseudo fix over undefined for getComputedStyle
        if(pseudo == null)
            pseudo = null;

        if(typeof target == 'string')
            target = document.getElementById(target);

        if(window.getComputedStyle) {
            // Also getPropertyCSSValue; TODO: look it up and learn how to use it
            return window.getComputedStyle(target, pseudo).getPropertyValue(attr);
        } else if(target.currentStyle) {
            return target.currentStyle[attr];
        } else {
            return target.display[attr];
        }
    };

    mdl.getTop = function(target) {
        if(typeof target == 'string')
            target = document.getElementById(target);

        return target.offsetTop;
    };
    mdl.getLeft = function(target) {
        if(typeof target == 'string')
            target = document.getElementById(target);

        return target.offsetLeft;
    };

    return mdl;
    // TODO: https://developer.mozilla.org/en-US/docs/Web/API/CSS_Object_Model/Determining_the_dimensions_of_elements
});