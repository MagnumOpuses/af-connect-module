"use strict";

const axios = require("axios");

const ERROR_CODES = {
  E001: { code: "E001", message: "Failed to fetch session token" },
  E002: { code: "E002", message: "Failed to fetch envelope" },
  E003: { code: "E003", message: "Polling interval exception" },
  E004: { code: "E004", message: "Polling interval timeout" },
  E005: {
    code: "E005",
    message:
      "Detected AF Connect Module incompatability with remote AF Portability service"
  },
  E006: {
    code: "E006",
    message:
      "Detected AF Connect Module incompatability with remote AF Connect service"
  },
  E007: {
    code: "E007",
    message: "Compatability check with remote AF Connect service failed"
  },
  E008: {
    code: "E008",
    message: "Compatability check with remote AF Portability service failed"
  }
};

const getSession = config => {
  return axios
    .get(
      config.afPortabilityUrl +
        "/token?api-key=" +
        config.afPortabilityApiKey +
        "&purpose=" +
        config.purpose +
        "&job_title=" +
        config.jobTitle +
        "&company_name=" +
        config.companyName
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
            .open(config.afConnectUrl + "?sessionToken=" + sessionToken, "Arbetsförmedlingen Connect Once", "location=yes,resizable=no,scrollbars=no,screenX=10,screenY=10,innerWidth=800,innerHeight=900,status=off,toolbar=off,location=off" )
            .focus();

        let retry = 0;
        let retryMax = config.pollRetry;

        let timeoutId;
        let awaitingResponse = false;
        const timerId = setInterval(() => {
          // Only poll for envelope if there are no ongoing request.
          if (awaitingResponse) {
            return;
          }

          awaitingResponse = true;
          return getEnvelope(config, sessionToken)
            .then(cv => {
              awaitingResponse = false;
              retry = 0;

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
              awaitingResponse = false;
              if (retry < retryMax) {
                // Error occurred upon polling for envelope, retrying.
                retry++;
              } else {
                // Too many errors occurred upon polling for envelope, stop polling with error code.
                clearInterval(timerId);
                reject(err);
              }
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
  let failure = false;
  if (config["purpose"] === undefined) {
    console.warn("Data request purpose must be defined");
    alert("AF-Connect configuration: Data request purpose must be defined");
    failure = true;
  }
  if (config["jobTitle"] === undefined) {
    console.warn("Job title must be defined");
    alert("AF-Connect configuration: Job title must be defined");
    failure = true;
  }
  if (config["companyName"] === undefined) {
    console.warn("Company name must be defined");
    alert("AF-Connect configuration: Company name must be defined");
    failure = true;
  }

  // The button
  const button = document.createElement("button");
  // The AF icon
  let icon = '<svg xmlns="http://www.w3.org/2000/svg" version="1.0" style="margin-left: 0.5rem; margin-right: 0.6rem; margin-bottom: -0.7rem" width="2.5rem" height="2.5rem" viewBox="0 0 55 55"><path class="circle" d="M12.9 12C5.8 12 0 17.8 0 24.9 0 32 5.8 37.8 12.9 37.8c7.1 0 12.8-5.8 12.8-12.9C25.7 17.8 20 12 12.9 12zm0 19.7c-3.8 0-6.9-3.1-6.9-6.9 0-3.8 3.1-6.9 6.9-6.9 3.8 0 6.9 3.1 6.9 6.9-.1 3.9-3.1 6.9-6.9 6.9z" fill="#fff"/><path class="arc" d="M12.9 0v6c10.4 0 18.8 8.4 18.8 18.8 0 3.5-.9 6.8-2.7 9.8l5 3.3c7.2-11.7 3.6-27-8-34.2C22 1.3 17.5 0 12.9 0z" fill="#fff"/></svg>';
  let parser = new DOMParser();
  let iconNode = parser.parseFromString(icon, "image/svg+xml");

  // Apply styling
  button.style["display"] = "inline-block";
  button.style["background-color"] = "#37377A";
  button.style["color"] = "#eee";
  button.style["border"] = "0";
  button.style["border-radius"] = "0.9rem";
  button.style["padding"] = "0.5rem 1.5rem 0.4rem 0.3rem";
  button.style["fontSize"] = "1rem";
  button.style["textAlign"] = "center";

  // Add icon and label to button
  button.appendChild(iconNode.lastChild);
  // Attempt to utf-8 encode the button label
  let label= Buffer.from(config.label, 'utf-8');
  let node=document.createTextNode(" "+label);
  button.appendChild(node);

  if (!failure) {
    button.addEventListener("click", evt => {
      fetchSequence(config, button);
    });
  }

  return button;
};

module.exports = {
  CODE: ERROR_CODES,
  getSession,
  getEnvelope,
  fetchSequence,
  generateButton
};
