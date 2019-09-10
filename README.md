![alt text][logo]

[logo]: https://github.com/MagnumOpuses/project-meta/blob/master/img/jobtechdev_black.png "JobTech dev logo"
[A JobTech Project](https://www.jobtechdev.se)

# Gravity Beacon

Gravity Beacon is a widget whose purpose is to ease the integration procedure for data consumer services.

The Beacon has two distinct initiation modes:
* Interactive button: Displays a button for the end-user to click to initiate the authentication and cv extraction procedure.
* Non-interactive mode: Immediately starts the authentication procedure upon Gravity Beacon script load.

## Versions, current dev state and future

No versions yet.

## Getting started

1. Acquire the latest version of the compiled Gravity Beacon bundle, see releases.
2. Include the Gravity Beacon bundle into frontend code.
```
<script src="gravity-beacon.bundle.js"></script>
```
3. 
Define an element with class `gravity-beacon`, this element serves are the container and configuration for your Gravity Beacon.
_Multiple Gravity Beacons can be added to a page through duplication of this element._
```
<!-- Interactive button mode -->
<div class="gravity-beacon"
    data-on_auth="onAuth"
    data-on_fetch="onFetch"
    data-on_response="onResponse">

<!-- Non-interactive mode -->
<div class="gravity-beacon" data-receive_only
    data-on_auth="onAuth"
    data-on_fetch="onFetch"
    data-on_response="onResponse">
```
4. Define customized functions in your frontend that the Beacon will callback at various stages in the process.

function onAuth() {
    // This function is called by Gravity Beacon when authentication procedure begins.
}

function onFetch() {
    // This function is called by Gravity Beacon when CV extraction begins.
}

function onResponse(data) {
    // This function is called by Gravity Beacon when CV extraction completes.
    // The data parameter contains the json CV structure.
}

5. If needed you may override the default properties.

The gravity-beacon element can be configured via data properties.
See all configuration properties below.

- `cookie` (default: `AMV_SSO_COOKIE`): Waits for this cookie name to be populated.
- `poll_rate` (default: `1000`): SSO cookie checking frequency, repeats until cookie has been populated or the timeout reached.
- `timeout` (default: `300000`): Duration of how long to wait for SSO cookie.
- `auth` (default: `https://www.arbetsformedlingen.se/loggain`): Authentication page url for the end-user to obtain their SSO cookie.
- `portability_url` (default: `/cv`): Service endpoint to fetch end-user CV from.
- `on_auth` (default: `undefined`): Name of callback function to call upon initation of authentication procedure.
- `on_fetch` (default: `undefined`): Name of callback function to call upon completed authentication and fetching of CV begins.
- `on_response` (default: `undefined`): Name of callback function to call upon fetched CV.
- `receieve_only`: The _Non-interactive mode_ is used if this data property is defined.

### Prerequisites

No prerequisites guidelines yet.

### Installation

```bash
git clone https://github.com/MagnumOpuses/gravity-beacon.git
cd gravity-beacon
```

## Test

No tests yet.

## Deployment

No deployment guidelines yet.

## Built with

No technologies yet.

## Contributing

We would love if you'd like to help us build and improve this product for the benefit of everyone. This project is intended to be a safe, welcoming space for collaboration, and contributors are expected to adhere to the [Contributor Covenant](http://contributor-covenant.org/) code of conduct.

Any contributions, feedback and suggestions are more than welcome.

Please read our guidelines for contribution [here](CONTRIBUTING_TEMPLATE.md).

## License

[Apache License 2.0](LICENSE.md)

## Acknowledgments

No acknowledgments yet.
