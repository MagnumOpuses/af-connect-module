(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict"

let getCookie = (name) => {
    let value = '; ' + document.cookie;
    let parts = value.split('; ' + name + '=');
    if (parts.length == 2) return parts.pop().split(';').shift();
}

let fetchCV = (config) => {
    return new Promise((resolve, reject) => {            
        // Open AF login page if AMV_SSO_COOKIE is not set
        window.open(config.afConnectUrl, '_blank').focus();
        
        // Repeatedly try to read the cookie until found
        let timerId = setInterval(() => {
            console.log("Polling for CV from Portability API");
        }, config.pollRate);
    })
    .catch(err => console.log('Failed to fetch CV, error:', err));
}

$.each($('.gravity-beacon'), (index, element) => {
    let beacon = $(element);
                
    let config = {
        label: beacon.attr('data-label') || 'Gravity CV',
        pollRate: beacon.attr('data-poll_rate') || '1000', // 1 second
        timeout: beacon.attr('data-timeout') || '300000', // 5 minutes
        afConnectUrl: beacon.attr('data-af-connect-url') || 'https://demotest.arbetsformedlingen.se',
    }

    let gravityButton = $('<input type="button"/>')
    .val(config.label)
    .css('width', '100%')
    .css('background-color', '#733aca')
    .css('color', '#eee')
    .css('border', '1px solid #3e1f6f')
    .css('border-radius', '6px')
    .css('padding', '6px')
    .mouseenter(function() { $(this).css("background-color", "#9c6ce6"); })
    .mouseleave(function() { $(this).css("background-color", "#733aca"); })
    .one('click', (e) => { fetchCV(config); });
    beacon.append(gravityButton);
});

},{}]},{},[1]);
