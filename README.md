![alt text][logo]

[logo]: https://github.com/MagnumOpuses/project-meta/blob/master/img/jobtechdev_black.png "JobTech dev logo"
[A JobTech Project](https://www.jobtechdev.se)

# AF Connect Module

The purpose of AF Connect Module is to ease the integration procedure for CV consumer services.

The AF Connect Module provides an interactive button for the end-user to initiate the authentication and CV extraction procedure.

## Versions, current dev state and future

No versions yet.

## Getting started

1. Acquire the latest version of the compiled AF Connect Module bundle, see releases.
2. Include the AF Connect Module bundle into frontend code.
```
<script src="af-connect-module.bundle.js"></script>
```
3. 
Define an element with class `af-connect-module`, this element serves as the container and configuration for your AF Connect Module.
_Multiple AF Connect Modules can be added to a page through duplication of this element._
```
<div class="af-connect-module" data-on_response="onResponse"></div>
```
4. Define customized functions in your frontend that the AF Connect Module will callback at various stages in the process.
```
function onResponse(data) {
    // This function is called by AF Connect Module when CV extraction completes.
    // The data parameter contains the json CV structure.
}
```
5. If needed you may override the default properties.  
The af-connect-module element can be configured with the following data properties:

| Data property            | Default value                             | Description                                                                                    |
| ------------------------ | ----------------------------------------- | ---------------------------------------------------------------------------------------------- |
| data-label               | AF Connect CV                             | The text label of the AF Connect Module button.                                                |
| data-poll-rate           | 1000                                      | SSO cookie checking frequency, repeats until cookie has been populated or the timeout reached. |
| data-timeout             | 300000                                    | Duration of how long to wait for SSO cookie.                                                   |
| data-data-af-connect-url | https://www.arbetsformedlingen.se/loggain | Authentication page url for the end-user to obtain their SSO cookie.                           |
| data-portability_url     | /cv                                       | Service endpoint to fetch end-user CV from.                                                    |
| data-on-response         | undefined                                 | Name of callback function to call upon fetched CV.                                             |

### Prerequisites

No prerequisites guidelines yet.

### Installation

```bash
git clone https://github.com/MagnumOpuses/af-connect-module.git
cd af-connect-module
npm install
npm run build
```

## Test

No tests yet.

## Deployment

No deployment guidelines yet.

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
