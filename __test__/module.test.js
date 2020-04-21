//const mockAxios = require("axios");

describe("module", () => {
  beforeEach(() => {
    jest.resetModules();
    jest.unmock("axios");
  });

  test("session obtained", () => {
    jest.mock("axios", () => ({
      get: async () => ({
        data: {
          token: "aa31667d-afde-4941-8749-d71ff90bc247"
        }
      })
    }));

    const config = {
      afPortabilityUrl: "https://portabilitystage.arbetsformedlingen.se"
    };

    const connectModule = require("../lib/connect-module");
    return connectModule.getSession(config).then(token => {
      expect(token).toBeDefined();
      expect(typeof token).toBe("string");
      expect(token).toBe("aa31667d-afde-4941-8749-d71ff90bc247");
    });
  });

  test("session error code returned", async done => {
    jest.mock("axios", () => ({
      get: async () => {
        throw "A totally unexpected error";
      }
    }));

    try {
      const connectModule = require("../lib/connect-module");
      await connectModule.getSession({});
    } catch (err) {
      expect(err).toBeDefined();
      expect(err.code).toBeDefined();
      expect(err.code).toBe("E001");
      expect(err.message).toBeDefined();
      expect(err.message).toBe("Failed to fetch session token");
      done();
    }
  });

  test("envelope not ready", async done => {
    jest.mock("axios", () => ({
      get: async () => ({
        data: { status: 204 }
      })
    }));

    const connectModule = require("../lib/connect-module");
    const result = await connectModule.getEnvelope(
      {},
      "aa31667d-afde-4941-8749-d71ff90bc247"
    );
    expect(result).toBe(undefined);
    done();
  });

  test("envelope ready", async done => {
    jest.mock("axios", () => ({
      get: async () => ({
        data: { status: 200 }
      })
    }));

    const connectModule = require("../lib/connect-module");
    const result = await connectModule.getEnvelope(
      {},
      "aa31667d-afde-4941-8749-d71ff90bc247"
    );
    expect(result.status).toBe(200);
    done();
  });

  test("envelope failed to fetch", async done => {
    jest.mock("axios", () => ({
      get: async () => {
        throw {
          response: { status: 500 }
        };
      }
    }));

    const connectModule = require("../lib/connect-module");
    const error = await connectModule.getEnvelope(
      {},
      "aa31667d-afde-4941-8749-d71ff90bc247"
    );
    expect(error).toBe("Something went wrong... Code: 500");
    done();
  });

  test("envelope failed to fetch, unknown status code", async done => {
    jest.mock("axios", () => ({
      get: async () => {
        throw {
          response: { status: 501 }
        };
      }
    }));

    const connectModule = require("../lib/connect-module");
    const error = await connectModule.getEnvelope(
      {},
      "aa31667d-afde-4941-8749-d71ff90bc247"
    );
    expect(error).toBe("Unknown response code: 501");
    done();
  });

  test("envelope failed to fetch, unknown status code", async done => {
    jest.mock("axios", () => ({
      get: async () => {
        throw "A totally unexpected error";
      }
    }));

    try {
      const connectModule = require("../lib/connect-module");
      await connectModule.getEnvelope({}, "");
    } catch (err) {
      expect(err).toBeDefined();
      expect(err.code).toBeDefined();
      expect(err.code).toBe("E002");
      expect(err.message).toBeDefined();
      expect(err.message).toBe("Failed to fetch envelope");
      done();
    }
  });

  test("fetch sequence", async done => {
    jest.mock("axios", () => ({
      get: async () => ({
        data: {
          token: "aa31667d-afde-4941-8749-d71ff90bc247"
        }
      })
    }));

    const connectModule = require("../lib/connect-module");
    const config = {
      onResponse: "onResponse",
      timeout: 1500
    };
    const button = {
      style: {},
      setAttribute: () => {},
      removeAttribute: () => {}
    };
    window.open = () => ({
      focus: () => {}
    });
    window[config.onResponse] = { call: () => {} };
    await connectModule.fetchSequence(config, button);
    done();
  });

  test("fetch sequence timeout", async done => {
    jest.mock("axios", () => ({
      get: async () => ({
        data: {
          token: "aa31667d-afde-4941-8749-d71ff90bc247"
        }
      })
    }));

    const connectModule = require("../lib/connect-module");
    const config = {
      onResponse: "onResponse",
      timeout: 0
    };
    const button = {
      style: {},
      setAttribute: () => {},
      removeAttribute: () => {}
    };
    window.open = () => ({
      focus: () => {}
    });
    window[config.onResponse] = { call: () => {} };
    await connectModule.fetchSequence(config, button);
    done();
  });

  test("fetch sequence called onResponse", async done => {
    jest.mock("axios", () => ({
      get: async () => ({
        data: {
          token: "aa31667d-afde-4941-8749-d71ff90bc247"
        }
      })
    }));

    const connectModule = require("../lib/connect-module");
    const config = {
      onResponse: "onResponse",
      timeout: 0
    };
    const button = {
      style: {},
      setAttribute: () => {},
      removeAttribute: () => {}
    };
    window.open = () => ({
      focus: () => {}
    });
    window[config.onResponse] = {
      call: () => {
        done();
      }
    };
    await connectModule.fetchSequence(config, button);
  });
});
