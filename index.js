"use strict"

let getCookie = (name) => {
    let value = '; ' + document.cookie;
    let parts = value.split('; ' + name + '=');
    if (parts.length == 2) return parts.pop().split(';').shift();
}

let fetchCV = (config) => {
    return new Promise((resolve, reject) => {            
        // Start the AF login procedure if the cookie is not set
        let cookie = getCookie(config.cookie);
        if (cookie === undefined) {
            if (config.onAuth) {
                window[config.onAuth].call(undefined);
            }
        
            // Open AF login page if AMV_SSO_COOKIE is not set
            window.open(config.authUrl, '_blank').focus();
            
            // Repeatedly try to read the cookie until found
            let timerId = setInterval(() => {
                cookie = getCookie(config.cookie);
                if (cookie !== undefined) {
                    clearInterval(timerId);
                    resolve(cookie);
                }
            }, config.pollRate);
        } else {
            // Cookie already exists, so just pass it along.
            resolve(cookie);
        }
    })
    .then((cookie) => {
        if (config.onFetch) {
            window[config.onFetch].call(undefined);
        }
        return new Promise(resolve => setTimeout(resolve(cookie), 1000))
    })
    .then((cookie) => {
        // Call backend cv endpoint to retrieve CV from AF
        return fetch(config.cvUrl);
    })
    .then(response => {
            if (response.status !== 200) {
                console.log('Looks like there was a problem. Status Code: ' +
                response.status);
                return;
            }
    
            return response.json()
            .catch(function(err) {
                console.log('Response parse Error :-S', err);
            });
        }
    )
    .then(cv => {
        if (config.onResponse) {
            window[config.onResponse].call(undefined, cv);
        }
    })
    .catch(err => console.log('Fetch Error :-S', err));
}

$.each($('.gravity-beacon'), (index, element) => {
    let beacon = $(element);
                
    let config = {
        label: beacon.attr('data-label') || 'Gravity CV',
        cookie: beacon.attr('data-cookie') || 'AMV_SSO_COOKIE',
        pollRate: beacon.attr('data-poll_rate') || '1000', // 1 second
        timeout: beacon.attr('data-timeout') || '300000', // 5 minutes
        authUrl: beacon.attr('data-auth_url') || 'https://www.arbetsformedlingen.se/loggain',
        cvUrl: beacon.attr('data-cv_url') || '/cv',
        onAuth: beacon.attr('data-on_auth') || undefined,
        onFetch: beacon.attr('data-on_fetch') || undefined,
        onResponse: beacon.attr('data-on_response') || undefined,
        receiveOnly: beacon.attr('data-receive_only'),
    }
    
    if (config.receiveOnly !== undefined) {
        fetchCV(config);
    } else {
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
    }
});
