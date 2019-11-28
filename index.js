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
