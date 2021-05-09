# sf-oauth-node-example
Salesforce OAuth Web-Server flow example in NodeJS. Many blogs and samples related to Salesforce API rely on existing packages and bypass the OAuth details using something like [JSForce](https://jsforce.github.io/) (great, simple library). If we want to understand how OAuth really function with Salesforce, we will need to dive bit more into details of HTTP headers, formats, post requests and tokens. This example is for this purpose to explore OAuth Web-Server flow.

## Installation to Run Local
To run this example locally follow these steps

1. Clone repository `git clone https://github.com/iandrosov/sf-oauth-node-example`
1. Create `.env` file store secure settings
1. Install NodeJS dependency modules `npm install`
1. Run app server `node app.js`
1. Open browser `localhost:5000` 

At this point you can try to login to your salesforce org Develper/Sandbox.

File .env stores the consumer key, secret and redirect URL for this application. Use values from your own connected app following this example file:

```
SF_CLIENT_ID=<CONSUMER KEY form conected app>
SF_CLIENT_SECRET=<CONSUMER SECRET>
SF_REDIRECT_URI=https://localhost:5000/oauth/_callback
```

The callback URL should be configured as shown in the example.