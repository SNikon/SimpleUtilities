/**
 * @name google_analytics.js
 * @desc Wrapper for data collection, particularly for web apps
 * @author Jorge Martins
 * @namespace window.debug
 * @version 0.1.0
 */
(function() {
    (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
            (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
        m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
    })(window,document,'script','//www.google-analytics.com/analytics.js','ga');

    if(window.analytics==null)
        window.analytics={};

    var _booted = false;
    window.analytics.start = function(id) {
        ga('create', id, 'auto');
        ga('require', 'displayfeatures');
        ga('send', 'pageview');
    };
})();