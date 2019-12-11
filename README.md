![alt text][logo]

[logo]: https://github.com/MagnumOpuses/project-meta/blob/master/img/jobtechdev_black.png "JobTech dev logo"

[A JobTech Project](https://www.jobtechdev.se)

# AF Connect Module

The purpose of this module is to enable third-party systems to easily integrate with Arbetsförmedlingen's AF-Connect infrastructure in order to obtain data/documents/certificates related to registered jobseekers and/or employers with their explicit consent.

This module provides an interactive button which you may install in your service's frontend. The end-user/visitor can then initiate the Arbetsförmedlingen user authentication procedure, select their profile/CV to share and finally provide their explicit consent allowing this data to be shared with a third-party system.

## Versions, current dev state and future

No versions yet.

## Getting started

We provide a docker release package for you to easily run the entire AF-Connect system locally in your development machine and effectively allowing you to both experience and evaluate whether this integration brings value to your service.

Download the docker release package from URL_HERE, unpack the archive and start up all the pre-configured services with command: `docker-compose up`.

Now let's create a basic front-end example that utilizes the AF-Connect-Module.

1. Download the latest version of the AF Connect Module from the [Releases section](https://github.com/MagnumOpuses/af-connect-module/releases).
2. Unpack the archive and include the pre-compiled `af-connect-module.bundle.js` into your frontend code.

Example implementation:

```
<html>
    <body>
        <script type="text/javascript">
            function onResponse(envelope) {
                // Envelope contains user CV and consent details.
                console.log(envelope);
            }
        </script>
        <div class="af-connect-module" data-on-response="onResponse"></div>
        <script src="af-connect-module.bundle.js"></script>
    </body>
</html>
```

The example consists of three parts.

- A callback for handling received data responses from AF-Connect.
- A DOM element which defines the configuration and location for the interactive button.
- The pre-compiled module script that will bring this all to life.

_Notice: Multiple AF Connect Modules can be added to a page through duplication of the DOM element._

## Configuration

The interactive button comes with pre-defined configuration defaults, but each property may be overridden as you see fit.

Here's an example for how you can reduce the data polling rate to just once per 10 seconds, instead of the default once per second.

```
<div class="af-connect-module" data-poll_rate="10000" data-on_response="onResponse"></div>
```

The table below shows all available configuration properties, default values and usage description.

| Data property            | Default value                             | Description                                                                                    |
| ------------------------ | ----------------------------------------- | ---------------------------------------------------------------------------------------------- |
| data-label               | AF Connect CV                             | The text label of the AF Connect Module button.                                                |
| data-pollRate            | 1000                                      | SSO cookie checking frequency, repeats until cookie has been populated or the timeout reached. |
| data-timeout             | 300000                                    | Duration of how long to wait for SSO cookie.                                                   |
| data-afConnectUrl        | https://www.arbetsformedlingen.se/loggain | Authentication page url for the end-user to obtain their SSO cookie.                           |
| data-afPortabilityUrl    | /cv                                       | Service endpoint to fetch end-user CV from.                                                    |
| data-afPortabilityApiKey | undefined                                 | Service endpoint to fetch end-user CV from.                                                    |
| data-onResponse          | undefined                                 | Name of callback function to call upon fetched CV.                                             |

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

## AF-Connect Integration environment

Guidelines for connecting module to Arbetsförmedlingen's AF-Connect integration environment goes here...

## Built with

- NPM v6.4.1 (Node package manager)
- Browserify v16.5.0 (Javascript bundler for browser)

## Contributing

We would love if you'd like to help us build and improve this product for the benefit of everyone. This project is intended to be a safe, welcoming space for collaboration, and contributors are expected to adhere to the [Contributor Covenant](http://contributor-covenant.org/) code of conduct.

Any contributions, feedback and suggestions are more than welcome.

Please read our guidelines for contribution [here](CONTRIBUTING_TEMPLATE.md).

## License

[Apache License 2.0](LICENSE.md)

## Acknowledgments

No acknowledgments yet.
