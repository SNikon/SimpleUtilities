/**
 * @name scroll.js
 * @desc Smooth scrolling wrapper
 * @author Jorge Martins
 * @version 0.1.0
 * @license
 * Copyright (c) 2015 Jorge Martins
 */
define(['dom'], function (dom) {
    "use strict";

    var mdl = {};

    mdl.handleScroll = function(el) {
        el.style.overflow = 'hidden';
        // TODO create extra divs to handle circular scrolling
    };
    mdl.scrollDown = function(el, step) {
        if(typeof step == 'string') {
            if (!isNaN(step)) {
                step = parseInt(step, 10);
            }
            // TODO: Handle percentages
            else return; // Not available yet
        }

        el.scrollTop += step;
    };
    mdl.scrollUp = function(el, step) {
        return this.scrollDown(el, '-' + step);
    };
    mdl.scrollToTarget = function(el, target, align) {
        // TODO: Add support for already existing functions, some browsers implement scroll functions to help.
        if(align == null)
            align = 'top';

        var top = dom.getStyle(target, 'top');

        // TODO: Be careful about CSS positions (static, absolute, relative, fixed!)

        switch(align) {
            case 'top': {
                el.scrollTop = top;
            } break;
            case 'middle': {
                var targetHeight = parseInt(dom.getStyle(target, 'height'));
                var elHeight = parseInt(dom.getStyle(el, 'height'));

                var halfElHeight =  elHeight / 2;
                var halfTargetHeight = targetHeight / 2;

                el.scrollTop = top - halfElHeight + halfTargetHeight;
            } break;
            case 'bottom': {
                var targetHeight = parseInt(dom.getStyle(target, 'height'));
                var elHeight = parseInt(dom.getStyle(el, 'height'));

                el.scrollTop = top - elHeight + targetHeight;
            } break;
        }
    };

    return mdl;
});