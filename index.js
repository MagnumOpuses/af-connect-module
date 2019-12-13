"use strict";

const connectModule = require("./lib/connect-module");

const containers = document.getElementsByClassName("af-connect-module");
Array.prototype.forEach.call(containers, container => {
  container.style["display"] = "inline";

  let config = {
    label: container.getAttribute("data-label") || "AF Connect",
    pollRate: container.getAttribute("data-poll_rate") || "1000", // 1 second
    timeout: container.getAttribute("data-poll_timeout") || "300000", // 5 minutes
    afConnectUrl:
      container.getAttribute("data-af_connect_url") ||
      "https://af-connect.local",
    afPortabilityUrl:
      container.getAttribute("data-af_portability_url") ||
      "http://af-connect.local:8080",
    afPortabilityApiKey:
      container.getAttribute("data-af_portability_api_key") ||
      "dummydummydummydummydummydummydummydummydummydummy",
    onResponse: container.getAttribute("data-on_response") || undefined
  };

  const button = document.createElement("button");
  button.appendChild(document.createTextNode(config.label));
  button.style["background-color"] = "#3040C4";
  button.style["color"] = "#eee";
  button.style["border"] = "0px";
  button.style["border-radius"] = "3px";
  button.style["padding"] = "6px 20px";
  button.style["font-weight"] = "600";
  button.addEventListener("click", evt => {
    connectModule.fetchSequence(config);
  });
  container.appendChild(button);
});
