(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict"

let pollCV = (config, session) => {
    // TODO: Call Portability CV endpoint instead of this mocked response.
    let mockCV = {"documentId":{"valueId":"81994764","schemeId":"AF Kundnummer"},"timestamp":0,"person":{"legalId":{"valueId":"1973-09-06-9289","schemeId":"Personnummer","description":"Svenskt personnummer"},"name":{"given":"Nina","family":"Greger","formattedName":"Nina Greger"},"communication":{"address":[{"useCode":"hemadress","line1":"Karlavägen 97","line2":"test","postalCode":"57197","city":"Forserum","countryCode":"SE"}],"phone":[{"useCode":"hem","preference":1,"formattedNumber":"08558945622"},{"useCode":"mobil","preference":2,"formattedNumber":"07055555"},{"useCode":"övrigt","preference":3,"formattedNumber":""}],"email":[{"preference":1,"address":"test@test.se"}],"web":[{}]}},"profiles":[{"languageCode":"sv-SE","profileName":"Ingen erfarenhet-566ttt","description":"rrrr"},{"languageCode":"sv-SE","profileName":"Sparad matchningsprofil 2","employerPreferences":{"industryCodes":[{"valueId":"3422 - Idrottstränare och instruktörer m.fl.","schemeId":"SSYK"}]},"description":"PT","positionPreferences":{"locations":[{"referenceLocation":{"countrySubDivision":{"valueId":"0180","schemeId":"kommun"}}},{"referenceLocation":{"countrySubDivision":{"valueId":"01","schemeId":"kommun"}}}],"jobCategories":[{"name":"15 - Pedagogiskt arbete","code":"AF Taxonomy Field"}],"positionTitles":["Instruktör/Tränare inom specialidrott","Personlig tränare/PT"]},"employment":[{"title":"Arbetsförmedlare","industryCodes":[{"valueId":"6653","schemeId":"AF Taxonomy Occupation"}]}],"qualifications":[{"competencyId":[{"valueId":"161","schemeId":"AF Taxonomy Skill"}],"competencyName":"Analysteknik"},{"competencyId":[{"valueId":"606230","schemeId":"AF Taxonomy Skill"}],"competencyName":"Barn och ungdom"},{"competencyId":[{"valueId":"2800","schemeId":"AF Taxonomy Skill"}],"competencyName":"Jazz"},{"competencyId":[{"valueId":"602039","schemeId":"AF Taxonomy Skill"}],"competencyName":"Kundtjänst"},{"competencyId":[{"valueId":"3252","schemeId":"AF Taxonomy Skill"}],"competencyName":"Kvalitetsansvar"}]},{"languageCode":"sv-SE","profileName":"Dina uppgifter från Skriv in dig 180830","employerPreferences":{"industryCodes":[{"valueId":"1740 - Chefer inom friskvård, sport och fritid","schemeId":"SSYK"}]},"positionPreferences":{"jobCategories":[{"name":"20 - Chefer och verksamhetsledare","code":"AF Taxonomy Field"}],"positionTitles":["Fritidschef"]},"employment":[{"title":"Fritidschef","industryCodes":[{"valueId":"5226","schemeId":"AF Taxonomy Occupation"}]}],"qualifications":[{"competencyId":[{"valueId":"517","schemeId":"AF Taxonomy Skill"}],"competencyName":"Base Maintenance"}]},{"languageCode":"sv-SE","profileName":"Dina uppgifter från Skriv in dig 171218","employerPreferences":{"industryCodes":[{"valueId":"2213 - AT-läkare","schemeId":"SSYK"},{"valueId":"3153 - Piloter m.fl.","schemeId":"SSYK"}]},"positionPreferences":{"locations":[{"referenceLocation":{"countrySubDivision":{"valueId":"DZ","schemeId":"kommun"}}},{"referenceLocation":{"countrySubDivision":{"valueId":"MA","schemeId":"kommun"}}}],"jobCategories":[{"name":"8 - Hälso- och sjukvård","code":"AF Taxonomy Field"},{"name":"19 - Transport","code":"AF Taxonomy Field"}],"positionTitles":["AT-läkare","Flyginstruktör/Flyglärare"]},"employment":[{"title":"Flyginstruktör/Flyglärare","industryCodes":[{"valueId":"4733","schemeId":"AF Taxonomy Occupation"}]},{"description":"personlig tränare","title":"pt","organization":{"name":"sats"},"employmentPeriod":{"currentIndicator":true,"start":"1999-12"}}],"qualifications":[{"competencyId":[{"valueId":"608302","schemeId":"AF Taxonomy Skill"}],"competencyName":"QDP, certifiering för dekorationsmålare"},{"competencyId":[{"valueId":"608174","schemeId":"AF Taxonomy Skill"}],"competencyName":"Dekormålning, TV"},{"competencyId":[{"valueId":"607546","schemeId":"AF Taxonomy Skill"}],"competencyName":"Läkarintyg för sjöfolk"},{"competencyId":[{"valueId":"86","schemeId":"AF Taxonomy Skill"}],"competencyName":"Affischer, design"},{"competencyId":[{"valueId":"607293","schemeId":"AF Taxonomy Skill"}],"competencyName":"Basic safety training"},{"competencyId":[{"valueId":"609204","schemeId":"AF Taxonomy Skill"}],"competencyName":"Glassfish Server, applikationsplattform"},{"competencyId":[{"valueId":"1288","schemeId":"AF Taxonomy Skill"}],"competencyName":"Djurexperimentell metodik"},{"competencyId":[{"valueId":"607330","schemeId":"AF Taxonomy Skill"}],"competencyName":"CPL Commercial Pilot License"},{"competencyId":[{"valueId":"602883","schemeId":"AF Taxonomy Skill"}],"competencyName":"Akvariefiskar"},{"competencyId":[{"valueId":"3589","schemeId":"AF Taxonomy Skill"}],"competencyName":"Läkarexamen"}]},{"languageCode":"sv-SE","executiveSummary":"Hej \nVill jobaa gärnet!","profileName":"Passionerad PT","employerPreferences":{"industryCodes":[{"valueId":"3422 - Idrottstränare och instruktörer m.fl.","schemeId":"SSYK"}]},"description":"PAssionerad PT","positionPreferences":{"locations":[{"referenceLocation":{"countrySubDivision":{"valueId":"01","schemeId":"kommun"}}}],"jobCategories":[{"name":"15 - Pedagogiskt arbete","code":"AF Taxonomy Field"}],"positionTitles":["Personlig tränare/PT","Instruktör/Tränare inom specialidrott"]},"qualifications":[{"competencyId":[{"valueId":"605181","schemeId":"AF Taxonomy Skill"}],"competencyName":"Aerobic, instruktör/tränare"},{"competencyName":"Personlig tränare Sats","description":"Personlig tränare"}]},{"languageCode":"sv-SE","executiveSummary":"Hej Christopher !!!!!","profileName":"STHLM","employerPreferences":{"industryCodes":[{"valueId":"9111 - Städare","schemeId":"SSYK"},{"valueId":"5221 - Säljande butikschefer o avdelningschefer i butik","schemeId":"SSYK"},{"valueId":"5225 - Bensinstationspersonal","schemeId":"SSYK"}]},"description":"Psykopat till Stationschef","positionPreferences":{"locations":[{"referenceLocation":{"countrySubDivision":{"valueId":"03","schemeId":"kommun"}}},{"referenceLocation":{"countrySubDivision":{"valueId":"01","schemeId":"kommun"}}},{"referenceLocation":{"countrySubDivision":{"valueId":"2584","schemeId":"kommun"}}}],"jobCategories":[{"name":"12 - Sanering och renhållning","code":"AF Taxonomy Field"},{"name":"5 - Försäljning, inköp, marknadsföring","code":"AF Taxonomy Field"}],"positionTitles":["Bensinstationsföreståndare/Stationschef","Städare/Lokalvårdare","Bensinstationsbiträde/Servicebiträde"]},"employment":[{"title":"Arbetsledare, anläggning","industryCodes":[{"valueId":"4205","schemeId":"AF Taxonomy Occupation"}]},{"description":"bhghg","title":"gg","organization":{"name":"gg"},"employmentPeriod":{"currentIndicator":true,"start":"1999-12"}}],"qualifications":[{"competencyId":[{"valueId":"603586","schemeId":"AF Taxonomy Skill"}],"competencyName":"Fordonstillbehör"},{"competencyId":[{"valueId":"600871","schemeId":"AF Taxonomy Skill"}],"competencyName":"Hyresavtal"},{"competencyId":[{"valueId":"607654","schemeId":"AF Taxonomy Skill"}],"competencyName":"Hälsokrav vid livsmedelshantering"},{"competencyId":[{"valueId":"2904","schemeId":"AF Taxonomy Skill"}],"competencyName":"Kassavana"},{"competencyName":"dsfsd","description":"fsdfds"},{"competencyName":"dasdas","description":"gfdgfd"}]},{"languageCode":"sv-SE","executiveSummary":"JLFNÄAIRJEFGPEIHRNFGVOLJSM RGOL  EIRFVNOEKLRNO V-KE RMVF","profileName":"test 2","employerPreferences":{"industryCodes":[{"valueId":"4211 - Croupierer och oddssättare m.fl.","schemeId":"SSYK"}]},"description":"to have an education to show","positionPreferences":{"locations":[{"referenceLocation":{"countrySubDivision":{"valueId":"1862","schemeId":"kommun"}}}],"jobCategories":[{"name":"7 - Hotell, restaurang, storhushåll","code":"AF Taxonomy Field"}],"positionTitles":["Dealer"]},"education":[{"institution":{"name":"test school"},"attendancePeriods":[{"currentIndicator":false,"start":"1996-07","end":"1998-12"}],"programs":["010"],"currentlyAttendingIndicator":false,"description":"qwwvadfdfkdfdk"}],"qualifications":[{"competencyId":[{"valueId":"609065","schemeId":"AF Taxonomy Skill"}],"competencyName":"Fast rescue boats"},{"competencyName":"wefwefwrf","description":"WEFAWEF"}]}]};
    mockCV.profile = mockCV['profiles'][5];
    delete mockCV.profiles;
    return mockCV;
}

let getCookie = (name) => {
    let value = '; ' + document.cookie;
    let parts = value.split('; ' + name + '=');
    if (parts.length == 2) return parts.pop().split(';').shift();
}

let fetchCV = (config) => {
    return new Promise((resolve, reject) => {            
        window.open(config.afConnectUrl, '_blank').focus();
        
        // Repeatedly try to read the cv from AF Portability
        let timeoutId;
        let timerId = setInterval(() => {
            let cv = pollCV(config, 'SESSION_ABC');
            if (cv !== undefined) {
                clearInterval(timerId);
                clearTimeout(timeoutId);
                resolve(cv);
                
                if (config.onResponse) {
                    window[config.onResponse].call(undefined, cv);
                }
            }
        }, config.pollRate);

        timeoutId = setTimeout(() => {
            clearInterval(timerId);
            reject('Timeout');
        }, config.timeout);
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
