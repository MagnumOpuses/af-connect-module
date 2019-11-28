const mockAxios = require("axios");

test("fetchSession with mock api", () => {
  mockAxios.get.mockImplementationOnce(() =>
    Promise.resolve({ token: "aa31667d-afde-4941-8749-d71ff90bc247" })
  );

  const config = {
    afPortabilityUrl: "https://portabilitystage.arbetsformedlingen.se"
  };

  const connectModule = require("../lib/connect-module");
  return connectModule.fetchSession(config).then(token => {
    expect(token).toBeDefined();
    expect(typeof token).toBe("string");
    expect(token).toBe("aa31667d-afde-4941-8749-d71ff90bc247");
  });
});

test("fetchCV with mock api", () => {
  mockAxios.get.mockImplementationOnce(() =>
    Promise.resolve(require("./cv.json"))
  );

  const onResponse = data => {
    console.log("Response: ", data);
  };

  const config = {
    pollRate: "1000", // 1 second
    timeout: "300000", // 5 minutes
    afConnectUrl: "https://demotest.arbetsformedlingen.se",
    afPortabilityUrl: "https://portabilitystage.arbetsformedlingen.se",
    onResponse: onResponse
  };

  const connectModule = require("../lib/connect-module");
  return connectModule
    .fetchCV(config, "aa31667d-afde-4941-8749-d71ff90bc247")
    .then(cv => {
      expect(cv).toBeDefined();
      expect(typeof cv).toBe("object");
      expect(cv.documentId).toBeDefined();
      expect(cv.person).toBeDefined();
      expect(cv.profiles).toBeDefined();
    });
});
