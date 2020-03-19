"use strict";

const connectModule = require("./lib/connect-module");

const containers = document.getElementsByClassName("af-connect-module");
Array.prototype.forEach.call(containers, container => {
  container.style["display"] = "inline";

  let config = {
    label: container.getAttribute("data-label") || "AF Connect",
    pollRate: container.getAttribute("data-poll_rate") || "1000", // 1 second
    pollRetry: container.getAttribute("data-poll_retry") || "10",
    timeout: container.getAttribute("data-poll_timeout") || "300000", // 5 minutes
    afConnectUrl:
      container.getAttribute("data-af_connect_url") ||
      "https://af-connect.local",
    afPortabilityUrl:
      container.getAttribute("data-af_portability_url") ||
      "http://af-connect.local:8080",
    afPortabilityApiKey:
      container.getAttribute("data-af_portability_api_key") || "dummykey",
    onResponse: container.getAttribute("data-on_response") || undefined,
    onWarning:
      container.getAttribute("data-on_warning") ||
      (code => {
        console.warn(code);
      }),
    supressWarnings: container.getAttribute("data-suppress_warnings") || false
  };

  const button = connectModule.generateButton(config);
  container.appendChild(button);

  fetch(
    config.afConnectUrl +
      "/checkCompatability?name=af-connect-module&version=1.0.2-beta",
    {
      method: "GET",
      mode: "cors"
    }
  )
    .then(response => {
      return response.json();
    })
    .then(body => {
      if (body.result === false) {
        if (!config.supressWarnings) {
          config.onWarning(connectModule.CODE.E006);
        }
      }
    });
});
