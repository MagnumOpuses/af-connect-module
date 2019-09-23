(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict"

let getCookie = (name) => {
    let value = '; ' + document.cookie;
    let parts = value.split('; ' + name + '=');
    if (parts.length == 2) return parts.pop().split(';').shift();
}

let fetchCV = (config) => {
    return new Promise((resolve, reject) => {            
        window.open(config.afConnectUrl, '_blank').focus();
        
        // Repeatedly try to read the cv from AF Portability
        let timerId = setInterval(() => {
            console.log("Polling for CV from Portability API: ", config.afPortabilityUrl);
        }, config.pollRate);
    })
    .catch(err => console.log('Failed to fetch CV, error:', err));
}

$.each($('.af-connect-module'), (index, element) => {
    let afConnectModule = $(element);

    let config = {
        label: afConnectModule.attr('data-label') || 'AF Connect CV',
        pollRate: afConnectModule.attr('data-poll_rate') || '1000', // 1 second
        timeout: afConnectModule.attr('data-timeout') || '300000', // 5 minutes
        afConnectUrl: afConnectModule.attr('data-af-connect-url') || 'https://demotest.arbetsformedlingen.se',
        afPortabilityUrl: afConnectModule.attr('data-af-portability-url') || 'https://portability.arbetsformedlingen.se',
        onResponse: afConnectModule.attr('data-on-response') || undefined
    }

    let afConnectModuleButton = $('<input type="button"/>')
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
    afConnectModule.append(afConnectModuleButton);
});

},{}]},{},[1]);
