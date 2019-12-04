"use strict";

const axios = require("axios");

const getSession = config => {
  return axios
    .get(
      config.afPortabilityUrl + "/token?api-key=" + config.afPortabilityApiKey
    )
    .then(response => {
      return response.data.token;
    })
    .catch(err => {
      console.log("Failed to fetch session: ", err);
    });
};

const getEnvelope = (config, session) => {
  return axios
    .get(config.afPortabilityUrl + "/cv?sessionToken=" + session)
    .then(response => {
      switch (response.data.status) {
        case 204:
          // Received no CV/Envelope ready, empty response
          console.log("CV/Envelope not ready...");
          return;
        default:
          console.log("CV/Envelope received!", response.data);
          return response.data;
      }
    })
    .catch(err => {
      if (err.response) {
        switch (err.response.status) {
          case 500:
            return "Something went wrong... Code: " + err.response.status;
          default:
            return "Unknown response code: " + err.response.status;
        }
      } else {
        console.log("Error", err);
      }
    });
};

const fetchSequence = config => {
  return getSession(config)
    .then(sessionToken => {
      return new Promise((resolve, reject) => {
        window
          .open(config.afConnectUrl + "?sessionToken=" + sessionToken, "_blank")
          .focus();

        let timeoutId;
        const timerId = setInterval(() => {
          getEnvelope(config, sessionToken)
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
            .catch(err => console.log("Error: ", err));
        }, config.pollRate);

        timeoutId = setTimeout(() => {
          clearInterval(timerId);
          reject("Timeout");
        }, config.timeout);
      });
    })
    .catch(err => console.log("Failed to fetch envelope, error:", err));
};

module.exports = {
  getSession,
  getEnvelope,
  fetchSequence
};
