"use strict";
const connectModule = require("./lib/connect-module");
const checkCompatability = (host, name, version, onIncompatible) => {
  const url = `${host}/checkCompatability?name=${name}&version=${version}`;
  return fetch(url, {
    method: "GET",
    mode: "cors"
  })
    .then(response => response.json())
    .then(body => {
      if (body.result === false) {
        if (onIncompatible !== undefined) {
          onIncompatible();
        }
      }
    });
};

const containers = document.getElementsByClassName("af-connect-module");
Array.prototype.forEach.call(containers, container => {
  container.style["display"] = "inline";

  let config = {
    name: "af-connect-module",
    version: "1.2.0-beta",
    label: container.getAttribute("data-label") || 'Hämta CV från Arbetsförmedlingen',
    purpose: container.getAttribute("data-purpose") || undefined,
    jobTitle: container.getAttribute("data-job_title") || undefined,
    companyName: container.getAttribute("data-company_name") || undefined,
    pollRate: container.getAttribute("data-poll_rate") || "1000", // 1 second
    pollRetry: container.getAttribute("data-poll_retry") || "10",
    timeout: container.getAttribute("data-poll_timeout") || "300000", // 5 minutes
    afConnectUrl:
      container.getAttribute("data-af_connect_url") || undefined,
    afPortabilityUrl:
      container.getAttribute("data-af_portability_url") || undefined,
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

  // Check compatability with remote af connect service
  checkCompatability(config.afConnectUrl, config.name, config.version, () => {
    if (!config.supressWarnings) {
      config.onWarning(connectModule.CODE.E006);
    }
  });

  // Check compatability with remote af portability service
  checkCompatability(
    config.afPortabilityUrl,
    config.name,
    config.version,
    () => {
      if (!config.supressWarnings) {
        config.onWarning(connectModule.CODE.E005);
      }
    }
  );
});
