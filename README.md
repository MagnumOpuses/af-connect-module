![alt text][logo]

[logo]: https://github.com/MagnumOpuses/project-meta/blob/master/img/jobtechdev_black.png "JobTech dev logo"

[A JobTech Project](https://www.jobtechdev.se)

# AF Connect Module

The purpose of this module is to enable third-party systems to easily integrate with Arbetsförmedlingen's AF-Connect infrastructure in order to obtain data/documents/certificates related to registered jobseekers and/or employers with their explicit consent.

This module provides an interactive button which you may install in your service's frontend. The end-user/visitor can then initiate the Arbetsförmedlingen user authentication procedure, select their profile/CV to share and finally provide their explicit consent allowing this data to be shared with and retrieved by a third-party system.

## Sequence diagram showing all interactions of this module.

![AF Connect Module sequence diagram](https://github.com/MagnumOpuses/af-connect-module/blob/master/.github/screenshots/af-connect-module-sequence-diagram-v2.png?raw=true)

![AF Connect Module consent flow diagram](https://github.com/MagnumOpuses/af-connect-module/blob/master/.github/screenshots/af-connect-consent-flow-diagram-v2.png?raw=true)

## Getting started

We provide a docker release package for you to easily run the entire AF-Connect system locally in your development machine and effectively allowing you to both experience and evaluate whether this integration brings value to your service.

First and foremost, add the following host to your local `hosts` file:

```
127.0.0.1 af-connect.local
```

Download the docker release package from [af-connect-compose](https://github.com/MagnumOpuses/af-connect-compose), unpack the archive and start up all the pre-configured services with command: `docker-compose up`.

Now let's create a basic front-end example that utilizes the AF-Connect-Module.

Create a new directory in your filesystem and add a new file `index.html` with the following content:

```html
<html>
  <body>
    <script type="text/javascript">
      function onResponse(envelope) {
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

Finally open up the `index.html` in a web browser of your choice and you'll find a blue "AF Connect" button.

![Example implementation result screenshot](https://github.com/MagnumOpuses/af-connect-module/blob/master/.github/screenshots/af-connect-module-button.png?raw=true)

By clicking the "AF Connect" button, a new tab/window will open up to show you an authentication page. This page is operatig entirely on mocked data, so to complete the authentication you can enter the following credentials:

```
username: abc
password: 123
```

You will now be presented with a handful of example profiles that you may select to share with the requesting service and finally click the "Consent and close" button. The page closes and you're back to the initial example page.

Open up the browser developer tools console and you will see that the `onResponse` callback have been called and the retrieved envelope has been logged.

:notebook: _Notice: Multiple AF Connect Modules can be added to a page through duplication of the DOM element._

## Configuration

The interactive button comes with pre-defined configuration defaults, but each property may be overridden as you see fit.

Here's an example for how you can reduce the data polling rate to just once per 10 seconds, instead of the default once per second.

```html
<div
  class="af-connect-module"
  data-poll_rate="10000"
  data-on_response="onResponse"
></div>
```

The table below shows all available configuration properties, default values and usage description.

| Configuration property      | Default value                                | Description                                                                          |
| --------------------------- | -------------------------------------------- | ------------------------------------------------------------------------------------ |
| data-label                  | AF Connect                                   | Label displayed on the AF Connect Module interactive button.                         |
| data-poll_rate              | 1000                                         | Data polling frequency, described in milliseconds.                                   |
| data-poll_timeout           | 300000                                       | Data polling timeout, described in milliseconds.                                     |
| data-af_connect_url         | https://af-connect.local                     | URL to AF-Connect service to open in new tab/window when the user clicks the button. |
| data-af_portability_url     | http://af-connect.local:8080/portability-api | URL to service where session token and user data can be obtained.                    |
| data-af_portability_api_key | undefined                                    | The API key used when querying for session token and polling for data.               |
| data-on_response            | undefined                                    | Name of global callback function to call upon polling success/failure.               |

### Prerequisites

No prerequisites guidelines yet.

### Compile the bundle from source

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

## Deployment

We recommend deploying the AF-Connect system locally to your development machine using `docker-compose`.

```
docker-compose instructions goes here...
```

## AF-Connect integration environment

Integration environment: `test-afc.jobtechdev.se`

Guidelines for connecting to AF-Connect integration environment coming soon...

## Built with

- NPM v6.4.1 (Node package manager)
- Browserify v16.5.0 (Javascript bundler for browser)

## Versions, current dev state and future

No versions yet.

## Contributing

We would love if you'd like to help us build and improve this product for the benefit of everyone. This project is intended to be a safe, welcoming space for collaboration, and contributors are expected to adhere to the [Contributor Covenant](http://contributor-covenant.org/) code of conduct.

Any contributions, feedback and suggestions are more than welcome.

Please read our guidelines for contribution [here](CONTRIBUTING_TEMPLATE.md).

## License

[Apache License 2.0](LICENSE.md)

## Acknowledgments

No acknowledgments yet.
