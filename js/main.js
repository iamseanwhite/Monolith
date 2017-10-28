// http://tagliala.github.io/vectoriconsroundup/

// http://fontawesome.io/3.2.1/icon/time/

// https://designshack.net/articles/css/12-fun-css-text-shadows-you-can-copy-and-paste/


var Monolith = {};		// Namespace

Monolith.Player = {};

String.prototype.replaceAll = function(search, replacement) {
    var target = this;
    return target.replace(new RegExp(search, 'g'), replacement);
};

function randomBetween(first, second) {

    return Math.floor(Math.random() * second) + first;
}

window.queryParams = {};
var qps = window.location.href.split("?")[1];
if(qps.length > 0) {
    qps = qps.split("&");
    for(var index in qps) {
        var keyVal = qps[index].split("=");
        window.queryParams[keyVal[0]] = keyVal[1];
    }
}

window.getQueryParam = function(key) {
    return window.queryParams[key];
}

// TODO: We may not have to do this if we're properly capturing mouse move where we expect to ...

jQuery( window ).resize(function() {
	
	Monolith.UI.CloseMenus();
	
	jQuery("body").css("max-width", jQuery(window).width());
});