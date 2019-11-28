"use strict";

const axios = require("axios");

let fetchSession = config => {
  console.log("Fetching session");
  return new Promise((resolve, reject) => {
    // Fetch a new session token
    const url = config.afPortabilityUrl + "/token";
    axios.get(url).then(sessionToken => {
      resolve(sessionToken.token);
    });
  }).catch(err => {
    console.log("Failed to fetch session: ", err);
  });
};

let fetchCV = (config, session) => {
  console.log("Fetching CV, session: ", session);
  return new Promise((resolve, reject) => {
    let url = config.afPortabilityUrl + "/cv?sessionToken=" + session;

    axios
      .get(url)
      .then(response => {
        if (response.status && response.status === 204) {
          reject("No content... Code: ", response.status);
        }
        console.log("Successful response... Code: ", response.status);
        resolve(response.value);
      })
      .catch(error => {
        if (error.response) {
          // The request was made and the server responded with a status code
          // that falls out of the range of 2xx
          switch (error.response.status) {
            case 204:
              reject("No content... Code: ", error.response.status);
              break;
            case 500:
              reject("Something went wrong... Code: ", error.response.status);
              break;
            default:
              reject("Unknown response code: ", error.response.status);
          }
        } else if (error.request) {
          // The request was made but no response was received
          // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
          // http.ClientRequest in node.js
          console.log(error.request);
        } else {
          // Something happened in setting up the request that triggered an Error
          console.log("Error", error);
        }
      });
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
