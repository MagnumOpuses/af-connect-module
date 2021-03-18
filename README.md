![](https://github.com/MagnumOpuses/project-meta/blob/master/img/jobtechdev_black.png?raw=true)

[A JobTech Project](https://www.jobtechdev.se)

# AF Connect Module

- [Introduction](#introduction)
  - [Live use-case demo](#live-use-case-demo)
  - [AF-Connect communication diagram](#af-connect-communication-diagram)
  - [AF-Connect Module sequence diagram](#af-connect-module-sequence-diagram)
- [Getting started](#getting-started)
  - [Using docker](#using-docker)
  - [Basic front-end example](#basic-front-end-example)
- [AF-Connect integration environment](#af-connect-integration-environment)
- [Configuration](#configuration)
- [Build from source](#build-from-source)
- [Test](#test)
- [Error codes](#error-codes)
- [Built with](#built-with)
- [Versions, current dev state and future](#versions-current-dev-state-and-future)
- [Contributing](#contributing)
- [License](#license)
- [Acknowledgments](#acknowledgments)

## Introduction

The purpose of this module is to enable third-party services to easily integrate with Arbetsförmedlingen's AF-Connect infrastructure in order to obtain data/documents/certificates related to registered jobseekers and/or employers with their explicit consent.

This module provides an interactive button for you to install into your own service by following the guidelines below.

Once you've successfully installed this module, your website visitor(s) can initiate transaction of their personal data to your service by clicking the AF-Connect button.

When the user initiates the transaction of data, a new window will open up for the user to authenticate at Arbetsförmedlingen's website, select their profile/CV to share and finally provide their explicit consent allowing this data to be shared with the third-party service.

### Live use-case demo

A jobseeker fills out a job application form automatically by using AF-Connect.

![AF Connect user journey diagram v1](.github/screenshots/af-connect-user-journey-diagram-v1.png?raw=true)

Use the following test credentials listed below and experience the live demo here: [https://af-connect-demo.jobtechdev.se](https://af-connect-demo.jobtechdev.se)

```
Username: abc
Password: 123
```

### AF-Connect communication diagram

![AF Connect communication diagram v3](.github/screenshots/af-connect-communication-diagram-v3.png?raw=true)

### AF-Connect Module sequence diagram

![AF Connect Module sequence diagram v2](.github/screenshots/af-connect-module-sequence-diagram-v2.png?raw=true)

## Getting started

### Using Docker

We provide a docker release package for you to easily run the entire AF-Connect system locally in your development machine and effectively allowing you to both experience and evaluate whether this integration brings value to your product/service.

First and foremost, add the following host to your local `hosts` file:

```
127.0.0.1 af-connect.local
```

Download the docker release package from [af-connect-compose](https://github.com/MagnumOpuses/af-connect-compose), unpack the archive and start up all the pre-configured services with command: `docker-compose up`.

The following docker images will be installed:

- [jobtechdev/af-connect-demo:latest](https://hub.docker.com/r/jobtechdev/af-connect-demo)
- [jobtechdev/af-connect:latest](https://hub.docker.com/r/jobtechdev/af-connect)
- [jobtechdev/af-portability:latest](https://hub.docker.com/r/jobtechdev/af-portability)
- [jobtechdev/af-connect-outbox:latest](https://hub.docker.com/r/jobtechdev/af-connect-outbox)
- [jobtechdev/apimanager-mock:latest](https://hub.docker.com/r/jobtechdev/apimanager-mock)
- [jobtechdev/af-connect-mock:latest](https://hub.docker.com/r/jobtechdev/af-connect-mock)
- [redis:alpine](https://hub.docker.com/_/redis)

When all docker images have started up, visit your locally hosted AF-Connect Demo site at: [http://af-connect.local:3000](http://af-connect.local:3000)

### Basic front-end example

Now let's create a basic front-end example that utilizes the AF-Connect-Module.

Create a new directory in your filesystem and add a new file `index.html` with the following content:

```html
<html>
  <body>
    <script type="text/javascript">
      function onResponse(envelope, err) {
        if (err !== undefined) {
          alert("Error [" + err.code + "]: " + err.message);
          return;
        }

        // Envelope contains user CV and consent details.
        console.log(envelope);
      }
    </script>
    <div class="af-connect-module" data-on_response="onResponse"></div>
    <script src="af-connect-module.bundle.js"></script>
  </body>
</html>
```

The example consists of three parts.

- A globally defined callback for handling received data responses from AF-Connect.
- A DOM element which defines the configuration properties and location for the interactive button.
- The pre-compiled module script that will bring this all to life by generating the interactive button.

Download and unpack the latest version of the AF Connect Module from the [Releases section](https://github.com/MagnumOpuses/af-connect-module/releases). Copy the `af-connect-module.bundle.js` into the directory where your `index.html` resides.

Finally open up the `index.html` in your web browser and you'll find a blue "AF Connect" button.

![Example implementation result screenshot](https://github.com/MagnumOpuses/af-connect-module/blob/master/.github/screenshots/af-connect-module-button.png?raw=true)

By clicking the "AF Connect" button, a new tab/window will open up to show you an authentication page. This page is operating on mocked user data. To complete the authentication procedure, enter the following user credentials:

```
Username: abc
Password: 123
```

Upon successful authentication a handful of example profiles are presented to you. Please select the profile you wish to share with the third-party service and finally click the "Consent and close" button. The AF-Connect page closes and you're back to your `index.html` page again.

Open up the browser developer tools console and you will see that the `onResponse` callback have been called, and the retrieved envelope has been logged to the console.

:notebook: _Notice: Multiple AF Connect Modules can be added to a page through duplication of the DOM element._

## AF-Connect integration environment

In order to integrate your own website with AF-Connect integration environment you must apply/adjust the configuration properties as listed below.

| Configuration property      | Af-connect integration env.              | Description                        |
| --------------------------- | ---------------------------------------- | ---------------------------------- |
| data-af_connect_url         | https://af-connect-int.jobtechdev.se     | se [Configuration](#configuration) |
| data-af_portability_url     | https://af-portability-int.jobtechdev.se | se [Configuration](#configuration) |
| data-af_portability_api_key | dummykey                                 | se [Configuration](#configuration) |

Find all available configuration properties in section: [Configuration](#configuration)

## Configuration

In the process of requesting and retrieving user profile data from AF there is a step where the user gives consent for sharing the data to a third party.
In order for the consent form to be formulated properly three parameters are provided where you can specify key parameters about the data:

There are three parameters provided for customizing the data sharing consent form.

| Custom property   | Description                |
| ----------------- | -------------------------- |
| data-purpose      | Phrase of intended purpose |
| data-company_name | Prospective employer       |
| data-job_role     | The job role applied for   |

The (`data-purpose`) configuration property needs to be formatted as a Base64 encoded JSON array:
```js
// Example of how to create encode the data-purpose:
new Buffer.from(JSON.stringify(["Applying for a job at Atlas Copco"])).toString("base64");
// Result: QXBwbHlpbmcgZm9yIGpvYiBhdCBBdGxhcyBDb3Bjbw==
```
The encoded string is displayed in plain text in the consent form to describe the matter to approve.
The interactive button comes with pre-defined configuration defaults, but each property needs to be specified to describe the purpose that the user is being asked to give consent for.

Here's an example for how you can reduce the data polling rate to just once per 10 seconds, instead of the default once per second.

```html
<div
  class="af-connect-module"
  data-purpose="QXBwbHlpbmcgZm9yIGpvYiBhdCBBdGxhcyBDb3Bjbw=="
  data-company_name="Atlas Copco"
  data-job_title="Key Account Manager"
  data-on_response="onResponse"
  data-poll_rate="10000"
></div>
```

The table below shows all available configuration properties, default values and usage description.

| Property            | Default value  | Description |
| ------------------- | -------------- | ----------- |
| data-label          | AF Connect     | Label displayed on the AF Connect Module interactive button.|
| data-purpose        | undefined      | Purpose of data request statement(s). Base64 encoded array of strings. |
| data-company_name   | undefined      | Prospective employer. |
| data-job_title      | undefined      | Job role to apply for. |
| data-poll_rate      | 1000           | Data polling frequency, described in milliseconds |
| data-poll_retry     | 10             | Data polling retry maximum count, e.g. if network connectivity has been lost. |
| data-poll_timeout   | 300000         | Data polling timeout, described in milliseconds.|
| data-af_connect_url | https://af-connect.local         | URL to F-Connect service to open in new tab/window when the user clicks the button. |
| data-af_portability_url | http://af-connect.local:8080 | URL to service where session token and user data can be obtained. |
| data-af_portability_api_key | dummykey | The API key used when querying for session token and polling for data. |
| data-on_response    | undefined    | Name of global callback function to call upon polling success/failure. |
| data-on_warning     | `(code) => { console.warn(code)}` | Name of global callback function to call upon warning occurrence. |
| data-suppress_warnings | false          | Prevents warnings from being printed to console |

## Build from source

```bash
git clone https://github.com/MagnumOpuses/af-connect-module.git
cd af-connect-module
npm install
npm run build
```

## Test

```bash
npm run test
```

## Error codes

| Code | Message                                                                       |
| ---- | ----------------------------------------------------------------------------- |
| E001 | Failed to fetch session token                                                 |
| E002 | Failed to fetch envelope                                                      |
| E003 | Polling interval exception                                                    |
| E004 | Polling interval timeout                                                      |
| E005 | Detected AF Connect Module incompatability with remote AF Portability service |
| E006 | Detected AF Connect Module incompatability with remote AF Connect service     |
| E007 | Compatability check with remote AF Connect service failed                     |
| E008 | Compatability check with remote AF Portability service failed                 |

## Built with

- NPM v6.4.1 (Node package manager)
- Browserify v16.5.0 (Javascript bundler for browser)

## Versions, current dev state and future

1.2.0-beta

## Contributing

We would love if you'd like to help us build and improve this product for the benefit of everyone. This project is intended to be a safe, welcoming space for collaboration, and contributors are expected to adhere to the [Contributor Covenant](http://contributor-covenant.org/) code of conduct.

Any contributions, feedback and suggestions are more than welcome.

Please read our guidelines for contribution [here](CONTRIBUTING_TEMPLATE.md).

## License

[Apache License 2.0](LICENSE.md)

## Acknowledgments

No acknowledgments yet.
