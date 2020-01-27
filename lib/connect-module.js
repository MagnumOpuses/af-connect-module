"use strict";

const axios = require("axios");

const ERROR_CODES = {
  E001: { code: "E001", message: "Failed to fetch session token" },
  E002: { code: "E002", message: "Failed to fetch envelope" },
  E003: { code: "E003", message: "Polling interval exception" },
  E004: { code: "E004", message: "Polling interval timeout" }
};

const getSession = config => {
  return axios
    .get(
      config.afPortabilityUrl + "/token?api-key=" + config.afPortabilityApiKey
    )
    .then(response => {
      return response.data.token;
    })
    .catch(err => {
      throw ERROR_CODES.E001;
    });
};

const getEnvelope = (config, session) => {
  return axios
    .get(config.afPortabilityUrl + "/cv?sessionToken=" + session)
    .then(response => {
      switch (response.data.status) {
        case 204:
          // Received no CV/Envelope ready, empty response
          return;
        default:
          // Envelope received!
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
      }
      throw ERROR_CODES.E002;
    });
};

const fetchSequence = (config, button) => {
  button.style["background-color"] = "#AAAAAA";
  button.setAttribute("disabled", "");
  return getSession(config)
    .then(sessionToken => {
      return new Promise((resolve, reject) => {
        window
          .open(config.afConnectUrl + "?sessionToken=" + sessionToken, "_blank")
          .focus();

        let timeoutId;
        const timerId = setInterval(() => {
          return getEnvelope(config, sessionToken)
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
            .catch(err => {
              clearInterval(timerId);
              reject(err);
            });
        }, config.pollRate);

        timeoutId = setTimeout(() => {
          clearInterval(timerId);
          reject(ERROR_CODES.E004);
        }, config.timeout);
      });
    })
    .then(() => {
      button.style["background-color"] = "#3040C4";
      button.removeAttribute("disabled");
    })
    .catch(err => {
      window[config.onResponse].call(undefined, undefined, err);
      button.style["background-color"] = "#3040C4";
      button.removeAttribute("disabled");
    });
};

const generateButton = config => {
  const button = document.createElement("button");
  button.appendChild(document.createTextNode(config.label));
  button.style["background-color"] = "#3040C4";
  button.style["color"] = "#eee";
  button.style["border"] = "0px";
  button.style["border-radius"] = "3px";
  button.style["padding"] = "6px 20px";
  button.style["font-weight"] = "600";
  button.addEventListener("click", evt => {
    fetchSequence(config, button);
  });
  return button;
};

module.exports = {
  getSession,
  getEnvelope,
  fetchSequence,
  generateButton
};
