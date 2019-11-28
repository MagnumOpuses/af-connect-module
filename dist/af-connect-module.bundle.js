(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";

let connectModule = require("./lib/connect-module");

$.each($(".af-connect-module"), (index, element) => {
  let afConnectModule = $(element);

  afConnectModule.css("display", "inline");

  let config = {
    label: afConnectModule.attr("data-label") || "AF Connect",
    pollRate: afConnectModule.attr("data-poll_rate") || "1000", // 1 second
    timeout: afConnectModule.attr("data-timeout") || "300000", // 5 minutes
    afConnectUrl:
      afConnectModule.attr("data-af-connect-url") ||
      "https://demotest.arbetsformedlingen.se",
    afPortabilityUrl:
      afConnectModule.attr("data-af-portability-url") ||
      "http://localhost:8080/portability-api",
    onResponse: afConnectModule.attr("data-on-response") || undefined
  };

  let afConnectModuleButton = $('<input type="button"/>')
    .val(config.label)
    .css("background-color", "#3040C4")
    .css("color", "#eee")
    .css("border", "0px")
    .css("border-radius", "3px")
    .css("padding", "6px 20px")
    .css("font-weight", "600")
    .mouseenter(function() {
      $(this).css("background-color", "#7782e2");
    })
    .mouseleave(function() {
      $(this).css("background-color", "#3040C4");
    })
    .one("click", e => {
      connectModule.fetchSequence(config);
    });
  afConnectModule.append(afConnectModuleButton);
});

},{"./lib/connect-module":2}],2:[function(require,module,exports){
"use strict";

let fetchSession = config => {
  console.log("Fetching session");
  return new Promise((resolve, reject) => {
    // Fetch a new session token
    const req = new XMLHttpRequest();
    const url = config.afPortabilityUrl + "/token";

    return new Promise((resolve, reject) => {
      req.open("GET", url, true);
      req.onload = function() {
        var json = JSON.parse(req.responseText);
        resolve(json.token);
      };
      req.send(null);
    }).then(sessionToken => {
      resolve(sessionToken);
    });
  }).catch(err => {
    console.log("Failed to fetch session: ", err);
  });
};

let fetchCV = (config, session) => {
  console.log("Fetching CV, session: ", session);
  return new Promise((resolve, reject) => {
    let req = new XMLHttpRequest();
    let url = config.afPortabilityUrl + "/cv?sessionToken=" + session;
    req.open("GET", url, true);
    req.onload = () => {
      switch (req.status) {
        case 200:
          var json = JSON.parse(req.responseText);
          if (json.status && json.status === 204) {
            reject("No content... Code: ", req.status);
          }
          console.log("Successful response... Code: ", req.status);
          resolve(json);
          break;
        case 204:
          reject("No content... Code: ", req.status);
          break;
        case 500:
          reject("Something went wrong... Code: ", req.status);
          break;
        default:
          reject("Unknown response code: ", req.status);
      }
    };
    req.send(null);
  });
};

let fetchSequence = config => {
  console.log("AF Connect clicked");
  return fetchSession(config)
    .then(sessionToken => {
      console.log("Received session");
      return new Promise((resolve, reject) => {
        let url = config.afConnectUrl + "?sessionToken=" + sessionToken;
        window.open(url, "_blank").focus();

        // Repeatedly try to read the cv from AF Portability
        let timeoutId;
        let timerId = setInterval(() => {
          fetchCV(config, sessionToken)
            .then(cv => {
              if (cv !== undefined) {
                clearInterval(timerId);
                clearTimeout(timeoutId);
                if (config.onResponse) {
                  window[config.onResponse].call(undefined, cv);
                }
                resolve(cv);
              }
            })
            .catch(() => {});
        }, config.pollRate);
        // Polling timeout timer
        timeoutId = setTimeout(() => {
          clearInterval(timerId);
          reject("Timeout");
        }, config.timeout);
      });
    })
    .catch(err => console.log("Failed to fetch CV, error:", err));
};

module.exports = {
  fetchSession: fetchSession,
  fetchCV: fetchCV,
  fetchSequence: fetchSequence
};

},{}]},{},[1]);
