# sf-oauth-node-example
Salesforce OAuth Web-Server flow example in NodeJS. Many blogs adn samples related to Salesforce API rely on existing packages and bypass teh OAuth details using somethinf like [JSForce](https://jsforce.github.io/) (great, simple library). If we want to understand how OAuth really function with Salesfroce will need to dive bit more into deatils of HTTP headers, formats, post requests adn tokens. This example is for this purpose to explore OAuth Web-Server flow.

## Installation to Run Local
To run this example locally follow these steps

1. Clone repository `git clone https://github.com/iandrosov/sf-oauth-node-example`
1. Run app server `node app.js`
1. Open browser `localhost:5000` 

At this point you can try to login to your salesforce org Develper/Sandbox.